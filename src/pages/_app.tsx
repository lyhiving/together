import "react-datepicker/dist/react-datepicker.css";
import "src/styles/react-datepicker.css";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "src/styles/theme";
import Header from "src/components/Header";
import AuthContextProvider from "src/context/AuthContext";
import FilterContextProvider from "src/context/FilterContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const AppWrapper = ({ children }: any) => {
  return (
    <Flex flexDirection="column" minHeight="100vh">
      <Header />
      <Box position="relative" alignItems="flex-start">
        {children}
      </Box>
    </Flex>
  );
};

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <AuthContextProvider>
      <FilterContextProvider>
        <AppWrapper>
          <Component {...pageProps} />
        </AppWrapper>
      </FilterContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);

export default MyApp;
