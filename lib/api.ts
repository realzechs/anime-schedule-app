export type AnimeItem = {
  title: string;
  url: string;
  status: { aired: number; total: number } | null;
  id: number;
  title_english?: string | null;
  synopsis?: string;
  num_episodes?: number;
  score?: number;
  poster_url?: string | null;
  source?: string;
  studios?: string;
  genres?: string;
};

export type Day = {
  day: string;
  anime: AnimeItem[];
};

export type ScheduleResponse = {
  success: boolean;
  days: Day[];
};

export async function fetchSchedule(): Promise<ScheduleResponse> {
  const res = await fetch(`${process.env.ANIMESCHEDULE_API_URL}/details`, { next: { revalidate: 60 * 5 } });
  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  const data = await res.json();
  return data as ScheduleResponse;
}