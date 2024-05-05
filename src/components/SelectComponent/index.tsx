import { CSSProperties } from 'react'
import * as S from './styles'
import { SectionContainer } from '../../templates/SectionContainer'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

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
  return (
    <SectionContainer style={style} hasHeader={hasHeader}>
      <S.Select $error={errorMessage} required={isRequired} {...register(name)}>
        <option value="">{exampleOptionText}</option>
        {items.map((item) => (
          <option
            value={item.value}
            key={item.value}
            selected={item.value === selected}
          >
            {item.label}
          </option>
        ))}
      </S.Select>
      {!!errorMessage && (
        <S.ErrorMessageText>{errorMessage}</S.ErrorMessageText>
      )}
    </SectionContainer>
  )
}
