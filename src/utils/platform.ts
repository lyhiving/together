import { RoomPlatform } from "src/types/schema";

export const PlatformList: { id: RoomPlatform; name: string }[] = [
  { id: "GOOGLE_MEET", name: "Google meet" },
  { id: "ZOOM", name: "Zoom" },
  { id: "DISCORD", name: "Discord" },
  { id: "FACEBOOK", name: "Facebook" },
  { id: "OTHER", name: "Other" },
];

export const getPlatformName = (platform?: RoomPlatform) => {
  switch (platform) {
    case "GOOGLE_MEET":
      return "Google Meet";
    case "ZOOM":
      return "Zoom";
    case "DISCORD":
      return "Discord";
    case "FACEBOOK":
      return "Facebook";
    default:
      return "Other";
  }
};

export const getPlatformUrl = (platform?: RoomPlatform) => {
  switch (platform) {
    case "GOOGLE_MEET":
      return "https://apps.google.com/meet/?hs=197&pli=1&authuser=0";
    case "ZOOM":
      return "https://zoom.us";
    case "DISCORD":
      return "https://discord.com";
    case "FACEBOOK":
      return "https://www.facebook.com";
    default:
      return "https://www.google.com";
  }
};
