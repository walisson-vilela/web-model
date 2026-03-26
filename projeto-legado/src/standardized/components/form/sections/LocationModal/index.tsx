import Modal from '../../../../../components/MwModal'

import * as Components from './components'
import { WithFormProvider } from './components/WithForm/context'
import { Props } from './interface'

const LocationModal = (props: Props) => {
  return (
    <Modal.Modal
      open
      size='large'
      style={{
        width: '1095px',
        height: '607px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Geolocalização</Modal.Header>

      {props.mode === 'only_map' ? (
        <Components.OnlyMap {...props} />
      ) : (
        <WithFormProvider props={props}>
          <Components.WithForm />
        </WithFormProvider>
      )}
    </Modal.Modal>
  )
}

export default LocationModal
