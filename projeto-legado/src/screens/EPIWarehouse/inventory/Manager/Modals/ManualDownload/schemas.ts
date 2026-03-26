import * as yup from 'yup'

export const add = yup.object({
  reason: yup.string().required('Motivo da baixa é obrigatório'),

  inventory_decrease: yup
    .number()
    .typeError('Quantidade deve ser um número')
    .positive('Quantidade deve ser maior que zero')
    .required('Quantidade é obrigatória'),

  epi_fiscal_note_id: yup.string().when('reason', {
    is: 'invoice_error',
    then: (schema) => schema.required('Selecione uma Nota Fiscal'),
    otherwise: (schema) => schema.notRequired(),
  }),

  obs: yup
    .string()
    .max(150, 'Máximo de 150 caracteres')
    .required('Observação é obrigatória'),
})
