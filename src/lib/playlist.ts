import axios from 'axios'
import {
  PLAYLIST_ITEMS_URL,
  PLAYLIST_METADATA_URL,
  PLAYLIST_URL,
  USER_ID,
} from '../constants'
import {
  PlaylistMetadataResponse,
  PlaylistResponse,
  PlaylistVideo,
  VideoPlaylist,
} from '../types/types'

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

export const deleteVideoFromPlaylist = async (
  videoId: string,
  playlistId: string
) => {
  const playlist: VideoPlaylist = await getPlaylist(playlistId)

  playlist.videos = playlist.videos.filter((video) => video.videoId !== videoId)

  const response = await fetch(`${PLAYLIST_URL}/${playlistId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  })

  return await response.json()
}

export const updatePlaylist = async (playlist: VideoPlaylist) => {
  const response = await fetch(`${PLAYLIST_URL}/${playlist.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(playlist),
  })
  console.log(response)

  return await response.json()
}

export const importYoutubePlaylist = async (playlistId: string) => {
  // const API_KEY = import.meta.env.VITE_YOUTUBE_KEY
  const API_KEY = 'AIzaSyBL5uBwlgedYYanbTLmr107HIwWwZz3s1w'
  try {
    // Fetch metadata and videos concurrently
    const [playlistMetadataRes, playlistItemsRes] = await Promise.all([
      axios.get(`${PLAYLIST_METADATA_URL}&id=${playlistId}&key=${API_KEY}`),
      axios.get(
        `${PLAYLIST_ITEMS_URL}&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`
      ),
    ])

    const playlistMetadata =
      playlistMetadataRes.data as PlaylistMetadataResponse
    const playlistItems = playlistItemsRes.data as PlaylistResponse

    const playlistTitle = playlistMetadata.items[0].snippet.title

    const createdPlaylist = (await createPlaylist({
      name: playlistTitle,
    })) as VideoPlaylist

    const videoItems = playlistItems.items.map((item) => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails.default.url,
    }))

    createdPlaylist.videos = videoItems

    await updatePlaylist(createdPlaylist)
  } catch (error) {
    console.error('Error fetching playlist data:', error)
  }
}
