import {
  CSSProperties,
  SetStateAction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styled from 'styled-components'
import { LabelComponent } from './LabelComponent'
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

  const inputId = `input-${name}`

  return (
    <SectionContainer style={style} hasHeader={hasHeader} hasBorder={!isNormal}>
      {labelText && (
        <LabelComponent
          text={labelText}
          isRequired={isRequired}
          htmlFor={inputId}
        />
      )}
      <InputContainer>
        {isTextArea ? (
          <TextArea
            id={inputId}
            $error={errorMessage}
            required={isRequired}
            $isNormal={isNormal}
            {...rest}
            ref={textareaRef}
          />
        ) : isPassword ? (
          <InputWithEye>
            <Input
              id={inputId}
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
                alt="Esconder senha"
              />
            ) : (
              <EyeSlash
                size={20}
                onClick={() => setShowPassword((state) => !state)}
                alt="Mostrar senha"
              />
            )}
          </InputWithEye>
        ) : (
          <Input
            id={inputId}
            $error={errorMessage}
            $isNormal={isNormal}
            readOnly={isReadOnly}
            type={isEmail ? 'email' : 'text'}
            required={isRequired}
            {...register(name)}
          />
        )}
        {!!errorMessage && <ErrorMessageText>{errorMessage}</ErrorMessageText>}
      </InputContainer>
    </SectionContainer>
  )
}

interface InputProps {
  $error?: string
  $isNormal: boolean
}

const TextArea = styled.textarea<InputProps>`
  background: ${({ theme }) => theme.colors['header-background']};
  border-width: 0;
  border-bottom-width: 1px;
  width: ${({ $isNormal }) => ($isNormal ? '100%' : '60%')};

  @media (max-width: 1000px) {
    width: 100%;
  }
  padding: 0.1rem;
  resize: none;
  overflow: hidden;

  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.span};

  &:focus {
    border: none;
  }
`

const Input = styled.input<InputProps>`
  background: ${({ theme }) => theme.colors['header-background']};
  border-width: 0;
  border-bottom-width: 1px;
  width: ${({ $isNormal }) => ($isNormal ? '100%' : '60%')};
  padding: 0.5rem;
  @media (max-width: 1000px) {
    width: 100%;
  }

  border-color: ${({ theme, $error }) =>
    $error ? theme.colors.red : theme.colors.black};

  &:focus {
    border: none;
  }
`

const ErrorMessageText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 4px;
  font-weight: bold;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const InputWithEye = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: -1.5rem;
    cursor: pointer;
  }
`
