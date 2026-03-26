import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../components/MwModal'

import * as S from './styled'

interface ILocationModalFooter {
  close: () => void
  onSubmit: () => void
  loading: boolean
}

const LocationModalFooter = (props: ILocationModalFooter) => {
  const { close, onSubmit, loading } = props

  return (
    <Modal.Footer>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <S.Tip>
          <b>Dica:</b> Para melhor georreferenciar, movimente o cursor.
        </S.Tip>
        <div>
          <MwButton
            type='button'
            appearance='borderless'
            size='large'
            content='Cancelar'
            onClick={close}
          />

          <MwButton
            type='button'
            content='Confirmar'
            size='large'
            onClick={onSubmit}
            loading={loading}
          />
        </div>
      </div>
    </Modal.Footer>
  )
}
export default LocationModalFooter
