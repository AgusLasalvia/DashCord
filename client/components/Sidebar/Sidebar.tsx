"use client"
import "./Sidebar.css"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { logout } from "@/lib/auth"

export default function Sidebar() {
	const router = useRouter()

	return (
		<aside className="sidebar">
			<div className="sidebar-content">
				<div>
					<div className="sidebar-title">
						<i className="bi bi-disc-fill sidebar-logo"></i>
					</div>
					<nav className="sidebar-nav">
						<Link
							href="/dashboard/playlists"
							className={`sidebar-link`}
						><i className="bi bi-music-note-list"></i> <span>Playlists</span></Link>
						<Link
							href="/dashboard/profile"
							className={`sidebar-link`}
						><i className="bi bi-person"></i> <span>Profile</span></Link>
						<Link
							href="/dashboard/songs"
							className={`sidebar-link`}
						><i className="bi bi-search"></i> <span>Search Song</span></Link>
						<Link
							href="#"
							className={`sidebar-link`}
						><i className="bi bi-gear"></i> <span>Settings</span></Link>
					</nav>
				</div>
				<a href="#" className="sidebar-link sidebar-logout" onClick={() => logout(router)}>
					<i className="bi bi-box-arrow-right"></i>
					<span>Logout</span>
				</a>
			</div>
		</aside>
	)
}