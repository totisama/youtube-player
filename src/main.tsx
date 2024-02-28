import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.tsx'
import { VideoDetails } from './routes/VideoDetails.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<VideoDetails />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
