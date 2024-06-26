import { FormContainer } from '../../../../templates/FormContainer'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { InputComponent } from '../../../../components/InputComponent'
import { ButtonComponent } from '../../../../components/ButtonComponent'
import { useAuth } from '../../../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import * as S from './styles'

const passwordValidation =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/

const registerFormSchema = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(1, { message: 'O nome é obrigatório' }),
    office: z
      .string({ required_error: 'O cargo/função é obrigatório' })
      .min(1, { message: 'O cargo/função é obrigatório' }),
    email: z
      .string({ required_error: 'O email é obrigatório' })
      .min(1, { message: 'O email é obrigatório' })
      .email('Insira um email válido'),
    password: z
      .string({ required_error: 'A senha é obrigatória' })
      .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
      .regex(passwordValidation, {
        message:
          'A senha deve ter pelo menos um caractere maiúsculo, um minúsculo, um número e um caractere especial (#?!@$%^&*-)',
      }),
    confirmPassword: z
      .string({
        required_error: 'Confirmar a senha é obrigatório',
      })
      .min(1, { message: 'Confirmar a senha é obrigatório' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não são iguais',
    path: ['confirmPassword'],
  })

type RegisterFormInputs = z.infer<typeof registerFormSchema>

export function RegisterForm() {
  const { register: authRegister } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerFormSchema),
  })

  const handleRegisterSubmit = async (data: RegisterFormInputs) => {
    if (await authRegister(data)) {
      navigate('/login')
    }
  }

  return (
    <S.RegisterFormContainer>
      <FormContainer
        title="Criar uma nova conta"
        onSubmit={handleSubmit(handleRegisterSubmit)}
      >
        <InputComponent
          labelText="Nome Completo"
          name="name"
          register={register}
          isNormal
          isRequired
          errorMessage={errors.name?.message}
        />
        <InputComponent
          labelText="Cargo ou função"
          name="office"
          register={register}
          isNormal
          isRequired
          errorMessage={errors.office?.message}
        />
        <InputComponent
          labelText="Email"
          name="email"
          register={register}
          isNormal
          isEmail
          isRequired
          errorMessage={errors.email?.message}
        />
        <InputComponent
          labelText="Senha"
          name="password"
          isNormal
          isPassword
          register={register}
          isRequired
          errorMessage={errors.password?.message}
        />
        <InputComponent
          labelText="Confirmar senha"
          name="confirmPassword"
          isNormal
          isPassword
          register={register}
          isRequired
          errorMessage={errors.confirmPassword?.message}
        />
        <p>
          Já tem uma conta?{' '}
          <span onClick={() => navigate('/login')}>Faça login</span>
        </p>
        <ButtonComponent type="submit" text="Cadastrar" />
      </FormContainer>
    </S.RegisterFormContainer>
  )
}
