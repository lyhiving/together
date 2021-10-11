import { createClient } from "@supabase/supabase-js";
import {
  User,
  Category,
  Room,
  RoomFilter,
  RoomPagination,
} from "src/types/schema";
import dayjs from "dayjs";

export const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);

const BANNER_BUCKET = "banner";

class Client {
  async createUser(user: Partial<User>) {
    const { error, data } = await supabase.from<User>("users").insert(user);
    if (error) throw error;
    return data;
  }

  async getUserById(id: string) {
    const { error, data } = await supabase
      .from<User>("users")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  }

  async createRoom(room: Partial<Room>) {
    const { error, data } = await supabase.from<Room>("rooms").insert(room);
    if (error) throw error;
    return data;
  }

  async getRooms(filter: RoomFilter, { from = 0, to = 14 }: RoomPagination) {
    const query = supabase
      .from<Room>("rooms")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);
    if (filter.categories && filter.categories.length > 0) {
      query.in("category_id", filter.categories);
    }
    if (filter.platforms && filter.platforms.length > 0) {
      query.in("room_platform", filter.platforms);
    }
    if (filter.start_at) {
      query.gte("start_at", dayjs(filter.start_at).toISOString());
    }
    if (filter.end_at) {
      query.lte("end_at", dayjs(filter.end_at).toISOString());
    }
    const { error, data } = await query;
    if (error) throw error;
    return data;
  }

  async searchRoom() {
    const query = supabase
      .from<Room>("rooms")
      .select("*,categories(id, name)")
      .order("start_at", { ascending: false });
    const { error, data } = await query;
    if (error) throw error;
    return data;
  }

  async getRoomById(id: string, includeRelative: boolean = false) {
    const { error, data } = await supabase
      .from<Room>("rooms")
      .select(includeRelative ? "*,users(*),categories(id,name)" : "*")
      .eq("id", id)
      .limit(1)
      .single();
    if (error) throw error;
    return data;
  }

  async getCategories() {
    const { error, data } = await supabase
      .from<Category>("categories")
      .select("*");
    if (error) throw error;
    return data;
  }

  async uploadRoomBanner(file: File, userId: string) {
    const filename = `${userId}/${new Date().getTime()}`;
    const { error } = await supabase.storage
      .from(BANNER_BUCKET)
      .upload(filename, file, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) throw error;
    const { error: signedError, signedURL } = await supabase.storage
      .from(BANNER_BUCKET)
      .createSignedUrl(filename, 10 * 365 * 24 * 60 * 60); // 10 years
    if (signedError) throw signedError;
    return signedURL;
  }
}

export default new Client();
