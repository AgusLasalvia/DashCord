import axios from "axios";
import { getToken } from "./token";
import { IPlaylist, ISong } from "@/types";


export const getAllPlaylist = async () => {
	const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/playlists/all", {
		headers: {
			Authorization: "Bearer " + getToken()
		}
	})
	const data = response.data;
	if (data)
		return data;
	return [];
};


export const getPlaylistByID = async (id: string) => {
	const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + "/playlists/playlist", {
		headers: {
			Authorization: "Bearer " + getToken()
		},
		params: { "id": id }
	})
	return response.data;
};


export const createPlaylist = async (playlist: IPlaylist) => {
	const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/playlists/create", playlist, {
		headers: {
			Authorization: "Bearer " + getToken()
		}
	})
	if (response.status == 201)
		return response.data
	return false
};

export const addSongToPlaylist = (song: ISong, playlistID: string) => {
	return axios.patch(process.env.NEXT_PUBLIC_API_URL + "/playlists/add", {
		id: playlistID,
		song: song
	}, {
		headers: {
			Authorization: "Bearer " + getToken()
		}
	})
}


export const deleteSongsFromPlaylistByID = async (id: string) => {

};