import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Text,
  Stack,
  HStack,
  // Image,
  AspectRatio,
  Skeleton,
} from "@chakra-ui/react";
import { Room } from "src/types/schema";
import dayjs from "dayjs";

interface RoomCardProps {
  room: Room;
}

const RoomCard = ({ room }: RoomCardProps) => {
  const { id, name, description, banner_url, start_at, end_at } = room;
  const startAt = dayjs(start_at);
  const isEnded = end_at ? end_at > new Date() : false;
  return (
    <Link href={`/room/${id}`}>
      <Box
        cursor="pointer"
        opacity={isEnded ? 0.5 : 1}
        shadow="base"
        borderRadius="xl"
        overflow="hidden"
      >
        <AspectRatio w="full" ratio={16 / 9} overflow="hidden">
          <Image
            layout="fill"
            src={banner_url as string}
            // fallbackSrc="/assets/images/room-banner.jpg"
          />
        </AspectRatio>
        <HStack w="full" my="4" spacing="4" px="4">
          <Box textAlign="center">
            <Text
              color="brand.500"
              textTransform="uppercase"
              fontSize="sm"
              fontWeight="semibold"
            >
              {startAt.format("MMM")}
            </Text>
            <Text fontWeight="bold">{startAt.format("DD")}</Text>
            <Text color="gray.400" fontSize="xs" fontWeight="semibold">
              {startAt.format("h:mm A")}
            </Text>
          </Box>
          <Box flex="1">
            <Text noOfLines={[2, 1]} fontWeight="bold">
              {name}
            </Text>
            <Text noOfLines={2} fontSize="sm">
              {description}
            </Text>
          </Box>
        </HStack>
      </Box>
    </Link>
  );
};

export const RoomCardSkeleton = () => {
  return (
    <Box shadow="base" borderRadius="xl" overflow="hidden">
      <Skeleton w="full" h="200px" />
      <HStack w="full" my="4" spacing="4" px="4">
        <Stack alignItems="center" spacing="2" textAlign="center">
          <Skeleton w="60px" h="16px" />
          <Skeleton w="40px" h="18px" />
          <Skeleton w="80px" h="14px" />
        </Stack>
        <Box flex="1">
          <Skeleton w="70%" h="18px" />
          <Skeleton w="90%" h="14px" mt="4" />
          <Skeleton w="95%" h="14px" mt="2" />
        </Box>
      </HStack>
    </Box>
  );
};

export default RoomCard;
