"use client"
import { getPlaylistByID, deleteSongsFromPlaylistByID } from "@/lib/playlist"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/useToast"
import { IPlaylist } from "@/types"
import "./page.css"

export default function PlaylistClient() {
	const router = useRouter()
	const params = useSearchParams()
	const id = params.get("id")
	const [playlist, setPlaylist] = useState<IPlaylist>()
	const { showToast, ToastContainer } = useToast()

	const fetchPlaylist = async () => {
		if (!id) return;
		const data = await getPlaylistByID(id)
		setPlaylist(data)
	}

	useEffect(() => {
		fetchPlaylist()
	}, [id])

	const handleDeleteSong = async (song_id: string) => {
		if (!id) return;
		const ok = await deleteSongsFromPlaylistByID(id, song_id)
		if (ok) {
			showToast("Canción eliminada de la playlist", "success")
			fetchPlaylist()
		} else {
			showToast("Error al eliminar la canción", "error")
		}
	}

	const handleDeletePlaylist = async () => {
		if (!id) return;
		const ok = await deleteSongsFromPlaylistByID(id, "")
		if (ok) {
			showToast("Playlist eliminada", "success")
			router.push("/dashboard/playlists")
		} else {
			showToast("Error al eliminar la playlist", "error")
		}
	}

	return (
		<div className="playlist-visor-container">
			<ToastContainer />
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
						<div>
							<button className="playlist-visor-song-btn delete" onClick={handleDeletePlaylist}><i className="bi bi-trash"></i></button>
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
												<button className="playlist-visor-song-btn delete" title="Eliminar canción" onClick={() => handleDeleteSong(song.youtube_id)}>
													<i className="bi bi-trash"></i>
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