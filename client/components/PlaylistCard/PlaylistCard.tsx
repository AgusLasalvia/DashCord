import Link from "next/link"
import "./PlaylistCard.css"

interface PlaylistCardProp {
	_id: string
	title: string,
	created: string,
	cover: string
}

export default function PlaylistCard(props: PlaylistCardProp) {
	const palylist_href = "/dashboard/playlists/playlist?id=" + props._id
	const creatorInitial = props.created ? props.created[0].toUpperCase() : "?";

	return (
		<Link className="playlist-card" href={palylist_href}>
			<div className="cover">
				<img className="img" src={props.cover} alt="Cover" />
			</div>
			<span className="title">{props.title}</span>
			<div className="meta">
				<span className="avatar">{creatorInitial}</span>
				<span className="creator">{props.created}</span>
			</div>
		</Link>
	)
}