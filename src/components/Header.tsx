import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  Container,
  Button,
  IconButton,
  Image,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import SearchBox from "./SearchBox";
import { FaStream } from "react-icons/fa";
import UserMenu from "src/components/UserMenu";
import { useAuthContext } from "src/context/AuthContext";
import Routes from "src/contants/routes";

const Header = () => {
  const { isLoggedIn, openLoginModal } = useAuthContext();
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, md: true, lg: false });

  const renderRightSection = () => {
    if (isLoggedIn) {
      return (
        <Flex alignItems="center">
          <IconButton
            display={["block", "block", "none"]}
            aria-label="Menu"
            boxSize="40px"
            variant="ghost"
            icon={<Icon as={FaStream} color="gray.400" />}
          />
          <Button
            mr="20px"
            variant="primary"
            display={["none", "none", "inline-flex"]}
            onClick={() => router.push(Routes.NEW_ROOM)}
          >
            Create
          </Button>
          <UserMenu />
        </Flex>
      );
    }
    return (
      <Box>
        <IconButton
          display={["block", "block", "none"]}
          aria-label="Menu"
          boxSize="40px"
          variant="ghost"
          icon={<Icon as={FaStream} color="gray.400" />}
        />
        <Button
          lineHeight="base"
          color="branda.200"
          fontSize="base"
          fontWeight="semibold"
          variant="link"
          mr="20px"
          onClick={() => openLoginModal()}
          display={["none", "none", "inline-flex"]}
        >
          Login
        </Button>
        <Button
          display={["none", "none", "inline-flex"]}
          variant="primary"
          onClick={() => router.push(Routes.SIGN_UP)}
        >
          Create
        </Button>
      </Box>
    );
  };

  return (
    <Box
      w="full"
      h="16"
      position="sticky"
      top="0"
      zIndex="10"
      bg="white"
      borderBottom="1px solid #E3E1E3"
    >
      <Container
        h="full"
        display="flex"
        alignItems="center"
        maxW="container.xl"
        py="6"
      >
        <Link href="/">
          <Button variant="link">
            <Image
              src={isMobile ? "/logo.jpg" : "/logo-text.png"}
              w="auto"
              h="40px"
            />
          </Button>
        </Link>
        <Box mx="6" flex="1">
          <SearchBox />
        </Box>
        {renderRightSection()}
      </Container>
    </Box>
  );
};

export default Header;
