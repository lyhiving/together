import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSwr from "swr";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";
import {
  Container,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  FormErrorMessage,
  FormHelperText,
  Link,
  useToast,
  Flex,
} from "@chakra-ui/react";
import DatePicker from "src/components/DatePicker";
import BannerPicker from "src/components/BannerPicker";
import {
  VALIDATION_MESSAGES,
  ERROR_MESSAGES,
} from "src/contants/error-messages";
import Client from "src/libs/supabase";
import { getPlatformUrl } from "src/utils/platform";
import { useAuthContext } from "src/context/AuthContext";
import { defaultStartAt, defaultEndAt } from "src/utils/datetime";
import { RoomPlatforms } from "src/contants/room-platform";
import { RoomPlatform } from "src/types/schema";

export interface CreateRoomParams {
  name: string;
  category: string;
  start_at: Date;
  end_at: Date;
  description?: string;
  room_url?: string;
  room_platform: RoomPlatform;
}

const NewRoom = () => {
  const { user, isLoading, isLoggedIn } = useAuthContext();
  const toast = useToast();
  const router = useRouter();
  const [bannerUrl, setBannerUrl] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoomParams>({
    defaultValues: {
      name: "",
      start_at: defaultStartAt,
      end_at: defaultEndAt,
      room_platform: "GOOGLE_MEET",
    },
  });

  const startAt = watch("start_at");
  const endAt = watch("end_at");
  const roomPlatform = watch("room_platform");

  const { data: categories } = useSwr("categories", () =>
    Client.getCategories()
  );

  const onSubmit = async ({ category, ...rest }: CreateRoomParams) => {
    try {
      const newRoom = await Client.createRoom({
        user_id: user?.id,
        category_id: category,
        banner_url: bannerUrl,
        ...rest,
      });
      toast({
        title: "Success",
        description: "Success",
        status: "success",
      });
      reset();
      router.push(`/room/${newRoom?.id}`);
    } catch (error: any) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message ?? ERROR_MESSAGES.UNKNOWN,
        status: "error",
      });
    }
  };

  const handleFileChange = (bannerUrl: string) => {
    setBannerUrl(bannerUrl);
  };

  useEffect(() => {
    if (startAt) {
      setValue("end_at", dayjs(startAt).add(2, "h").toDate());
    }
  }, [startAt]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading || !isLoggedIn) {
    return <h2>loading.....</h2>;
  }

  return (
    <>
      <Head>
        <title>New room | Together</title>
      </Head>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxW="container.sm" py="10">
          <Heading>Create new room</Heading>
          <FormControl
            id="name"
            mt="10"
            isInvalid={!!errors?.name}
            isDisabled={isSubmitting}
          >
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              placeholder="Room name"
              type="text"
              size="lg"
              {...register("name", {
                required: VALIDATION_MESSAGES.REQUIRED,
              })}
            />
            <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="category"
            isInvalid={!!errors?.category}
            isDisabled={isSubmitting}
            mt="10"
          >
            <FormLabel htmlFor="category">Category</FormLabel>
            <Select
              placeholder="Select category"
              {...register("category", {
                required: VALIDATION_MESSAGES.REQUIRED,
              })}
              size="lg"
            >
              {(categories ?? []).map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors?.category?.message}</FormErrorMessage>
          </FormControl>

          <Controller
            control={control}
            name="start_at"
            rules={{ required: VALIDATION_MESSAGES.REQUIRED }}
            render={({
              field: { onChange, onBlur, value, name },
              fieldState: { invalid },
            }) => (
              <FormControl
                isInvalid={invalid}
                isRequired
                mt="10"
                isDisabled={isSubmitting}
              >
                <FormLabel htmlFor={name}>Start At</FormLabel>
                <DatePicker
                  id={name}
                  minDate={new Date()}
                  minTime={
                    startAt && dayjs(startAt).startOf("d").toDate() > new Date()
                      ? dayjs().startOf("d").toDate()
                      : new Date()
                  }
                  maxTime={dayjs().endOf("d").toDate()}
                  selected={value}
                  onChange={(val) => {
                    console.log("change", val);
                    onChange(val);
                  }}
                  onBlur={onBlur}
                  size="lg"
                  showTimeSelect
                />
                <FormErrorMessage>{errors?.start_at?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="end_at"
            rules={{ required: VALIDATION_MESSAGES.REQUIRED }}
            render={({
              field: { onChange, onBlur, value, name },
              fieldState: { invalid },
            }) => (
              <FormControl
                isInvalid={invalid}
                isRequired
                mt="10"
                isDisabled={isSubmitting}
              >
                <FormLabel htmlFor={name}>End At</FormLabel>
                <DatePicker
                  id={name}
                  selected={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  size="lg"
                  showTimeSelect
                  minDate={startAt}
                  minTime={
                    endAt &&
                    dayjs(endAt).startOf("d").toDate() >
                      dayjs(startAt).add(10, "m").toDate()
                      ? dayjs().startOf("d").toDate()
                      : dayjs(startAt).add(10, "m").toDate()
                  }
                  maxTime={
                    startAt ? dayjs(startAt).endOf("d").toDate() : undefined
                  }
                />
                <FormErrorMessage>{errors?.end_at?.message}</FormErrorMessage>
              </FormControl>
            )}
          />
          <FormControl
            id="room_url"
            mt="10"
            isInvalid={!!errors?.room_url}
            isDisabled={isSubmitting}
          >
            <FormLabel htmlFor="room_url">Room link</FormLabel>
            <Input
              placeholder="Room link"
              type="text"
              size="lg"
              {...register("room_url", {
                required: VALIDATION_MESSAGES.REQUIRED,
              })}
            />
            <FormHelperText>
              Don't have link an yet?{" "}
              <Link href={getPlatformUrl(roomPlatform)} isExternal>
                <Button colorScheme="blue" href="" variant="link" size="sm">
                  Create one
                </Button>
              </Link>
            </FormHelperText>
            <FormErrorMessage>{errors?.room_url?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            id="room_platform"
            mt="10"
            isInvalid={!!errors?.room_platform}
            isDisabled={isSubmitting}
          >
            <FormLabel htmlFor="room_platform">Room platform</FormLabel>
            <Select
              {...register("room_platform", {
                required: VALIDATION_MESSAGES.REQUIRED,
              })}
              size="lg"
            >
              {RoomPlatforms.map((platform) => (
                <option value={platform.value} key={platform.name}>
                  {platform.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors?.room_platform?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl id="description" mt="10" isDisabled={isSubmitting}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              rows={6}
              placeholder="Description"
              variant="outline"
              type="text"
              size="lg"
              {...register("description")}
            />
          </FormControl>

          <BannerPicker onChange={handleFileChange} />
          <Flex justifyContent="center">
            <Button
              type="submit"
              mt="16"
              size="lg"
              variant="primary"
              isLoading={isSubmitting}
              disabled={isSubmitting}
              w="50%"
            >
              Create Room
            </Button>
          </Flex>
        </Container>
      </form>
    </>
  );
};

export default NewRoom;
