import { PLAYLIST_URL, USER_ID } from '../constants'

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

export const deletePlaylist = async (id: string) => {
  const response = await fetch(`${PLAYLIST_URL}/${id}`, {
    method: 'DELETE',
  })

  return await response.json()
}
