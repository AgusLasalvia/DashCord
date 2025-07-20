# 🎧 DashCord

> A cross-platform desktop dashboard to manage YouTube playlists — powered by Tauri, FastAPI, and MongoDB.

## 📌 Overview

**DashCord** is an desktop application designed to manage and store YouTube playlists locally, integrated with a [Discord bot](https://github.com/AgusLasalvia/bandicoot-discord-bot.git). Built using **Next.js** and **Tauri**, it provides a smooth user experience while keeping all data on your device, avoiding dependency on cloud services or constant internet connection. The backend is powered by **Python** with **FastAPI** and **MongoDB**, allowing fast and efficient playlist management. It also includes YouTube video search functionality.

## 🚀 Features

- 🎵 Manage YouTube playlists (create, edit, delete)  
- 🔍 Search videos via YouTube Search API  
- 🤖 Full integration with a Discord music bot  
- 💾 Data stored locally using MongoDB  
- ⚡ High-performance API with FastAPI  
- 🖥️ Cross-platform desktop app using Tauri  
- 🌙 Lightweight Next.js frontend (client-side only)  

## 🧩 Tech Stack

- 🐍 Backend: Python + FastAPI (`/python`)  
- 💽 Database: MongoDB (Atlas Mongo | local )  
- 🔍 YouTube: YouTube Search API  
- 💻 Frontend: Next.js (Client-side only, in `/client`)  
- 🧱 Desktop App Framework: Tauri  
- 🤖 Discord Bot: [View bot repository](https://github.com/AgusLasalvia/bandicoot-discord-bot.git)  

## 📡 API Endpoints

🎵 GET `/playlists/all` — Returns all playlists stored in the database.

📂 GET `/playlists/playlist?id=<playlist_id>` — Returns a single playlist by its unique ID. Query param: `id` = playlist identifier. Example: `/playlists/playlist?id=abc123`

🔍 GET `/songs?q=<search_term>` — Searches YouTube for videos matching the query. Query param: `q` = search string. Example: `/songs?q=linkin+park`

> ℹ️ All endpoints return JSON and use standard HTTP status codes (e.g., 200 OK, 404 Not Found, 401 Unauthorized).

## ⚙️ Environment Variables

Configure these in a `.env` file:

- `MONGODB_URI` — MongoDB connection string for local DB  
- `YOUTUBE_API_KEY` — YouTube Data API key  
- `SECRET_KEY` — Secret key for authentication/token signing  
- Additional variables as needed

## 🛠️ Installation & Development

```bash
git clone https://github.com/AgusLasalvia/DashCord.git
cd DashCord

cd python
pip install -r requirements.txt
cp .env.example .env
# Edit .env file with your variables
uvicorn main:app --reload

cd ../client
npm install
npm run dev

npm run tauri dev
