import { Address } from '../../../../../../../components/form/sections'
import useFormContext from '../../context'
import { CheckInRequired, Name, Type } from '../../inputs'
import type {
  StepComponent,
  StepComponentAttributes,
  StepComponentComponent,
  Value,
} from '../../types'

import * as S from './styles'

const AddressStep: StepComponent = Object.assign<
  StepComponentComponent,
  StepComponentAttributes
>(
  () => {
    const { form, useField } = useFormContext()
    const [value] = useField('check_in_required')
    return (
      <S.Container>
        <S.Section>
          <Name />

          <Type />

          <CheckInRequired />
        </S.Section>

        <S.Section style={{ padding: 0 }}>
          <Address.Provider
            value={{
              form: form,
              disabled: !value,
              showTitle: false,
              modalMode: true,
            }}
          >
            <Address
              textInformation='Avalie se o evento está devidamente geoposicionado.'
              withSection={false}
            />
          </Address.Provider>
        </S.Section>
      </S.Container>
    )
  },
  {
    title: 'Defina o nome e Local do Evento',
    validator: (value, errors) => {
      if (Object.keys(errors).length > 0) {
        return false
      }

      const required = ['name', 'type'] as const
      if (
        required.some((f) => {
          return value[f] === '' || value[f] === null
        })
      ) {
        return false
      }

      if (!value.check_in_required) return true

      const address_required: (keyof Value)[] = [
        'postal_code',
        'street_type',
        'street_address',
        'street_number',
        'sublocality',
        'city',
        'state',
        'lat',
        'lng',
        'radius',
      ]

      const requiredFields = address_required.some((f) => {
        return value[f] === '' || value[f] === null
      })

      return !requiredFields
    },
  },
)

export default AddressStep
