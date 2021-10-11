import "react-datepicker/dist/react-datepicker.css";
import "src/styles/react-datepicker.css";
import { ChakraProvider, Flex, Box } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import theme from "src/styles/theme";
import Header from "src/components/Header";
import AuthContextProvider from "src/context/AuthContext";
import FilterContextProvider from "src/context/FilterContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const SEORender = () => {
  const { asPath } = useRouter();

  return (
    <DefaultSeo
      title="Together"
      openGraph={{
        type: "website",
        locale: "en_EN",
        description: "No one is alone",
        url: `${process.env.FULL_APP_URL}${asPath}`,
        site_name: "Together",
        title: "Together",
        images: [
          {
            width: 1200,
            height: 620,
            url: `${process.env.FULL_APP_URL}/og-image.png`,
          },
        ],
      }}
      twitter={{
        handle: "@together",
        site: "@together",
        cardType: "summary_large_image",
      }}
      description="No one is alone"
    />
  );
};

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
  <>
    <SEORender />
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <FilterContextProvider>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </FilterContextProvider>
      </AuthContextProvider>
    </ChakraProvider>
  </>
);

export default MyApp;
