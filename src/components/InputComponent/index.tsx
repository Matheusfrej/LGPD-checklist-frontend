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
import { SectionContainer } from '../../templates/SectionContainer'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { Eye, EyeSlash } from 'phosphor-react'

interface InputComponentProps<T extends FieldValues> {
  name: Path<T>
  labelText?: string
  isRequired?: boolean
  isTextArea?: boolean
  isReadOnly?: boolean
  hasHeader?: boolean
  style?: CSSProperties
  isNormal?: boolean
  isEmail?: boolean
  isPassword?: boolean
  register: UseFormRegister<T>
  errorMessage?: string
}

export const InputComponent = <T extends FieldValues>({
  name,
  labelText,
  isRequired,
  isReadOnly,
  isTextArea,
  hasHeader = false,
  isNormal = false,
  isEmail = false,
  isPassword = false,
  style,
  register,
  errorMessage,
}: InputComponentProps<T>) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [currVal, setCurrVal] = useState('')
  const [showPassword, setShowPassword] = useState(false)

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
    <SectionContainer style={style} hasHeader={hasHeader} hasBorder={!isNormal}>
      {labelText && <LabelComponent text={labelText} isRequired={isRequired} />}

      <S.InputContainer>
        {isTextArea ? (
          <S.TextArea
            $error={errorMessage}
            required={isRequired}
            $isNormal={isNormal}
            {...rest}
            ref={textareaRef}
          />
        ) : isPassword ? (
          <S.InputWithEye>
            <S.Input
              $error={errorMessage}
              $isNormal={isNormal}
              readOnly={isReadOnly}
              type={!showPassword ? 'password' : 'text'}
              required={isRequired}
              {...register(name)}
            />
            {showPassword ? (
              <Eye
                size={20}
                onClick={() => setShowPassword((state) => !state)}
              />
            ) : (
              <EyeSlash
                size={20}
                onClick={() => setShowPassword((state) => !state)}
              />
            )}
          </S.InputWithEye>
        ) : (
          <S.Input
            $error={errorMessage}
            $isNormal={isNormal}
            readOnly={isReadOnly}
            type={isEmail ? 'email' : 'text'}
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
