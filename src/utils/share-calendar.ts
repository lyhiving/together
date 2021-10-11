import dayjs from "dayjs";
import { RoomPlatform } from "src/types/schema";
import { getPlatformName } from "src/utils/platform";

export const SHARE_SITES: { [key: string]: string } = {
  GOOGLE: "Google",
  ICAL: "iCal",
  OUTLOOK: "Outlook",
  YAHOO: "Yahoo",
};

export const isMobile = () =>
  /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(
    // @ts-ignore
    window.navigator.userAgent || window.navigator.vendor || window.opera
  );

export const isInternetExplorer = () =>
  /MSIE/.test(window.navigator.userAgent) ||
  /Trident/.test(window.navigator.userAgent);

export const escapeICSDescription = (description: string) =>
  description.replace(/(\r?\n|<br ?\/?>)/g, "\\n");

const googleShareUrl = ({
  description,
  endDatetime,
  location,
  startDatetime,
  title,
}: any) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${startDatetime}/${endDatetime}&location=${location}&text=${title}&details=${description}`;

const yahooShareUrl = ({
  description,
  duration,
  location,
  startDatetime,
  title,
}: any) =>
  `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${title}&st=${startDatetime}&dur=${duration}&desc=${description}&in_loc=${location}`;

const buildShareFile = ({
  description = "",
  endDatetime,
  location = "",
  startDatetime,
  timezone = "",
  title = "",
}: any) => {
  let content = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `URL:${document.URL}`,
    "METHOD:PUBLISH",
    // TODO: Will need to parse the date without Z for ics
    // This means I'll probably have to require a date lib - luxon most likely or datefns
    timezone === ""
      ? `DTSTART:${startDatetime}`
      : `DTSTART;TZID=${timezone}:${startDatetime}`,
    timezone === ""
      ? `DTEND:${endDatetime}`
      : `DTEND;TZID=${timezone}:${endDatetime}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${escapeICSDescription(description)}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\n");

  return isMobile()
    ? encodeURI(`data:text/calendar;charset=utf8,${content}`)
    : content;
};

export interface RoomEvent {
  title: string;
  description?: string;
  platform?: RoomPlatform;
  duration?: number;
  startDatetime: Date;
  endDatetime: Date;
}

export const buildShareUrl = (
  {
    description = "",
    endDatetime,
    platform,
    startDatetime,
    title = "",
  }: RoomEvent,
  type: string
) => {
  const duration = dayjs
    .duration(dayjs(startDatetime).diff(dayjs(endDatetime)))
    .format("hh:mm");
  const encodeURI = type !== SHARE_SITES.ICAL && type !== SHARE_SITES.OUTLOOK;
  const location = getPlatformName(platform);

  const data = {
    description: encodeURI ? encodeURIComponent(description) : description,
    duration,
    endDatetime: dayjs(endDatetime).format("YYYYMMDDTHHmmssZ"),
    location: encodeURI ? encodeURIComponent(location) : location,
    startDatetime: dayjs(startDatetime).format("YYYYMMDDTHHmmssZ"),
    title: encodeURI ? encodeURIComponent(title) : title,
  };

  switch (type) {
    case SHARE_SITES.GOOGLE:
      return googleShareUrl(data);
    case SHARE_SITES.YAHOO:
      return yahooShareUrl(data);
    default:
      return buildShareFile(data);
  }
};
