
import axios from "axios"

export const login = async (username: string, password: string) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
			{ username, password }
		)
		if (response.status !== 200) return null
		return response.data
	} catch (error: any) {
		return null
	}
}


export const logout = async (router: any) => {
	localStorage.clear()
	router.push("/")
}


export const getUserFromStorage = () => {
	const user = localStorage.getItem("user") as string
	return user
}

