import * as yup from 'yup'

import { FILE_TYPES } from '../../../../../../../../../../screens/Users/Modals/EventsManager/Tabs/components/Form/constants'
import { mimeType } from '../../../../../../../../../../utils/Validators'

import { FormInterface } from './types'

const getSchema = () => {
  return yup
    .object({
      activate: yup.boolean().required(),
      classification: yup
        .object({
          id: yup.number().required(),
          name: yup.string(),
          require_file: yup.boolean().required(),
        })
        .when('activate', {
          is: false,
          then: (schema) => schema.required(),
          otherwise: (schema) => schema.nullable(),
        }),

      file: yup.mixed().when('classification', {
        is: (classification: FormInterface['classification']) =>
          classification && classification.require_file,
        then: (schema) => schema.required(),
        otherwise: (schema) => schema.nullable(),
      }),
    })
    .test('fileType', 'Invalid File Type', (value) => {
      return (
        !(value.file instanceof File) ||
        mimeType(value.file.type, FILE_TYPES as unknown as string[])
      )
    })
}

export default getSchema
