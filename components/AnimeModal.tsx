"use client";
import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown, FaBox, FaFilm, FaDownload, FaRegCalendarAlt, FaMagnet } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { AnimeItem } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import useNyaa from "../hooks/useNyaa";

export default function AnimeModal({ initial, onClose }: { initial: AnimeItem; onClose: () => void }) {
  const [searchTitle, setSearchTitle] = useState(initial.title);
  const titleForSearch = `VARYG DUAL 1080p ${searchTitle.replace(/\s+/g, "+")}`;
  const { data: nyaaData, loading, error } = useNyaa(titleForSearch, initial.id);

  // Retry search with English title if no results
  useEffect(() => {
    if (!loading && !error && nyaaData?.torrents?.length === 0 && initial.title_english && searchTitle !== initial.title_english) {
      setSearchTitle(initial.title_english);
    }
  }, [loading, error, nyaaData, initial.title_english, searchTitle]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {/* Overlay */}
      <motion.div
        key="overlay"
        onClick={onClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Modal container */}
      <motion.div
        key="modal"
        layoutId={`card-${initial.id}`}
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-0 z-40 flex items-start justify-center p-6 sm:p-12 overflow-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      >
        {/* Card content */}
        <div className="relative w-full max-w-5xl bg-white/20 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 overflow-auto max-h-[90vh]">
          <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
            {/* Poster */}
            <div className="w-48 sm:w-56 h-64 sm:h-80 rounded-2xl overflow-hidden border-2 border-white/20 dark:border-gray-700/50 shrink-0">
              <img
                src={initial.poster_url || ""}
                alt={initial.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <motion.div
              className="flex-1 flex flex-col min-w-0 opacity-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.25 }}
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 wrap-break-word break-all">
                    {initial.title_english || initial.title}
                  </h2>
                  {initial.genres && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {initial.genres.split(", ").map((g) => (
                        <span
                          key={g}
                          className="bg-indigo-100/30 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-lg text-sm"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition p-1 rounded-full"
                  aria-label="Close modal"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>

              {/* Synopsis */}
              <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line line-clamp-10">
                {initial.synopsis}
              </p>

              {/* Nyaa Torrents */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100 text-lg">Nyaa Torrents</h3>

                {loading && (
                  <div className="flex justify-center items-center py-8">
                    <div className="w-8 h-8 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {error && <div className="text-red-500">Error: {String(error)}</div>}
                {!loading && !error && nyaaData?.torrents?.length === 0 && (
                  <div className="text-gray-500">No results found.</div>
                )}

                <div className="max-h-96 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-indigo-400/60 scrollbar-track-gray-100/20 dark:scrollbar-thumb-indigo-700/60 dark:scrollbar-track-gray-700/20 scrollbar-thumb-rounded scrollbar-track-rounded">
                  <ul className="space-y-3">
                    {nyaaData?.torrents?.map((t) => (
                      <li
                        key={t.id}
                        className="p-4 bg-white/10 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl flex flex-col gap-3 border border-white/10 dark:border-gray-700 hover:shadow-lg transition"
                      >
                        {/* Torrent Name */}
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-base font-semibold text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition line-clamp-2 cursor-pointer"
                          title={t.name}
                        >
                          {t.name}
                        </a>

                        {/* Tags */}
                        <div className="flex flex-wrap text-xs gap-2">
                          <span className="flex items-center gap-1 bg-indigo-100/30 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-lg">
                            <FaFilm className="w-3 h-3" /> {t.category}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-200/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-lg">
                            <FaBox className="w-3 h-3" /> {t.size}
                          </span>
                          <span className="flex items-center gap-1 bg-green-100/30 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-lg">
                            <FaArrowUp className="w-3 h-3" /> {t.seeders}
                          </span>
                          <span className="flex items-center gap-1 bg-red-100/30 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-0.5 rounded-lg">
                            <FaArrowDown className="w-3 h-3" /> {t.leechers}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-200/20 dark:bg-gray-700/20 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-lg">
                            <FaDownload className="w-3 h-3" /> {t.downloads}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-200/20 dark:bg-gray-700/20 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-lg">
                            <FaRegCalendarAlt className="w-3 h-3" /> {t.date}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-2">
                          <a
                            href={t.magnet}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-4 py-1 text-sm font-semibold bg-indigo-50/50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 rounded-xl hover:bg-indigo-100/70 dark:hover:bg-indigo-800/70 transition"
                          >
                            <FaMagnet className="w-4 h-4" /> Magnet
                          </a>
                          <a
                            href={t.downloadUrl}
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-1 px-4 py-1 text-sm font-semibold bg-gray-100/40 text-gray-800 dark:bg-gray-700/30 dark:text-gray-200 rounded-xl hover:bg-gray-200/60 dark:hover:bg-gray-600/50 transition"
                          >
                            <FaDownload className="w-4 h-4" /> Download
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
