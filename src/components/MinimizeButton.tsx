import { MinimizeButtonProps } from '../types/types'
import { StyledButton } from './FloatingPlayer'

export const MinimizeButton = ({
  isMinimized,
  onClick,
}: MinimizeButtonProps) => (
  <StyledButton onClick={onClick}>
    {isMinimized ? (
      <svg
        viewBox="0 0 32 32"
        fill="currentColor"
        style={{ width: '10px', height: '20px' }}
      >
        <path
          fillRule="evenodd"
          d="M28 12h-8V4a4 4 0 1 0-8 0v8H4a4 4 0 1 0 0 8h8v8a4 4 0 1 0 8 0v-8h8a4 4 0 1 0 0-8"
        />
      </svg>
    ) : (
      <svg
        viewBox="0 -12 32 32"
        fill="currentColor"
        style={{ width: '10px', height: '20px' }}
      >
        <path fillRule="evenodd" d="M28 0H4a4 4 0 1 0 0 8h24a4 4 0 1 0 0-8" />
      </svg>
    )}
  </StyledButton>
)
