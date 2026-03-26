import * as yup from 'yup'

import { IntlTelInputValidator } from '../../components/IntlTelInput'
import { isValidEmail } from '../../utils/Validators'

const dependencyNameValidator = (
  value: any,
  field: string,
  dependencies: string[],
): boolean => {
  if (value[field]) return true

  for (let i = 0; i < dependencies.length; i++) {
    if (value[dependencies[i]]) return false
  }

  return true
}

const dependencyValidator = (
  value: any,
  field: string,
  dependencies: string[],
): boolean => {
  if (value[field]) {
    for (let i = 0; i < dependencies.length; i++) {
      if (value[dependencies[i]]) return true
    }
    return false
  }

  return true
}

const getSchema = () => {
  return yup
    .object({
      // general contact
      phone1: IntlTelInputValidator(),
      phone2: IntlTelInputValidator(),
      email: yup
        .string()
        .notRequired()
        .test('email', (v) => !v || isValidEmail(v)),

      // financial contact
      client_contact_4_name: yup.string().notRequired(),
      client_contact_4_phone1: IntlTelInputValidator(),
      client_contact_4_phone2: IntlTelInputValidator(),
      client_contact_4_email: yup
        .string()
        .notRequired()
        .test('email', (v) => !v || isValidEmail(v)),

      // complement data - Sponsor
      client_contact_6_name: yup.string().notRequired(),
      client_contact_6_phone1: IntlTelInputValidator(),
      client_contact_6_phone2: IntlTelInputValidator(),
      client_contact_6_email: yup
        .string()
        .notRequired()
        .test('email', (v) => !v || isValidEmail(v)),

      // complement data - Ponto Focal
      client_contact_8_name: yup.string().notRequired(),
      client_contact_8_phone1: IntlTelInputValidator(),
      client_contact_8_phone2: IntlTelInputValidator(),
      client_contact_8_email: yup
        .string()
        .notRequired()
        .test('email', (v) => !v || isValidEmail(v)),

      // complement data - TI
      client_contact_10_name: yup.string().notRequired(),
      client_contact_10_phone1: IntlTelInputValidator(),
      client_contact_10_phone2: IntlTelInputValidator(),
      client_contact_10_email: yup
        .string()
        .notRequired()
        .test('email', (v) => !v || isValidEmail(v)),

      // complement data - Compras
      client_contact_12_name: yup.string().notRequired(),
      client_contact_12_phone1: IntlTelInputValidator(),
      client_contact_12_phone2: IntlTelInputValidator(),
      client_contact_12_email: yup
        .string()
        .notRequired()
        .test('email', (v) => !v || isValidEmail(v)),
    })

    .test('client_contact_4_name', 'Name is required', (value) => {
      return dependencyNameValidator(value, 'client_contact_4_name', [
        'client_contact_4_phone1',
        'client_contact_4_phone2',
        'client_contact_4_email',
      ])
    })
    .test(
      'client_contact_4_phone1',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_4_name', [
          'client_contact_4_phone1',
          'client_contact_4_phone2',
          'client_contact_4_email',
        ])
      },
    )
    .test(
      'client_contact_4_phone2',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_4_name', [
          'client_contact_4_phone1',
          'client_contact_4_phone2',
          'client_contact_4_email',
        ])
      },
    )
    .test(
      'client_contact_4_email',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_4_name', [
          'client_contact_4_phone1',
          'client_contact_4_phone2',
          'client_contact_4_email',
        ])
      },
    )

    .test('client_contact_6_name', 'Name is required', (value) => {
      return dependencyNameValidator(value, 'client_contact_6_name', [
        'client_contact_6_phone1',
        'client_contact_6_phone2',
        'client_contact_6_email',
      ])
    })
    .test(
      'client_contact_6_phone1',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_6_name', [
          'client_contact_6_phone1',
          'client_contact_6_phone2',
          'client_contact_6_email',
        ])
      },
    )
    .test(
      'client_contact_6_phone2',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_6_name', [
          'client_contact_6_phone1',
          'client_contact_6_phone2',
          'client_contact_6_email',
        ])
      },
    )
    .test(
      'client_contact_6_email',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_6_name', [
          'client_contact_6_phone1',
          'client_contact_6_phone2',
          'client_contact_6_email',
        ])
      },
    )

    .test('client_contact_8_name', 'Name is required', (value) => {
      return dependencyNameValidator(value, 'client_contact_8_name', [
        'client_contact_8_phone1',
        'client_contact_8_phone2',
        'client_contact_8_email',
      ])
    })
    .test(
      'client_contact_8_phone1',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_8_name', [
          'client_contact_8_phone1',
          'client_contact_8_phone2',
          'client_contact_8_email',
        ])
      },
    )
    .test(
      'client_contact_8_phone2',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_8_name', [
          'client_contact_8_phone1',
          'client_contact_8_phone2',
          'client_contact_8_email',
        ])
      },
    )
    .test(
      'client_contact_8_email',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_8_name', [
          'client_contact_8_phone1',
          'client_contact_8_phone2',
          'client_contact_8_email',
        ])
      },
    )

    .test('client_contact_10_name', 'Name is required', (value) => {
      return dependencyNameValidator(value, 'client_contact_10_name', [
        'client_contact_10_phone1',
        'client_contact_10_phone2',
        'client_contact_10_email',
      ])
    })
    .test(
      'client_contact_10_phone1',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_10_name', [
          'client_contact_10_phone1',
          'client_contact_10_phone2',
          'client_contact_10_email',
        ])
      },
    )
    .test(
      'client_contact_10_phone2',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_10_name', [
          'client_contact_10_phone1',
          'client_contact_10_phone2',
          'client_contact_10_email',
        ])
      },
    )
    .test(
      'client_contact_10_email',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_10_name', [
          'client_contact_10_phone1',
          'client_contact_10_phone2',
          'client_contact_10_email',
        ])
      },
    )

    .test('client_contact_12_name', 'Name is required', (value) => {
      return dependencyNameValidator(value, 'client_contact_12_name', [
        'client_contact_12_phone1',
        'client_contact_12_phone2',
        'client_contact_12_email',
      ])
    })
    .test(
      'client_contact_12_phone1',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_12_name', [
          'client_contact_12_phone1',
          'client_contact_12_phone2',
          'client_contact_12_email',
        ])
      },
    )
    .test(
      'client_contact_12_phone2',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_12_name', [
          'client_contact_12_phone1',
          'client_contact_12_phone2',
          'client_contact_12_email',
        ])
      },
    )
    .test(
      'client_contact_12_email',
      'At least one contact is required',
      (value) => {
        return dependencyValidator(value, 'client_contact_12_name', [
          'client_contact_12_phone1',
          'client_contact_12_phone2',
          'client_contact_12_email',
        ])
      },
    )
}

export default getSchema
