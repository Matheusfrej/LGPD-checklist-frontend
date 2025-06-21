import styled from 'styled-components'

interface LabelProps {
  isRequired?: boolean
  text: string
}

export function LabelComponent({ isRequired, text }: LabelProps) {
  return (
    <Label>
      {text}
      {isRequired && <After> *</After>}
    </Label>
  )
}

const Label = styled.h3`
  width: 100%;
  font-size: 14px;
  padding: 8px 0;
  font-weight: normal;
  display: flex;
  align-items: center;
  gap: 4px;
`

const After = styled.span`
  color: ${(props) => props.theme.colors.red};
`
