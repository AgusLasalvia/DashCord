"use client"
import "./SongCard.css"
import { useState } from "react"
import { useEffect } from "react"
import { getAllPlaylist } from "@/lib/playlist"
import { IPlaylist } from "@/types"

interface SongCardProps {
	title: string,
	artist: string
	youtube_id: string
	onAddToPlaylist?: (song: { title: string, artist: string, youtube_id: string }) => void
}

export default function SongCard(props: SongCardProps) {
	const [isCopied, setIsCopied] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [playlists, setPlaylists] = useState<IPlaylist[]>([])
	const youtubeLink = `https://www.youtube.com/watch?v=${props.youtube_id}`;

	useEffect(() => {
		if (showModal) {
			getAllPlaylist().then(setPlaylists)
		}
	}, [showModal])

	const handleCopy = async () => {
		await navigator.clipboard.writeText(youtubeLink);
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 1500);
	}

	const handleYouTube = (e: React.MouseEvent) => {
		e.stopPropagation();
		window.open(youtubeLink, '_blank');
	}

	const handleAddPlaylist = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (props.onAddToPlaylist) {
			props.onAddToPlaylist({ title: props.title, artist: props.artist, youtube_id: props.youtube_id })
		} else {
			setShowModal(true);
		}
	}

	const handleCloseModal = () => setShowModal(false)

	const handleAddSongToPlaylist = (playlistId: string) => {
		// Aquí va tu lógica para agregar la canción a la playlist
		alert(`Agregar '${props.title}' a playlist ${playlistId}`)
		setShowModal(false)
	}

	return (
		<div className={`song-card${isCopied ? ' copied' : ''}`} data-youtube={youtubeLink}>
			<div className="cover" onClick={handleCopy} title="Copiar link de YouTube">
				<img
					className="img"
					src={`https://img.youtube.com/vi/${props.youtube_id}/hqdefault.jpg`}
					alt="Cover"
				/>
			</div>
			<span className="title">{props.title}</span>
			<div className="actions">
				<button className="btn youtube" title="Ver en YouTube" onClick={handleYouTube}>
					<i className="bi bi-youtube"></i>
				</button>
				<button className="btn add" title="Agregar a playlist" onClick={handleAddPlaylist}>
					<i className="bi bi-plus-lg"></i>
				</button>
			</div>
			<span className="copy-feedback">
				<i className="bi bi-clipboard-check"></i> Copiado!
			</span>

			{/* Modal interno solo si no se pasa onAddToPlaylist */}
			{showModal && !props.onAddToPlaylist && (
				<div className="songcard-modal-overlay" onClick={handleCloseModal}>
					<div className="songcard-modal" onClick={e => e.stopPropagation()}>
						<h3>Agregar a playlist</h3>
						{playlists.length === 0 ? (
							<p>No tienes playlists.</p>
						) : (
							<ul className="songcard-modal-list">
								{playlists.map(pl => (
									<li key={pl._id} className="songcard-modal-item">
										<span>{pl.name}</span>
										<button onClick={() => handleAddSongToPlaylist(pl._id!)} className="songcard-modal-add-btn">Agregar</button>
									</li>
								))}
							</ul>
						)}
						<button className="songcard-modal-close" onClick={handleCloseModal}>Cerrar</button>
					</div>
				</div>
			)}
		</div>
	)
}