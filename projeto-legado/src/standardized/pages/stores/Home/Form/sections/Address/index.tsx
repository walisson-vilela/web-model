import COLORS from '../../../../../../../components/GoogleMap/Marker/colors'
import { Address as BaseAddress } from '../../../../../../components/form/sections'
import { AddressUpdateModal } from '../../Modals'
import useFormContext from '../../context'

import * as Alerts from './alerts'

const Address = () => {
  const {
    form,
    data,
    mode,
    modal: [, setModal],
    id,
  } = useFormContext()

  const source_status = form.watch('source_status')

  const source_address = form.watch('source_address')
  const geolocation_tolerance = form.watch('geolocation_tolerance')

  // enables only on creations with source_status UNKNOWN or NULL
  const disabled =
    id !== null || (source_status !== null && source_status !== 'UNKNOWN')

  const disabledMap = ['INVALID', 'UPDATED'].includes(source_status ?? '')

  return (
    <BaseAddress.Provider
      value={{
        form,
        withAddressCoordinate: true,
        withGeolocationStatus: true,
        disabled,

        ...(source_address &&
        (source_status === 'INVALID' || source_status === 'UPDATED')
          ? {
              markers: [
                {
                  lat: source_address.lat,
                  lng: source_address.lng,

                  circle: {
                    radius: geolocation_tolerance,
                    options: {
                      fillColor: COLORS.YELLOW,
                      strokeColor: COLORS.YELLOW,
                    },
                  },

                  icon: 'yellow',

                  draggable: false,
                  clickable: false,
                },
              ],
            }
          : {}),

        ...(data ? { audits: data.audits } : {}),
      }}
    >
      <BaseAddress
        textInformation='Avalie se o PDV está devidamente geoposicionado.'
        disabled={disabledMap}
        resendToAudit={(() => {
          if (mode === 'base-stores') return 'none'
          return source_status === 'INVALID' || source_status === 'UPDATED'
            ? 'disabled'
            : undefined
        })()}
        {...(() => {
          if (source_status === 'UPDATED') {
            return {
              children: (
                <Alerts.AddressUpdate
                  mode={mode}
                  setModal={() => {
                    setModal(
                      <AddressUpdateModal onClose={() => setModal(null)} />,
                    )
                  }}
                />
              ),
            }
          } else if (source_status === 'INVALID') {
            return { children: <Alerts.Invalid /> }
          }

          return {}
        })()}
      />
    </BaseAddress.Provider>
  )
}

export default Address
