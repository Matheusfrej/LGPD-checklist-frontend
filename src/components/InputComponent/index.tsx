import {
  CSSProperties,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import * as S from './styles'
import { LabelComponent } from '../LabelComponent'
import { SectionContainer } from '../SectionContainer'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface InputComponentProps<T extends FieldValues> {
  name: Path<T>
  labelText?: string
  isRequired?: boolean
  isTextArea?: boolean
  hasHeader?: boolean
  style?: CSSProperties
  register: UseFormRegister<T>
  errorMessage?: string
}

export const InputComponent = <T extends FieldValues>({
  name,
  labelText,
  isRequired,
  isTextArea,
  hasHeader = false,
  style,
  register,
  errorMessage,
}: InputComponentProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [currVal, setCurrVal] = useState('')

  useEffect(() => {
    if (textareaRef && textareaRef.current && isTextArea) {
      textareaRef.current.style.height = '0px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = scrollHeight + 'px'
    }
  }, [currVal, isTextArea])

  const { ref, ...rest } = register(name, {
    onChange: (e: { target: { value: SetStateAction<string> } }) => {
      setCurrVal(e.target.value)
    },
  })

  useImperativeHandle(ref, () => textareaRef.current)

  return (
    <SectionContainer style={style} hasHeader={hasHeader}>
      {labelText && <LabelComponent text={labelText} isRequired={isRequired} />}

      <S.InputContainer>
        {isTextArea ? (
          <S.TextArea
            $error={errorMessage}
            required={isRequired}
            {...rest}
            ref={textareaRef}
          />
        ) : (
          <S.Input
            $error={errorMessage}
            type="text"
            required={isRequired}
            {...register(name)}
          />
        )}
        {!!errorMessage && (
          <S.ErrorMessageText>{errorMessage}</S.ErrorMessageText>
        )}
      </S.InputContainer>
    </SectionContainer>
  )
}
