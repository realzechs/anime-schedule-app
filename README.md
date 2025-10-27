
# 🌸 Anime Schedule - Modern Weekly Anime Release Tracker

A **clean and modern** anime schedule tracker that fetches **detailed weekly airing schedules** and provides **quick torrent access** for each show.

This project uses:

* **Next.js 16**
* **React 18**
* **Tailwind CSS**
* **[Anime Schedule API](https://github.com/itszechs/anime-schedule-api)**
* **[Nyaa API](https://github.com/realzechs/nyaa-api)** 

---

## ✨ Features

* 📅 **Daily Anime Schedule** - See what’s airing today and throughout the week.
* 🖼 **Clean & Modern UI** - Built with Tailwind and follows a minimal aesthetic.
* 🔍 **Anime Details** - View synopsis, genres, episode counts, and airing time.
* 🧲 **Torrent Fetching** - Instantly search torrents for any show via Nyaa API.
* 🌙 **Dark Mode First** - Designed to look nice on OLED screens.
* ⚡ **Fast** - Powered by Next.js server components and caching.

---
## 🖼️ Screenshots

| Schedule View | Details + Torrent View |
|---|---|
| ![Schedule](https://github.com/user-attachments/assets/dd1ed6d9-c098-47ef-8e78-81ead2abb529) | ![Details](https://github.com/user-attachments/assets/01239976-3599-4d1b-a2d0-c004358af15f) |

---

## 🧩 Tech Stack

| Layer                  | Technology                    |
| ---------------------- | ----------------------------- |
| Frontend Framework     | **Next.js 16**                |
| UI Library             | **React 18**                  |
| Styling                | **Tailwind CSS**              |
| Data Source (Schedule) | Anime Schedule API            |
| Torrent Search         | Nyaa API                      |
| Deployment             | Vercel / Docker / Your choice |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/realzechs/anime-schedule.git
cd anime-schedule
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local`:

```bash
ANIMESCHEDULE_API_URL=https://your-anime-schedule-api-deployment-url
NEXT_PUBLIC_NYAA_API_URL=https://your-nyaa-api-deployment-url
```

### 4. Start development server

```bash
npm run dev
```

App will run at:

```
http://localhost:3000
```

---
