import { createContext, useState, type FC } from 'react'
import { CurrentVideoContextType, CurrentVideoProps } from '../types'

export const CurrentVideoContext =
  createContext<CurrentVideoContextType | null>(null)

export const CurrentVideoProvider: FC<CurrentVideoProps> = ({ children }) => {
  const [currentSeconds, setCurrentSeconds] = useState(0)

  return (
    <CurrentVideoContext.Provider
      value={{
        currentSeconds,
        setCurrentSeconds,
      }}
    >
      {children}
    </CurrentVideoContext.Provider>
  )
}
