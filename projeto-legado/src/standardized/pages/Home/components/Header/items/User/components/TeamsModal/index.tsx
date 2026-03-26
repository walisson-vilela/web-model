import { MwButton, MwLoader } from '@mw-kit/mw-ui'

import Modal from '../../../../../../../../../components/MwModal'
import { TreeCardsOrEmpty } from '../../../../../../../Teams'
import { HierarchiesSelectMenu } from '../../../../../../../Teams/components/Hierarchies/components/HierarchiesSelectMenu'
import useTeamsContext, {
  DefaultTeamsProvider,
} from '../../../../../../../Teams/context'

type TeamsModalType = {
  close: () => void
}

const TeamsModalContent: React.FC<TeamsModalType> = ({ close }) => {
  const {
    loading: [loading],
    nodes: [nodes],
  } = useTeamsContext()

  return (
    <Modal.Modal
      style={{ maxHeight: '90vh', height: '100%' }}
      size='fullscreen'
      open={true}
    >
      <Modal.Header color='blue' children='Organograma' />

      <Modal.Body style={{ position: 'relative' }}>
        {loading && <MwLoader filled={true} zIndex={10} />}
        <TreeCardsOrEmpty nodes={nodes} />
      </Modal.Body>

      <Modal.Footer
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <HierarchiesSelectMenu borderless={true} paddingless={true} />

        <MwButton content='OK' size='small' onClick={close} />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export const TeamsModal: React.FC<TeamsModalType> = ({ close }) => {
  return (
    <DefaultTeamsProvider byUser>
      <TeamsModalContent close={close} />
    </DefaultTeamsProvider>
  )
}
