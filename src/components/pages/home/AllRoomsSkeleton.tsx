import {
  SimpleGrid,
} from "@chakra-ui/react";
import React from "react";
import { RoomCardSkeleton } from "./RoomCard";

const AllRoomsSkeleton = ({ numOfItems = 20 }: { numOfItems?: number }) => {
  return (
    <SimpleGrid w="full" mt="6" columns={[1, 2, 2, 2, 3]} spacing={[4, 4, 8]}>
      {Array.from({ length: numOfItems }).map((_, index) => (
        <RoomCardSkeleton key={index} />
      ))}
    </SimpleGrid>
  );
};

export default AllRoomsSkeleton;
