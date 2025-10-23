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
  const res = await fetch(`${process.env.ANIMESCHEDULE_API_URL}/details`, { next: { revalidate: 60 * 5 } }); // cache on edge for 5m
  if (!res.ok) {
    throw new Error("Failed to fetch schedule");
  }
  const data = await res.json();
  return data as ScheduleResponse;
}

export async function fetchDetailsForId(id: number): Promise<AnimeItem | null> {
  // The schedule endpoint already returns full details in many cases.
  // If a per-id endpoint existed we'd call it here. For now, we will re-use the schedule
  // (caller can pass item). This function is a placeholder for expansion.
  return null;
}
