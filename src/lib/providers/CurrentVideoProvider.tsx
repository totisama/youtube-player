import { useState } from 'react'
import { CurrentVideo } from '../contexts/CurrentVideoContext'

interface SearchProps {
  children: React.ReactNode
}

export const CurrentVideoProvider = ({ children }: SearchProps) => {
  const [currentMinute, setCurrentMinute] = useState<number>(0)
  const [url, setUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  return (
    <CurrentVideo.Provider
      value={{
        url,
        setUrl,
        currentMinute,
        setCurrentMinute,
        isPlaying,
        setIsPlaying,
      }}
    >
      {children}
    </CurrentVideo.Provider>
  )
}
