import * as yup from 'yup'
import {BodyInterface} from '../../../interfaces'
import {FormSubmit} from './interfaces'

// 🔹 Schema de validação
export const create = yup.object({
  epi_type_id: yup.number().required('O tipo de EPI é obrigatório!'),
  number: yup.string().required('O número é obrigatório!'),
  date: yup.string().required('A data é obrigatória!'),
  supplier: yup.string().required('O fornecedor é obrigatório!'),
  ca_code: yup.string().required('O código CA é obrigatório!'),
  ca_code_expiration: yup.string().required('A validade do CA é obrigatória!'),
  obs: yup.string().nullable(),
  epis_invetory_add: yup
    .array()
    .of(
      yup.object({
        epi_id: yup
          .number()
          .typeError('ID do EPI deve ser um número')
          .required('Informe o EPI'),
        qtd: yup
          .number()
          .typeError('Quantidade deve ser um número')
          .nullable()
          .transform((value, originalValue) => (originalValue === '' ? null : value))
          .min(0, 'Quantidade mínima é 1')
          .notRequired(),
      })
    )
    .min(0, 'Informe pelo menos um EPI na lista')
    .test(
      'at-least-one-qtd',
      'Informe a quantidade em pelo menos um item',
      items =>
        Array.isArray(items) &&
        items.some(item => item && item.qtd != null && Number(item.qtd) >= 0)
    ),
})


// 🔹 Valores padrão do formulário
export const getDefaultData = (data?: BodyInterface): FormSubmit => ({
  epi_type_id: data?.epi_type_id ?? 0,
  number: data?.number ?? '',
  date: data?.date ? String(data.date) : '',
  supplier: data?.supplier ?? '',
  ca_code: data?.ca_code ? String(data.ca_code) : '',
  ca_code_expiration: data?.ca_code_expiration ?? '',
  obs: data?.obs ?? '',
  id: data?.id ?? 0,
  epis_invetory_add: data?.epis_invetory_add ?? [],
})

// 🔹 Montagem do payload final
export const buildPayload = (formData: FormSubmit) => ({
  epi_type_id: formData.epi_type_id,
  number: formData.number,
  date: formData.date,
  supplier: formData.supplier,
  ca_code: formData.ca_code,
  ca_code_expiration: formData.ca_code_expiration,
  obs: formData.obs,
  epis_invetory_add: formData.epis_invetory_add.map(item => ({
    epi_id: Number(item.epi_id),
    qtd: Number(item.qtd),
  })),
})
