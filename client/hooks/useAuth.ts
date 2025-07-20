"use client"
import { useState, useEffect } from "react";


export function useAuth() {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)


	useEffect(() => {
		const token = localStorage.getItem("token")
		console.log(token)
		setIsAuthenticated(!!token)
	}, [isAuthenticated])

	return { isAuthenticated }
}