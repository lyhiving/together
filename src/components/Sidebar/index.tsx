import { useState } from "react";
import {
  Box,
  Text,
  Accordion,
  useBreakpointValue,
  Flex,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import CategoriesSection from "./CategoriesSection";
import DateTimeSection from "./DateTimeSection";
import PlatformSection from "./PlatformSection";
import { useFilterContext } from "src/context/FilterContext";

const Sidebar = () => {
  const [index] = useState(0);
  const { sidebarVisible, setSidebarVisible } = useFilterContext();
  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  });

  return (
    <Box
      position={isMobile ? "fixed" : "sticky"}
      top="72px"
      h="calc(100vh - 72px)"
      w={["full", "full", "250px", "340px"]}
      borderRightColor="gray.100"
      borderRightWidth="1px"
      overflow="auto"
      bg="white"
      sx={
        isMobile
          ? {
              transition: "transform 0.3s ease 0s, opacity 0.3s ease 0s",
              transform: `translate3d(${
                sidebarVisible ? "0px,0px,0px" : "-100%,0px,0px"
              })`,
            }
          : {}
      }
    >
      <Flex p="4" justifyContent="space-between">
        <Text
          color="black.200"
          fontSize="28px"
          lineHeight="base"
          fontWeight="semibold"
        >
          Filter
        </Text>
        <IconButton
          display={["flex", "flex", "none"]}
          aria-label="Close sidebar"
          w="42px"
          variant="ghost"
          icon={<Icon as={AiFillCloseCircle} w={6} h={6} />}
          onClick={() => setSidebarVisible(false)}
        />
      </Flex>
      <Accordion defaultIndex={[index]} allowMultiple>
        <CategoriesSection />
        <DateTimeSection />
        <PlatformSection />
      </Accordion>
    </Box>
  );
};

export default Sidebar;
