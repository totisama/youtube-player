import { Routes, Route, BrowserRouter } from 'react-router'
import { MainLayout } from './components/layouts/MainLayout'
import { Home } from './pages/Home'
import { SearchProvider } from './lib/providers/SearchProvider'
import { VideoDetails } from './pages/VideoDetails'

export default function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="video/:videoId" element={<VideoDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}
