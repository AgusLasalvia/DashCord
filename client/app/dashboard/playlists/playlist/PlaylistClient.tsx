"use client"
import { useSearchParams } from "next/navigation"
import { getPlaylistByID } from "@/lib/playlist"
import { useEffect, useState } from "react"
import { IPlaylist } from "@/types"
import "./page.css"

export default function PlaylistClient() {
	const params = useSearchParams()
	const id = params.get("id")
	const [playlist, setPlaylist] = useState<IPlaylist>()

	useEffect(() => {
		if (!id) return;
		const fetchPlaylist = async () => {
			const data = await getPlaylistByID(id)
			setPlaylist(data)
		}
		fetchPlaylist()
	}, [id])

	return (
		<div className="playlist-visor-container">
			{playlist ? (
				<>
					<div className="playlist-visor-header">
						<img
							className="playlist-visor-cover"
							src={playlist.songs[0]?.youtube_id ? `https://img.youtube.com/vi/${playlist.songs[0].youtube_id}/hqdefault.jpg` : "/default.png"}
							alt="Cover"
						/>
						<div className="playlist-visor-info">
							<h1 className="playlist-visor-title">{playlist.name}</h1>
							<span className="playlist-visor-creator">Created by <b>{playlist.created_by}</b></span>
							<span className="playlist-visor-count">{playlist.songs.length} songs</span>
						</div>
					</div>
					<div className="playlist-visor-songs-table-container">
						{playlist.songs.length === 0 ? (
							<div className="playlist-visor-empty">This playlist is empty.</div>
						) : (
							<table className="playlist-visor-songs-table">
								<thead>
									<tr>
										<th>#</th>
										<th>Title</th>
										<th>Artist</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{playlist.songs.map((song, idx) => (
										<tr key={idx} className="playlist-visor-song-row">
											<td className="playlist-visor-song-index">{idx + 1}</td>
											<td className="playlist-visor-song-title">{song.title}</td>
											<td className="playlist-visor-song-artist">{song.artist}</td>
											<td className="playlist-visor-song-actions">
												<button className="playlist-visor-song-btn youtube" title="View on YouTube" onClick={() => window.open(`https://www.youtube.com/watch?v=${song.youtube_id}`, '_blank')}>
													<i className="bi bi-youtube"></i>
												</button>
												<button className="playlist-visor-song-btn copy" title="Copy link" onClick={async () => { await navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${song.youtube_id}`); }}>
													<i className="bi bi-clipboard"></i>
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</>
			) : (
				<div className="playlist-visor-loading">Loading playlist...</div>
			)}
		</div>
	)
} 