import { Routes, Route, BrowserRouter } from 'react-router'
import { MainLayout } from './components/layouts/MainLayout'
// import { Home } from './pages/Home'
// import { VideoDetails } from './pages/VideoDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="video/:id" element={<VideoDetails />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
