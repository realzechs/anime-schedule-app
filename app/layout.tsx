import "../styles/globals.css";
import React from "react";

export const metadata = {
  title: "Anime Schedule",
  description: "Current english dubbed Anime schedule",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0D17] text-[#EAEAEA] min-h-screen font-sans flex flex-col">
        <div className="flex-1">
          {children}
        </div>

        <footer className="w-full py-4 text-center text-xs text-gray-500 border-t border-white/5">
          Data sourced from the community-maintained{" "}
          <a
            href="https://myanimelist.net/forum/?topicid=1692966"
            target="_blank"
            rel="noreferrer"
            className="text-gray-300 hover:text-white transition-colors"
          >
            MyAnimeList Dub Schedule
          </a>
          . Thanks to <span className="font-medium">Kenny_Stryker</span> & contributors.
        </footer>
      </body>
    </html>
  );
}
