import DayTabs from "../components/DayTabs";
import { fetchSchedule } from "../lib/api";

export default async function Page() {
  const schedule = await fetchSchedule();

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold mb-6 text-center text-gray-900 dark:text-gray-100">
        Anime Schedule
      </h1>
      <div className="w-full max-w-5xl">
        <DayTabs days={schedule.days} />
      </div>
    </div>
  );
}
