import { PLAYLIST_URL, USER_ID } from '../constants'
import { PlaylistVideo, VideoPlaylist } from '../types/types'

export const getPlaylist = async (id: string) => {
  const response = await fetch(`${PLAYLIST_URL}/${id}`)

  return (await response.json()) as VideoPlaylist
}

export const createPlaylist = async (data: { name: string }) => {
  const dataWithUserId = { ...data, userId: USER_ID }

  const response = await fetch(`${PLAYLIST_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataWithUserId),
  })

  return await response.json()
}

export const addVideoToPlaylist = async (
  playlistId: string,
  video: PlaylistVideo
) => {
  const playlist: VideoPlaylist = await getPlaylist(playlistId)

  playlist.videos.push(video)

  const response = await fetch(`${PLAYLIST_URL}/${playlistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  })

  return await response.json()
}

export const deletePlaylist = async (id: string) => {
  const response = await fetch(`${PLAYLIST_URL}/${id}`, {
    method: 'DELETE',
  })

  return await response.json()
}
