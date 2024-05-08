import * as S from './styles'

interface CheckboxComponentProps {
  value: string
  labelText: string
  checked: boolean
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined
}

export function CheckboxComponent({
  value,
  labelText,
  checked,
  onChange,
}: CheckboxComponentProps) {
  return (
    <S.CheckboxComponentContainer>
      <label htmlFor={value}>{labelText}</label>
      <input
        type="checkbox"
        itemID={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </S.CheckboxComponentContainer>
  )
}
