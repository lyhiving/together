import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  MenuDivider,
  Avatar,
  Box,
} from "@chakra-ui/react";
import { useAuthContext } from "src/context/AuthContext";

function UserMenu() {
  const { user, session, signOut } = useAuthContext();
  const email = session?.user?.email;
  return (
    <Menu>
      <MenuButton>
        <Avatar boxSize="40px" src={user?.avatar} name={user?.name} />
      </MenuButton>
      <MenuList shadow="xl">
        <Box px="4">
          <Text fontWeight="bold">{user?.name}</Text>
          <Text color="gray.600" fontSize="sm">
            {email}
          </Text>
        </Box>
        <MenuDivider />
        <MenuItem
          onClick={async () => {
            await signOut();
          }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default UserMenu;
