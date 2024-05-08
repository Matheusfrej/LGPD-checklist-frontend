import * as z from 'zod'

export const userFormSchema = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(1, { message: 'O nome é obrigatório' }),
    office: z
      .string({ required_error: 'O cargo/função é obrigatório' })
      .min(1, { message: 'O cargo/função é obrigatório' }),
    systemName: z
      .string({ required_error: 'O nome do sistema é obrigatório' })
      .optional(),
    systemDesc: z
      .string({
        required_error: 'A descrição do sistema é obrigatória',
      })
      .optional(),
    system: z.coerce
      .number({
        required_error: 'Informe um sistema para avaliar',
      })
      .optional(),
  })
  .superRefine((values, ctx) => {
    if (!values.system && !values.systemDesc && !values.systemName) {
      if (!values.systemDesc) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'A descrição do sistema é obrigatória',
          path: ['systemDesc'],
        })
      }
      if (!values.systemName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'O nome do sistema é obrigatório',
          path: ['systemName'],
        })
      }
      if (!values.system) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Informe um sistema para avaliar',
          path: ['system'],
        })
      }
      return false
    }
    return true
  })

export type UserFormInputs = z.infer<typeof userFormSchema>
