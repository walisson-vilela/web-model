import * as yup from 'yup'

import { IFormType } from './interfaces'

export const formSchema = yup.object({
  name: yup
    .string()
    .required('Para prosseguir é necessário informar o nome para tipologia.'),
})

export const getDefaultData = (data: IFormType | undefined): IFormType => {
  return data
    ? {
        name: data.name || '',
      }
    : {
        name: '',
      }
}
