import { CSSProperties, useEffect, useRef } from 'react'
import * as S from './styles'
import { LabelComponent } from '../LabelComponent'

interface InputComponentProps {
  errorMessage?: string
  labelText?: string
  value: string
  onChangeValue: (value: string) => void
  isRequired?: boolean
  isTextArea?: boolean
  style?: CSSProperties
}

export function InputComponent({
  errorMessage,
  labelText,
  value,
  isRequired,
  isTextArea,
  style,
  onChangeValue,
}: InputComponentProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef && textareaRef.current && isTextArea) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [value, isTextArea])

  return (
    <S.InputContainer style={style}>
      {labelText && <LabelComponent text={labelText} isRequired={isRequired} />}

      {isTextArea ? (
        <S.TextArea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      ) : (
        <S.Input
          type="text"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      )}

      {!!errorMessage && (
        <S.ErrorMessageText>{errorMessage}</S.ErrorMessageText>
      )}
    </S.InputContainer>
  )
}
