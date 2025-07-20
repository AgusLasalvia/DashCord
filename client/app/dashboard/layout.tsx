"use client"
import Sidebar from "@/components/Sidebar/Sidebar";
import "./layout.css"

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (

		<div className="dashboard-layout" >
			<Sidebar />
			<main className="dashboard-main">
				{children}
			</main>
		</div >

	);
}



