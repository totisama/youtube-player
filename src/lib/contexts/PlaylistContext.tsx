import { createContext } from 'react'
import { PlaylistContextType } from '../../types/types'

export const PlaylistContext = createContext<PlaylistContextType | null>(null)
