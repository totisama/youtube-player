import { Routes, Route, BrowserRouter } from 'react-router'
import { MainLayout } from './components/layouts/MainLayout'
import { VideoList } from './pages/VideoList'
import { CurrentVideoProvider } from './lib/providers/CurrentVideoProvider'
import { VideoDetails } from './pages/VideoDetails'
import { Playlists } from './pages/Playlists'
import { Playlist } from './pages/Playlist'
import { PlayPlaylist } from './pages/PlayPlaylist'

export default function App() {
  return (
    <CurrentVideoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<VideoList />} />
            <Route path="video/:videoId" element={<VideoDetails />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist/:playlistId" element={<Playlist />} />
            <Route
              path="playlist/:playlistId/play"
              element={<PlayPlaylist />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </CurrentVideoProvider>
  )
}
