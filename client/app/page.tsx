"use client"

import "./page.css"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/useToast"
import { useAuth } from "@/hooks/useAuth"

import { saveToken } from "@/lib/token"
import { login } from "@/lib/auth"

export default function Page() {

	const { isAuthenticated } = useAuth()
	const router = useRouter()

	const { showToast, ToastContainer } = useToast()
	const [form, setForm] = useState({
		username: "",
		password: ""
	})

	useEffect(() => {
		if (isAuthenticated) 
			router.push("/dashboard/playlists")
	}, [isAuthenticated])


	const handleLogin = async () => {
		try {
			const response = await login(form.username, form.password);

			if (response) {
				saveToken(response.token)
				localStorage.setItem("user", form.username)
				showToast("Login successful! Redirecting...", "success", 2000)
				setTimeout(() => {
					router.push('/dashboard/playlists')
				}, 1000)
			} else {
				showToast("User not found. Please check your credentials.", "error")
			}
		} catch (error) {
			showToast("Connection error. Please check if the server is running.", "error")
		}
	}

	return (
		<>
			<ToastContainer />
			<div className="login-container">
				<form className="login-form">
					<i className="bi bi-person-fill"></i>
					<h2>Log In</h2>
					<div className="input-group">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" name="username" required
							onChange={(e) => {
								setForm({ ...form, username: e.target.value })
							}}
						/>
					</div>
					<div className="input-group">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" required
							onChange={(e) => {
								setForm({ ...form, password: e.target.value })
							}} />
					</div>
					<input type="button" value="Log In" id="loginBtn" onClick={handleLogin} />
				</form>
			</div>
		</>
	)
}
