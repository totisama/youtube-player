import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.tsx'
import { VideoDetails } from './routes/VideoDetails.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CurrentVideoProvider } from './context/CurrentVideo.tsx'
import { Playlists } from './routes/Playlists.tsx'
import './index.css'
import { NavBar } from './components/NavBar.tsx'
import { ModalProvider } from 'styled-react-modal'
import { PlaylistVideos } from './routes/PlaylistVideos.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrentVideoProvider>
      <ModalProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<VideoDetails />} />
            <Route path="/playlists/" element={<Playlists />} />
            <Route path="/playlists/:id" element={<PlaylistVideos />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </CurrentVideoProvider>
  </React.StrictMode>,
)
