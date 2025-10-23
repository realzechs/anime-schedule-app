"use client";
import { useState } from "react";
import AnimeCard from "./AnimeCard";
import { Day } from "../lib/api";
import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";

export default function DayTabs({ days }: { days: Day[] }) {
  const dayOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const sorted = dayOrder
    .map(d => days.find(x => x.day.toLowerCase() === d))
    .filter(Boolean) as Day[];

  const today = dayOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const initialDay = sorted.find(d => d.day.toLowerCase() === today)?.day ?? sorted[0]?.day ?? "monday";

  const [active, setActive] = useState(initialDay);
  const activeDay = sorted.find(d => d.day.toLowerCase() === active.toLowerCase()) ?? sorted[0];

  return (
    <div className="flex flex-col items-center w-full">
      {/* Tabs */}
      <nav className="flex gap-3 mb-6 p-3 rounded-2xl bg-white/20 dark:bg-gray-900/30 backdrop-blur-md shadow-md justify-center">
        {sorted.map(d => {
          const isActive = active.toLowerCase() === d.day.toLowerCase();
          return (
           <button
              key={d.day}
              onClick={() => setActive(d.day)}
              className={classNames(
                "px-5 py-2 rounded-full font-medium transition-all duration-300 text-sm",
                {
                  "bg-white/20 dark:bg-gray-900/30 text-white shadow-lg backdrop-blur-md": isActive,
                  "text-gray-400 hover:bg-gray-100/30 dark:hover:bg-gray-700/30": !isActive,
                }
              )}
            >
              {d.day[0].toUpperCase() + d.day.slice(1)}
            </button>
          );
        })}
      </nav>

      {/* Active Day Section with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDay.day} // important for AnimatePresence
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col items-center space-y-4"
        >
          <div className="space-y-4 w-full">
            {activeDay.anime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
