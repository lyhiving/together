import dayjs from "dayjs";

const now = dayjs();

export const defaultStartAt = now
  .set("h", now.hour() + 1)
  .startOf("h")
  .toDate();

export const defaultEndAt = dayjs(defaultStartAt).add(2, "h").toDate();
