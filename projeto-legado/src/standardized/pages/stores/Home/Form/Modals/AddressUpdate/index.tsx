import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import GoogleMap from '../../../../../../../components/GoogleMap'
import COLORS from '../../../../../../../components/GoogleMap/Marker/colors'
import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import useFormContext from '../../context'
import { Form } from '../../interfaces'

import { AddressInfo } from './components'
import * as S from './styled'

interface IAddressUpdateModal {
  onClose: () => void
  originals?: Form
}

const AddressUpdateModal = (props: IAddressUpdateModal) => {
  const { onClose } = props

  const context = useFormContext()
  const {
    form: { setValue },
    setValueOptions,
  } = context

  const originals = props.originals || context.originals

  const sourceAddress = originals.source_address

  if (!sourceAddress || !originals.address_lat || !originals.address_lng) {
    console.error('AddressUpdateModal: source_address not found')
    toast(<ToasterContent color='error' />, ErrorStyle)
    onClose()
    return null
  }

  const formatted = [
    originals.street_address,
    originals.street_number,
    originals.sublocality,
    originals.city,
    originals.state,
    originals.postal_code,
  ].join(' - ')

  const onSubmit = () => {
    setValue('source_status', 'VALID', setValueOptions)
    setValue('postal_code', sourceAddress.postal_code, setValueOptions)
    setValue('street_address', sourceAddress.street_address, setValueOptions)
    setValue('street_number', sourceAddress.street_number, setValueOptions)
    setValue('street_type', sourceAddress.street_type, setValueOptions)
    setValue('complement', sourceAddress.complement, setValueOptions)
    setValue('sublocality', sourceAddress.sublocality, setValueOptions)
    setValue('city', sourceAddress.city, setValueOptions)
    setValue('state', sourceAddress.state, setValueOptions)
    setValue('address_lat', sourceAddress.lat, setValueOptions)
    setValue('address_lng', sourceAddress.lng, setValueOptions)

    if (sourceAddress.valid_geolocation !== true) {
      setValue('lat', sourceAddress.lat, setValueOptions)
      setValue('lng', sourceAddress.lng, setValueOptions)
      setValue('geolocation_status', null, setValueOptions)
      setValue('geolocation_at', null, setValueOptions)
      setValue('geolocation_by_id', null, setValueOptions)
      setValue('geolocation_by_name', null, setValueOptions)
    }

    onClose()
  }

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>Atualização de Endereço</Modal.Header>

      <Modal.Body>
        <S.Subtitle>
          O endereço do PDV foi alterado na Receita Federal.
        </S.Subtitle>
        <AddressInfo type='Cadastro' address={formatted} />
        <AddressInfo
          type='Receita Federal'
          address={[sourceAddress.formatted, sourceAddress.postal_code].join(
            ' - ',
          )}
        />
        <S.Line />

        <GoogleMap
          zoom={15}
          containerStyles={{
            width: '100%',
            height: '280px',
          }}
          markers={[
            {
              lat: originals.address_lat,
              lng: originals.address_lng,
              icon: 'blue',
              circle: {
                radius: originals.geolocation_tolerance,
                options: { fillColor: COLORS.BLUE, strokeColor: COLORS.BLUE },
              },
              draggable: false,
              clickable: false,
            },
            {
              lat: sourceAddress.lat,
              lng: sourceAddress.lng,
              icon: 'yellow',
              circle: {
                radius: originals.geolocation_tolerance,
                options: {
                  fillColor: COLORS.YELLOW,
                  strokeColor: COLORS.YELLOW,
                },
              },
              draggable: false,
              clickable: false,
            },
          ]}
          mode='roadmap'
        />
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='borderless'
          onClick={() => onClose()}
        >
          Cancelar
        </MwButton>
        <MwButton type='button' color='blue' onClick={() => onSubmit()}>
          Alterar
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AddressUpdateModal
