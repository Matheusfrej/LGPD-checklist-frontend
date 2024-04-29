import { CSSProperties } from 'react'
import * as S from './styles'
import { SectionContainer } from '../../templates/SectionContainer'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface SelectComponentProps<T extends FieldValues> {
  name: Path<T>
  defaultValueText?: string
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
  defaultValueText,
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
        <option value="">{defaultValueText}</option>
        {items.map((item, index) => (
          <option value={item.value} key={index}>
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
