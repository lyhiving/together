import { createClient } from "@supabase/supabase-js";
import dayjs from "dayjs";
import faker from "faker";
import { PlatformList } from "src/utils/platform";

const admin = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_KEY as string
);

export default async function handler(_: any, res: any) {
  const { data: categories } = await admin.from("categories").select("*");
  const { data: users } = await admin.from("users").select("*");

  const save = async () => {
    try {
      const category = randomItem<any>(categories ?? []);
      const user = randomItem<any>(users ?? []);

      const startAt = dayjs(
        faker.date.between(new Date(2021, 9, 1), new Date(2021, 9, 30))
      )
        .startOf("h")
        .set("h", Math.random() * (12 - 1) + 1)
        .toDate();

      const endAt = dayjs(startAt)
        .add(randomItem<any>([15, 30, 45, 60, 75, 90, 120, 150, 180]), "minute")
        .toDate();

      const room = {
        category_id: category.id,
        user_id: user.id,
        name: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        banner_url: faker.image.business(),
        room_url: faker.internet.url(),
        room_platform: randomItem<any>(PlatformList).id,
        start_at: startAt,
        end_at: endAt,
      };
      const { error } = await admin.from("rooms").insert(room);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  await Promise.all(Array.from({ length: 20 }).map((_) => save()));

  res.json({ success: true });
}

const randomItem = <T>(array: T[]) => {
  return array[Math.floor(Math.random() * array.length)];
};
