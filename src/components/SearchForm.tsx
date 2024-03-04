import styled from 'styled-components'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

const Form = styled.form`
  width: 50%;
  display: flex;
  margin: 0 auto;
  padding: 35px 0px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0px;
`

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`

const ButtonForm = styled.button`
  outline: 0;
  min-width: 100px;
  width: 10%;
  height: 40px;
  border: 0;
  color: #000000;
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  font-size: 16px;
  position: absolute;
  right: 0;

  &:hover {
    background: #cacfd7;
  }
`

const Input = styled.input`
  min-width: 200px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  border: 0;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
`

export const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const search = searchParams.get('search') || ''

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as typeof e.currentTarget & {
      name: { value: string }
    }

    const value = form.name.value

    if (value === '') {
      return
    }

    const search = new URLSearchParams()

    if (pathname.includes('/detail')) {
      search.set('videoId', pathname.split('/')[2])
    }

    search.set('search', value)

    setSearchParams(search)
    navigate('/?' + search.toString())
  }

  return (
    <Form onSubmit={submit}>
      <FormContainer>
        <Input
          type="text"
          name="name"
          placeholder="Search"
          defaultValue={search}
        />
        <ButtonForm>Search</ButtonForm>
      </FormContainer>
    </Form>
  )
}
