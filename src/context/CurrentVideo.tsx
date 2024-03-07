import { createContext, useState, type FC } from 'react'
import { CurrentVideoContextType, CurrentVideoProps } from '../types'

export const CurrentVideoContext =
  createContext<CurrentVideoContextType | null>(null)

export const CurrentVideoProvider: FC<CurrentVideoProps> = ({ children }) => {
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [hasFinished, setHasFinished] = useState(false)

  return (
    <CurrentVideoContext.Provider
      value={{
        currentSeconds,
        setCurrentSeconds,
        hasFinished,
        setHasFinished,
      }}
    >
      {children}
    </CurrentVideoContext.Provider>
  )
}
