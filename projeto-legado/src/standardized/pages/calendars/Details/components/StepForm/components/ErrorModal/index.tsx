import type { GenericObject } from '@mw-kit/mw-ui/types'
import { cloneDeep } from 'lodash'

import { ValidationError } from '../../../../../../../components/form/modals'
import useFormContext from '../../context'

export const ErrorModal = ({
  validationErrors: [validationErrors, setValidationErrors],
}: {
  validationErrors: [
    GenericObject | null,
    React.Dispatch<React.SetStateAction<GenericObject | null>>,
  ]
}) => {
  const {
    value: [, setValue],
    originals,
  } = useFormContext()

  if (!validationErrors) return null

  return (
    <ValidationError
      errors={validationErrors}
      onClose={() => setValidationErrors(null)}
      fields={{
        name: {
          label: 'Nome',
          handler: () => {
            setValue((prev) => ({ ...prev, name: originals.name }))
          },
        },
        address: {
          label: 'Endereço',
          handler: () => {
            setValue((prev) => ({
              ...prev,

              postal_code: originals.postal_code,
              street_type: originals.street_type,
              street_address: originals.street_address,
              street_number: originals.street_number,
              complement: originals.complement,
              sublocality: originals.sublocality,
              city: originals.city,
              state: originals.state,
            }))
          },
        },
        coordinate: {
          label: 'Geolocalização',
          handler: () => {
            setValue((prev) => ({
              ...prev,

              lat: originals.lat,
              lng: originals.lng,
              radius: originals.radius,
              geolocation_at: originals.geolocation_at,
              geolocation_by_id: originals.geolocation_by_id,
              geolocation_by_name: originals.geolocation_by_name,
            }))
          },
        },
        starts_at: {
          label: 'Data Inicio',
          handler: () => {
            setValue((prev) => ({
              ...prev,
              events: cloneDeep(originals.events),
            }))
          },
        },
        ends_at: {
          label: 'Data Término',
          handler: () => {
            setValue((prev) => ({
              ...prev,
              events: cloneDeep(originals.events),
            }))
          },
        },
        children: {
          label: 'Período e Datas',
          handler: () => {
            setValue((prev) => ({
              ...prev,
              events: cloneDeep(originals.events),
            }))
          },
        },
        links_in: {
          label: 'Passo 3',
          handler: () => {
            setValue((prev) => ({
              ...prev,
              states: cloneDeep(originals.states),
              cities: cloneDeep(originals.cities),
              teams: cloneDeep(originals.teams),
              users: cloneDeep(originals.users),
            }))
          },
        },
      }}
    />
  )
}
