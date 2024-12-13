import { useState } from 'react'
import { CurrentVideo } from '../contexts/CurrentVideoContext'

interface SearchProps {
  children: React.ReactNode
}

export const CurrentVideoProvider = ({ children }: SearchProps) => {
  const [currentMinute, setCurrentMinute] = useState<string>('')
  const [url, setUrl] = useState<string>('')
  const [playing, setPlaying] = useState<boolean>(false)

  return (
    <CurrentVideo.Provider
      value={{
        url,
        setUrl,
        currentMinute,
        setCurrentMinute,
        playing,
        setPlaying,
      }}
    >
      {children}
    </CurrentVideo.Provider>
  )
}
