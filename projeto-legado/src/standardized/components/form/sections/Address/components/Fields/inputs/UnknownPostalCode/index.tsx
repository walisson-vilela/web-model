import { MwButton } from '@mw-kit/mw-ui'

import { keys } from '../../../../../../../../../utils/Formatters'
import LocationModal from '../../../../../LocationModal'
import useAddessContext from '../../../../context'

const UnknownPostalCode = () => {
  const {
    form,

    modal: [, setModal],
    setValueOptions,
    fillGeolocationStatus,
    disabled,
  } = useAddessContext()

  const { setValue, getValues } = form

  return (
    <MwButton
      appearance='link'
      color='greyishBlue'
      content='Buscar pelo mapa'
      disabled={disabled}
      onClick={() =>
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
            value={getValues()}
          />,
        )
      }
    />
  )
}

export default UnknownPostalCode
