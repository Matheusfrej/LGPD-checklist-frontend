import styled from 'styled-components'

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
    <CheckboxComponentContainer>
      <label htmlFor={value}>{labelText}</label>
      <input
        type="checkbox"
        itemID={value}
        value={value}
        checked={checked}
        onChange={onChange}
      />
    </CheckboxComponentContainer>
  )
}

const CheckboxComponentContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;

  input[type='checkbox'] {
    width: 1.25rem;
    height: 1.25rem;
    accent-color: ${({ theme }) => theme.colors.contrast};
  }
`
