import { CSSProperties } from 'react'
import styled from 'styled-components'
import { SectionContainer } from '../../templates/SectionContainer'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { LabelComponent } from '../InputComponent/LabelComponent'

interface SelectComponentProps<T extends FieldValues> {
  name: Path<T>
  exampleOptionText?: string
  selected?: number
  items: {
    value: number
    label: string
  }[]
  isRequired?: boolean
  hasHeader?: boolean
  style?: CSSProperties
  register: UseFormRegister<T>
  errorMessage?: string
}

export const SelectComponent = <T extends FieldValues>({
  name,
  exampleOptionText,
  selected,
  isRequired,
  hasHeader = false,
  style,
  items,
  register,
  errorMessage,
}: SelectComponentProps<T>) => {
  const selectId = `select-${name}`
  return (
    <SectionContainer style={style} hasHeader={hasHeader}>
      {exampleOptionText && (
        <LabelComponent
          text={exampleOptionText}
          isRequired={isRequired}
          htmlFor={selectId}
        />
      )}
      <Select
        id={selectId}
        $error={errorMessage}
        required={isRequired}
        {...register(name)}
      >
        <option value="">{exampleOptionText}</option>
        {items.map((item) => (
          <option
            value={String(item.value)}
            key={item.value}
            selected={item.value === selected}
          >
            {item.label}
          </option>
        ))}
      </Select>
      {!!errorMessage && <ErrorMessageText>{errorMessage}</ErrorMessageText>}
    </SectionContainer>
  )
}

interface SelectProps {
  $error?: string
}

const Select = styled.select<SelectProps>`
  padding: 0.5rem;
  width: 60%;

  background: ${({ theme }) => theme.colors['header-background']};

  color: ${({ theme }) => theme.colors['base-text']};
  @media (max-width: 1000px) {
    width: 100%;
  }

  font-size: 1rem;
  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.span};
`

const ErrorMessageText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 4px;
  font-weight: bold;
`
