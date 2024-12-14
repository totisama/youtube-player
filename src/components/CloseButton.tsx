import { CloseButtonProps } from '../types/types'
import { StyledButton } from './FloatingPlayer'

export const CloseButton = ({ onClick }: CloseButtonProps) => (
  <StyledButton onClick={onClick}>
    <svg viewBox="0 0 24 24" style={{ width: '20px', height: '30px' }}>
      <path
        fill="currentColor"
        d="M6.995 7.006a1 1 0 0 0 0 1.415l3.585 3.585-3.585 3.585a1 1 0 1 0 1.414 1.414l3.585-3.585 3.585 3.585a1 1 0 0 0 1.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 0 0-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 0 0-1.414 0Z"
      />
    </svg>
  </StyledButton>
)
