import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.tsx'
import { VideoDetails } from './routes/VideoDetails.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SearchForm } from './components/SearchForm.tsx'
import './index.css'
import { CurrentVideoProvider } from './context/CurrentVideo.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrentVideoProvider>
      <BrowserRouter>
        <SearchForm />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<VideoDetails />} />
        </Routes>
      </BrowserRouter>
    </CurrentVideoProvider>
  </React.StrictMode>,
)
