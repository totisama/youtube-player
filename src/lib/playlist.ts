import { CREATE_PLAYLIST_URL } from '../constants'

export const createPlaylist = async (data: { name: string }) => {
  const response = await fetch(`${CREATE_PLAYLIST_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return await response.json()
}

export const deletePlaylist = async (id: string) => {
  const response = await fetch(`${CREATE_PLAYLIST_URL}/${id}`, {
    method: 'DELETE',
  })

  console.log('Playlist deleted', response)
  return await response.json()
}
