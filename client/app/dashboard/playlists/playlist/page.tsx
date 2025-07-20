import { Suspense } from "react"
import PlaylistClient from "./PlaylistClient"

export default function Page() {
	return (
		<Suspense fallback={<div>Cargando playlist...</div>}>
			<PlaylistClient />
		</Suspense>
	)
}