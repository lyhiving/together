import { useState, useEffect } from "react";
import {
  Text,
  AccordionItem,
  AccordionPanel,
  AccordionIcon,
  AccordionButton,
  Stack,
} from "@chakra-ui/react";
import DatePicker from "../DatePicker";
import { useFilterContext } from "src/context/FilterContext";

const DateTimeSection = () => {
  const { setDate } = useFilterContext();
  const [startAt, setStartAt] = useState<Date>();
  const [endAt, setEndAt] = useState<Date>();

  useEffect(() => {
    if (startAt && endAt) {
      setDate({ startAt, endAt });
    }
  }, [startAt, endAt]);

  return (
    <AccordionItem>
      <AccordionButton py="4">
        <Text
          color="black.200"
          lineHeight="base"
          fontWeight="semibold"
          flex="1"
          textAlign="left"
        >
          Date
        </Text>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4}>
        <Stack w="full" justifyContent="space-between">
          <Text>Start at</Text>
          <DatePicker
            showTimeSelect={false}
            // minDate={new Date()}
            selected={startAt}
            onChange={(date) => setStartAt(date as Date)}
            dateFormat="dd/MM/yyyy"
            isClearable
          />
        </Stack>
        <Stack justifyContent="space-between" w="full" mt="4">
          <Text>End at</Text>
          <DatePicker
            showTimeSelect={false}
            selected={endAt}
            onChange={(date) => setEndAt(date as Date)}
            dateFormat="dd/MM/yyyy"
            // minDate={startAt}
            isClearable
          />
        </Stack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default DateTimeSection;
