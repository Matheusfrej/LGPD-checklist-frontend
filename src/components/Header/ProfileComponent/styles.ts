import styled from 'styled-components'

export const ProfileContainer = styled.div``

export const Avatar = styled.div`
  border-radius: 10px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.contrast};
  color: ${({ theme }) => theme.colors['base-background']};
  font-weight: bold;
  font-size: 1.25rem;
  cursor: pointer;
`

export const ProfileOpenedContainer = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: 1rem;
  margin-left: -8.5rem;
  border-radius: 6px;
  gap: 0.5rem;
  box-shadow: 1px 1px 1px 1px ${({ theme }) => theme.colors.span};
  padding: 1rem;

  background: ${({ theme }) => theme.colors['header-background']};
`

export const Option = styled.div`
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors['base-background']};
  }
`
