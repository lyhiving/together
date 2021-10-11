import React from "react";
import Head from "next/head";
import Home from "src/components/pages/home/Home";
import FilterContextProvider from "src/context/FilterContext";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Together</title>
      </Head>
      <FilterContextProvider>
        <Home />
      </FilterContextProvider>
    </>
  );
};

export default HomePage;
