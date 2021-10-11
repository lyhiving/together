import Head from "next/head";
import useSWR from "swr";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import {
  Container,
  Box,
  Button,
  Image,
  Text,
  Heading,
  Avatar,
  HStack,
  Icon,
  Link,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import PlatformIcon from "src/components/PlatformIcon";
import RoomSkeleton from "src/components/pages/room/RoomSkeleton";
import AddCalendarButton from "src/components/pages/room/AddCalendarButton";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "src/components/SocialSharing";
import Client from "src/libs/supabase";
import { getPlatformName } from "src/utils/platform";
import { Room } from "src/types/schema";

const RoomDetail = () => {
  const router = useRouter();
  const { data: room, error } = useSWR(
    router.query.id ? ["room", router.query.id] : null,
    (_, id) => Client.getRoomById(id, true)
  );

  const isLoading = !room && !error;

  if (isLoading) return <RoomSkeleton />;

  if (error) return <div>{error?.message}</div>;

  return (
    <>
      <Head>
        <title>{room?.name} | Together</title>
      </Head>
      <Container display={["block", "flex"]} maxW="container.lg" w="full">
        <Box w="50%" py="80px" borderRight="1px solid #E3E1E3">
          <Box w="85%" borderRadius="3xl" overflow="hidden">
            <Image
              alt={room?.name}
              fallbackSrc="/assets/images/room-banner.jpg"
              w="full"
              src={room?.banner_url}
            />
          </Box>
          <HStack w="85%" justifyContent="center" spacing="4" mt="30px">
            <FacebookShareButton
              url={`${process.env.APP_URL}/room/${room?.id}`}
            />
            <TwitterShareButton
              url={`${process.env.APP_URL}/room/${room?.id}`}
            />
            <LinkedinShareButton
              url={`${process.env.APP_URL}/room/${room?.id}`}
            />
          </HStack>
        </Box>
        <Box w="50%" p="10">
          <Heading>{room?.name}</Heading>
          <HStack spacing="2" mt="1">
            <Icon color="gray.400" as={FaCalendarAlt} />
            <Text fontSize="sm" fontWeight="semibold">
              {dayjs(room?.start_at).format("MMMM D, YYYY")}
              <Text ml="2" as="span">{`${dayjs(room?.start_at).format(
                "h:mm A"
              )}-${dayjs(room?.end_at).format("h:mm A")}`}</Text>
            </Text>
          </HStack>
          <HStack spacing="2" mt="2">
            <PlatformIcon platform={room?.room_platform} />
            <Text fontSize="sm" fontWeight="semibold">
              {getPlatformName(room?.room_platform)}
            </Text>
          </HStack>
          <Box mt="30px">
            <Text fontSize="xs">Host</Text>
            <HStack spacing="2" mt="10px">
              <Avatar boxSize="54px" src={room?.users?.avatar} />
              <Text fontSize="sm" fontWeight="bold">
                {room?.users?.name}
              </Text>
            </HStack>
          </Box>
          <Text mt="30px">{room?.description}</Text>
          <HStack spacing="4" mt="30px">
            <Link isExternal href={room?.room_url}>
              <Button variant="primary">Join</Button>
            </Link>
            <AddCalendarButton room={room as Room} />
          </HStack>
        </Box>
      </Container>
    </>
  );
};

export default RoomDetail;
