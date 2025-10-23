import "../styles/globals.css";
import React from "react";

export const metadata = {
  title: "Anime Schedule",
  description: "Current english dubbed Anime schedule",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0B0D17] text-[#EAEAEA] min-h-screen p-8 font-sans transition-colors duration-300">
        <div className="min-h-screen p-8">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
