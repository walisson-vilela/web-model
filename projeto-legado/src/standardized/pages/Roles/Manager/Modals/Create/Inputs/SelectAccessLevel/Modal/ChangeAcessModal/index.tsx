import { AccessLevels, access_levels } from '../..'
import Modal from '../../../../../../../../../../components/MwModal'

interface ICHangeAcessModal {
  onClose: () => void
  onConfirm: () => void
  from: keyof AccessLevels
  to: keyof AccessLevels
}

const ChangeAcessModal = (props: ICHangeAcessModal) => {
  const { onClose, onConfirm } = props
  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header color='white'>Troca de Nível de Acesso</Modal.Header>
      <Modal.Body>
        <div>
          Atenção, baixar o nível de acesso da função poderá destruir os
          roteiros e tarefas.
        </div>
        <div>
          Deseja realmente trocar o nível de acesso de{' '}
          <b>{access_levels[props?.from]?.label || '-'}</b> para{' '}
          <b>{access_levels[props.to]?.label || '-'}</b>?
        </div>
      </Modal.Body>
      <Modal.Footer
        actions={[
          {
            type: 'button',
            children: 'Cancelar',
            appearance: 'borderless',
            onClick: onClose,
          },
          { type: 'button', children: 'Sim', color: 'red', onClick: onConfirm },
        ]}
        buttonType='MwButton'
      />
    </Modal.Modal>
  )
}

export default ChangeAcessModal
