import { RoomPlatform } from "src/types/schema";

export const RoomPlatforms: { name: string; value: RoomPlatform }[] = [
  { name: "Google Meet", value: "GOOGLE_MEET" },
  { name: "Zoom", value: "ZOOM" },
  { name: "Discord", value: "DISCORD" },
  { name: "Facebook", value: "FACEBOOK" },
  { name: "Other", value: "OTHER" },
];
