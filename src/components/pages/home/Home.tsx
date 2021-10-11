import { Box, Button } from "@chakra-ui/react";
import useSWRInfinite from "swr/infinite";
import Sidebar from "src/components/Sidebar";
import AllRooms from "./AllRooms";
import Client from "src/libs/supabase";
import { useFilterContext } from "src/context/FilterContext";

const PAGE_SIZE = 15;

const Home = () => {
  const { categories, platforms, date, setSidebarVisible, sidebarVisible } =
    useFilterContext();

  const { data, error, size, setSize } = useSWRInfinite(
    (index, previousPageData: any) => {
      if (previousPageData && !previousPageData.length) return null;
      const from = PAGE_SIZE * index;
      const to = PAGE_SIZE * (index + 1) - 1;
      return ["all_rooms", categories, platforms, date, from, to];
    },
    (_, categories, platforms, date, from, to) => {
      return Client.getRooms(
        {
          categories,
          platforms,
          start_at: date.startDate,
          end_at: date.endAt,
        },
        {
          from,
          to,
        }
      );
    }
  );

  const isLoading = !data && !error;

  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  const isEmpty = data?.[0]?.length === 0;

  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const rooms = data ? [].concat(...data) : [];

  return (
    <Box display={["block", "block", "flex"]} w="full">
      <Sidebar />
      <Box p="8" flex="1">
        <AllRooms
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          isEmpty={isEmpty}
          isReachingEnd={isReachingEnd}
          rooms={rooms}
          onLoadMore={() => setSize(size + 1)}
        />
      </Box>
      <Box
        justifyContent="center"
        w="full"
        position="fixed"
        top="calc(100vh - 104px)"
        display={["flex", "flex", "none"]}
      >
        <Button shadow="lg" onClick={toggleSidebar} variant="primary">
          Filter
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
