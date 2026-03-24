import { ReactNode } from 'react'
import styled, { CSSProperties } from 'styled-components'

interface FormContainerProps {
  title?: string
  children: ReactNode
  id?: string
  style?: CSSProperties
  onSubmit: () => void
}

export function FormContainer({
  children,
  title,
  id = 'my-form',
  onSubmit,
  style,
}: FormContainerProps) {
  return (
    <FormWrapper id={id} onSubmit={onSubmit} style={style}>
      {title && <h3>{title}</h3>}
      {children}
    </FormWrapper>
  )
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
