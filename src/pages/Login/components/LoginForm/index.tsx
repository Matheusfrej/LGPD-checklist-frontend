import { FormContainer } from '../../../../templates/FormContainer'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { InputComponent } from '../../../../components/InputComponent'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import { useAuth } from '../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import * as S from './styles'

const loginFormSchema = z.object({
  email: z
    .string({ required_error: 'O email é obrigatório' })
    .min(1, { message: 'O email é obrigatório' }),
  password: z
    .string({ required_error: 'A senha é obrigatória' })
    .min(1, { message: 'A senha é obrigatória' }),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  const handleLoginSubmit = async (data: LoginFormInputs) => {
    if (await signIn(data.email, data.password)) {
      navigate('/')
    }
  }

  return (
    <S.LoginFormContainer>
      <FormContainer
        title="Entrar na sua conta"
        onSubmit={handleSubmit(handleLoginSubmit)}
      >
        <InputComponent
          labelText="Email"
          name="email"
          register={register}
          isNormal
          isEmail
          errorMessage={errors.email?.message}
        />
        <InputComponent
          labelText="Senha"
          name="password"
          isNormal
          isPassword
          register={register}
          errorMessage={errors.password?.message}
        />
        <p>
          Não tem uma conta?{' '}
          <span onClick={() => navigate('/register')}>Cadastre-se</span>
        </p>
        <ButtonComponent type="submit" text="Entrar" />
      </FormContainer>
    </S.LoginFormContainer>
  )
}
