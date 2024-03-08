import { CSSProperties, useEffect, useRef, useState } from 'react'
import * as S from './styles'
import { LabelComponent } from '../LabelComponent'

interface InputComponentProps {
  errorMessage?: string
  labelText?: string
  isRequired?: boolean
  isTextArea?: boolean
  style?: CSSProperties
}

export function InputComponent({
  errorMessage,
  labelText,
  isRequired,
  isTextArea,
  style,
}: InputComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const textareaRef = useRef<any>()
  const [currentValue, setCurrentValue] = useState('') // you can manage data with it

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [currentValue])

  return (
    <S.InputContainer style={style}>
      {labelText && <LabelComponent text={labelText} isRequired={isRequired} />}

      {isTextArea ? (
        <S.TextArea
          ref={textareaRef}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
        />
      ) : (
        <S.Input type="text" />
      )}

      {!!errorMessage && (
        <S.ErrorMessageText>{errorMessage}</S.ErrorMessageText>
      )}
    </S.InputContainer>
  )
}
