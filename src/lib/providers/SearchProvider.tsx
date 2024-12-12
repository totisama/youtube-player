import { useState } from 'react'
import { SearchContext } from '../contexts/SearchContext'

interface SearchProps {
  children: React.ReactNode
}

export const SearchProvider = ({ children }: SearchProps) => {
  const [search, setSearch] = useState<string | null>('Amazing videos')

  const setSearchValue = (value: string) => {
    setSearch(value)
  }

  return (
    <SearchContext.Provider value={{ search, setSearch: setSearchValue }}>
      {children}
    </SearchContext.Provider>
  )
}
