import { Routes, Route, BrowserRouter } from 'react-router'
import { MainLayout } from './components/layouts/MainLayout'
import { VideoList } from './pages/VideoList'
import { CurrentVideoProvider } from './lib/providers/CurrentVideoProvider'
import { VideoDetails } from './pages/VideoDetails'

export default function App() {
  return (
    <CurrentVideoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<VideoList />} />
            <Route path="video/:videoId" element={<VideoDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CurrentVideoProvider>
  )
}
