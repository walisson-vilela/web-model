import React, { useCallback } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import { Bound } from '../../../../../../../../../components/GoogleMap/interfaces'
import {
  keys,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../../utils/validators'
import LocationModal from '../../../../../LocationModal'
import useAddessContext from '../../../../context'
import { requestParserWithOutCoordinates } from '../../../../parser'
import { getAddressByPostalCode } from '../../services'

const CheckPostalCode = () => {
  const {
    form,
    loading: [loading, setLoading],

    setValueOptions,
    modal: [, setModal],
    invalidCheck,
    cepIsDirty: [cepIsDirty],
    fillGeolocationStatus,
    disabled,
  } = useAddessContext()

  const { watch, setValue, getValues } = form

  const clearGeolocationStatus = () => {
    setValue('geolocation_at', '')
    setValue('geolocation_by_id', '')
    setValue('geolocation_by_name', '')
    setValue('geolocation_status', null)
  }

  const createInvalidCepModal = (
    values?: any,
    polygon?: Omit<Bound, 'radius'>[],
  ) => {
    setModal({
      title: 'CEP Inválido',
      titleColor: 'white',
      content: (
        <React.Fragment>
          <p style={{ margin: 0 }}>
            Não identificamos o endereço através do CEP informado.
          </p>
          <p style={{ margin: 0 }}>
            Se desejar, utilize o recurso de mapa abaixo.
          </p>
        </React.Fragment>
      ),
      actions: [
        {
          content: 'Cancelar',
          secondary: true,
          onClick: () => {
            clearGeolocationStatus()
            setModal(null)
          },
        },
        {
          content: 'Ir para o mapa',
          color: 'blue',
          onClick: () =>
            setModal(
              <LocationModal
                mode='with_form'
                close={() => setModal(null)}
                save={(values) => {
                  const v = {
                    ...values,
                    ...(values.lat && values.lng
                      ? {
                          address_lat: values.lat,
                          address_lng: values.lng,
                        }
                      : {}),
                  }

                  keys(v).forEach((key) => {
                    setValue(key, v[key], setValueOptions)
                  })

                  fillGeolocationStatus()
                }}
                value={{ ...getValues(), ...(values || {}) }}
                polygon={polygon}
              />,
            ),
        },
      ],
    })
  }

  const postalCodeCheck = useCallback(async () => {
    setLoading((prev) => ({ ...prev, postalCode: true }))

    try {
      const postalCode = getValues('postal_code')

      const data = await getAddressByPostalCode(postalCode)
      const parsed = requestParserWithOutCoordinates(data)

      if (!parsed.state || !parsed.city) {
        throw new Error('Missing city or state')
      }

      if (parsed.street_address && parsed.sublocality) {
        keys(parsed).forEach((key) => {
          setValue(key, parsed[key], setValueOptions)
        })
      } else {
        const polygon = (
          Array.isArray(data.boundaries) ? data.boundaries : []
        ).reduce<Omit<Bound, 'radius'>[]>((polygon, e) => {
          if (!isObject(e)) return polygon

          const lat = numberOrDefault(e.lat)
          const lng = numberOrDefault(e.lng)

          if (!lat || !lng) return polygon

          return [...polygon, { lat, lng }]
        }, [])

        if (polygon.length < 1) {
          throw new Error('Missing polygon')
        }

        createInvalidCepModal(parsed, polygon)
      }
    } catch (error) {
      console.error(error)
      createInvalidCepModal()
    }

    setLoading((prev) => ({ ...prev, postalCode: false }))
  }, [watch('postal_code')])

  return (
    <MwButton
      appearance='bordered'
      content='Verificar CEP'
      onClick={postalCodeCheck}
      loading={loading.postalCode}
      disabled={
        invalidCheck('postal_code') ||
        !cepIsDirty ||
        loading.postalCode ||
        disabled
      }
    />
  )
}
export default CheckPostalCode
