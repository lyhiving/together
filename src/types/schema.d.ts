export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  room_count: number;
}

export type RoomPlatform =
  | "GOOGLE_MEET"
  | "ZOOM"
  | "DISCORD"
  | "FACEBOOK"
  | "OTHER";

export interface Room {
  id: string;
  user_id: string;
  users: User;
  category_id: string;
  categories: Category;
  name: string;
  banner_url?: string;
  room_url?: string;
  room_platform?: RoomPlatform;
  description?: string;
  start_at?: Date;
  end_at?: Date;
  created_at?: Date;
}

export interface RoomFilter {
  categories?: string[];
  start_at?: Date;
  end_at?: Date;
  platforms?: RoomPlatform[];
}

export interface RoomPagination {
  // page_size: number;
  from?: number;
  to?: number;
}
