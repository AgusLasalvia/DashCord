"use client"
import "./page.css"
import { useState } from "react";

export default function Page() {
	const [profile, setProfile] = useState({
		username: "Agustin",
		email: "agustin@email.com"
	});

	return (
		<section className="dashboard-profile">
			<div className="profile-card">
				<div className="avatar">A</div>
				<h2 className="username">{profile.username}</h2>
				<p className="subtitle">Miembro desde 2024</p>
				<div className="input-group">
					<label htmlFor="username-input">Usuario</label>
					<input
						id="username-input"
						type="text"
						value={profile.username}
						onChange={e => setProfile({ ...profile, username: e.target.value })}
					/>
				</div>
				<div className="input-group">
					<label htmlFor="email-input">Email</label>
					<input
						id="email-input"
						type="email"
						value={profile.email}
						onChange={e => setProfile({ ...profile, email: e.target.value })}
					/>
				</div>
				<button className="edit-btn">Editar perfil</button>
			</div>
		</section>
	)
}