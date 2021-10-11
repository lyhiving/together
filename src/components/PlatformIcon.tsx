import { Box } from "@chakra-ui/react";
import { RoomPlatform } from "src/types/schema";
import GoogleMeetIcon from "src/components/icons/GoogleMeetIcon";

const PlatformIcon = ({ platform = "OTHER" }: { platform?: RoomPlatform }) => {
  if (platform === "GOOGLE_MEET") {
    return <GoogleMeetIcon />;
  }
  return <Box w="4" h="4" bg="#EB1484"></Box>;
};

export default PlatformIcon;
