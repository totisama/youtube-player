import { createContext } from 'react'
import { CurrentVideoType } from '../../types/types'

export const CurrentVideo = createContext<CurrentVideoType | null>(null)
