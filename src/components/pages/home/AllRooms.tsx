import Image from "next/image";
import { Box, Heading, SimpleGrid, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import RoomCard from "./RoomCard";
import AllRoomsSkeleton from "./AllRoomsSkeleton";
import { Room } from "src/types/schema";

interface AllRoomsProps {
  rooms?: Room[];
  isLoading?: boolean;
  isLoadingMore?: boolean;
  isEmpty?: boolean;
  isReachingEnd?: boolean;
  onLoadMore?: () => void;
}

const AllRooms = ({
  rooms = [],
  isLoading = false,
  isLoadingMore = false,
  isEmpty = false,
  isReachingEnd = false,
  onLoadMore,
}: AllRoomsProps) => {
  const renderContent = () => {
    if (isLoading) {
      return <AllRoomsSkeleton />;
    }
    if (isEmpty) {
      return (
        <Box textAlign="center">
          <Image
            width="400px"
            height="400px"
            src="/assets/images/no-data.jpg"
            priority
          />
        </Box>
      );
    }
    return (
      <SimpleGrid columns={[1, 2, 2, 2, 3]} spacing={[4, 4, 8]}>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </SimpleGrid>
    );
  };

  return (
    <Box>
      <Heading mb="6">Popular</Heading>
      {renderContent()}
      {!isEmpty && (
        <Flex justifyContent="center" my="14">
          {isReachingEnd ? (
            <Text fontWeight="semibold">No more data</Text>
          ) : (
            <Button
              onClick={onLoadMore}
              px="32"
              isLoading={isLoadingMore}
              variant="outline"
            >
              Load more
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default AllRooms;
