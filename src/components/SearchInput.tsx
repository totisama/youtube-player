import styled from 'styled-components'
import { useForm } from 'react-hook-form'
import { SearchContext } from '../lib/contexts/SearchContext'
import { SearchContextType } from '../types/types'
import { useContext } from 'react'

interface SearchFormData {
  search: string
}

export function SearchInput() {
  const { setSearch } = useContext(SearchContext) as SearchContextType
  const { register, handleSubmit } = useForm<SearchFormData>()

  const onSubmit = (data: SearchFormData) => {
    setSearch(data.search)
  }

  return (
    <InputContainer onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Search videos..."
        {...register('search', {
          required: { value: true, message: 'Required' },
        })}
      />
    </InputContainer>
  )
}

const InputContainer = styled.form`
  width: 100%;
  max-width: 400px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #ff0000;
    box-shadow: 0 0 5px rgba(255, 0, 0, 0.5);
  }
`
