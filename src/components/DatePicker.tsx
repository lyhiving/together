import React, { HTMLAttributes } from "react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import { Box, useColorMode } from "@chakra-ui/react";

interface Props extends ReactDatePickerProps {
  size?: "md" | "lg";
  showPopperArrow?: boolean;
}

const DatePicker = ({
  dateFormat = "dd/MM/yyyy HH:mm",
  size = "md",
  showPopperArrow = false,
  ...rest
}: Props & HTMLAttributes<HTMLElement>) => {
  const isLight = useColorMode().colorMode === "light"; //you can check what theme you are using right now however you want

  const height = size === "lg" ? "60px" : "40px";
  return (
    // if you don't want to use chakra's colors or you just wwant to use the original ones,
    // set className to "light-theme-original" ↓↓↓↓
    <Box h={height} className={isLight ? "light-theme" : "dark-theme"}>
      <ReactDatePicker
        dateFormat={dateFormat}
        showPopperArrow={showPopperArrow}
        className="react-datapicker__input-text" //input is white by default and there is no already defined class for it so I created a new one
        {...rest}
      />
    </Box>
  );
};

export default DatePicker;
