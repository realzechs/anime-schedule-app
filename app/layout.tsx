import "../styles/globals.css";
import React from "react";

export const metadata = {
  title: "Anime Schedule",
  description: "Current english dubbed Anime schedule",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 min-h-screen font-sans flex flex-col">
        <div className="flex-1">
          {children}
        </div>

        <footer className="w-full py-4 text-center text-xs text-gray-400 border-t border-gray-800">
          Data sourced from the community-maintained{" "}
          <a
            href="https://myanimelist.net/forum/?topicid=1692966"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-gray-100 transition-colors"
          >
            MyAnimeList Dub Schedule
          </a>
          . Thanks to <span className="font-medium text-gray-200">Kenny_Stryker</span> & contributors.
        </footer>
      </body>
    </html>
  );
}