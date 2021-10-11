import { Box, Container, Flex, Skeleton } from "@chakra-ui/react";
import React from "react";

const RoomDetailSkeleton = () => {
  return (
    <Container display={["block", "flex"]} maxW="container.lg" w="full">
      <Box w="50%" py="80px" borderRight="1px solid #E3E1E3">
        <Skeleton w="85%" h="400px" borderRadius="3xl" />
      </Box>
      <Box w="50%" p="10">
        <Skeleton w="300px" h="32px" />
        <Flex mt="4">
          <Skeleton w="24px" h="24px" mr="4" />
          <Skeleton w="150px" h="24px" />
        </Flex>
        <Flex mt="4">
          <Skeleton w="24px" h="24px" mr="4" />
          <Skeleton w="150px" h="24px" />
        </Flex>
        <Box mt="30">
          <Skeleton w="48px" h="18px" />
          <Flex alignItems="center" mt="4">
            <Skeleton w="80px" h="80px" borderRadius="full" mr="4" />
            <Skeleton w="80px" h="24px" />
          </Flex>
        </Box>
        <Box mt="30px">
          <Skeleton w="100%" h="18px" />
          <Skeleton w="97%" h="18px" mt="2" />
          <Skeleton w="95%" h="18px" mt="2" />
          <Skeleton w="93%" h="18px" mt="2" />
          <Skeleton w="90%" h="18px" mt="2" />
          <Skeleton w="87%" h="18px" mt="2" />
        </Box>
        <Flex mt="30">
          <Skeleton w="140px" h="40px" borderRadius="10px" mr="8" />
          <Skeleton w="160px" h="40px" borderRadius="10px" />
        </Flex>
      </Box>
    </Container>
  );
};

export default RoomDetailSkeleton;
