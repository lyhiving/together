import { useState, useCallback } from "react";

const useRoomFilter = () => {
  const [data, setData] = useState("");

  const setCustomData = useCallback((id) => {
    console.log("setCustomData", id);
    setData(id);
  }, []);

  return {
    data,
    setCustomData,
  };
};

export default useRoomFilter;
