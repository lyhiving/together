import { useState, useEffect, ChangeEvent } from "react";
import {
  Flex,
  Box,
  Icon,
  Text,
  FormLabel,
  Center,
  Spinner,
  Image,
  AspectRatio,
  useToast,
} from "@chakra-ui/react";
import { FaImage } from "react-icons/fa";
import { useAuthContext } from "src/context/AuthContext";
import Client from "src/libs/supabase";

interface BannerPickerProps {
  onChange: (filepath: string) => void;
}

const BannerPicker = ({ onChange }: BannerPickerProps) => {
  const toast = useToast();
  const { user } = useAuthContext();
  const [bannerUrl, setBannerUrl] = useState<string | null>();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      const files = event?.target.files;
      if (files && files.length > 0) {
        setIsLoading(true);
        const file = files[0];
        const url = await Client.uploadRoomBanner(
          file as File,
          user?.id as string
        );
        setBannerUrl(url);
        // onChange(url as string);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Oops! Something went wrong!",
        status: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (bannerUrl) {
      onChange(bannerUrl);
    }
  }, [bannerUrl]);

  return (
    <Box mt="10">
      <FormLabel>Room banner </FormLabel>
      <Box
        borderStyle="dashed"
        borderColor="gray.400"
        borderRadius="10px"
        borderWidth="1px"
        position="relative"
        maxW="sm"
        minH="300px"
        mx="auto"
      >
        {bannerUrl ? (
          <Box p="4">
            <AspectRatio ratio={16 / 9}>
              <Image w="full" h="auto" src={bannerUrl as string} />
            </AspectRatio>
            <Text
              position="absolute"
              textAlign="center"
              fontWeight="semibold"
              bottom="16px"
              left="50%"
              transform="translateX(-50%)"
            >
              Change
            </Text>
          </Box>
        ) : (
          <Flex
            position="absolute"
            inset="0"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Icon as={FaImage} w="80px" h="80px" boxSize="64px" />
            <Text
              textAlign="center"
              fontSize="sm"
              lineHeight="base"
              fontWeight="semibold"
              mt="4"
            >
              Drag and Drop File <br />
              or browse media on your device
            </Text>
          </Flex>
        )}
        <input
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            bottom: "0",
            opacity: 0,
            cursor: "pointer",
          }}
          type="file"
          onChange={handleChange}
        />
        {isLoading && (
          <Center position="absolute" inset="0" bg="blackAlpha.500">
            <Spinner color="white" />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default BannerPicker;
