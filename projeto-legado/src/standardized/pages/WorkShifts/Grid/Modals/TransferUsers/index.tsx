import { useState } from 'react'

import toast from 'react-hot-toast'

import GridSelector from '../../../../../../components/GridSelector'
import Modal from '../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'

import useLeft from './components/Left'
import useRight from './components/Right'
import { Provider } from './context'
import * as Types from './interfaces'
import { saveSelected } from './service'
import * as S from './styled'

const TransferUsers = (props: Types.ITransferUsers) => {
  const { onClose, item: data, reload } = props

  const [left, setLeft] = useState<Types.User[]>([])
  const [right, setRight] = useState<Types.WorkShift | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <Provider
      value={{
        left: [left, setLeft],
        right: [right, setRight],
        data,
        reload,
        loading: [loading, setLoading],
      }}
    >
      <Modal.Modal
        open
        style={{
          width: '1095px',

          maxWidth: '90vw',
          maxHeight: '90vh',
        }}
      >
        <Modal.Header color='blue'>Transferir Usuário</Modal.Header>
        <Modal.Body
          style={{ justifyContent: 'normal' }}
          $paddingLeft='0'
          $paddingRight='0'
        >
          <S.Subtitle>
            ID: <b children={data.id} /> | Tipo:{' '}
            <b children={data.electronic_point_label} /> | Carga Horária:{' '}
            <b children={data.workload_label} /> | Intervalo:{' '}
            <b children={data.average_interval_label} />
          </S.Subtitle>
          <GridSelector.Container left={useLeft} right={useRight} />
        </Modal.Body>

        <Modal.Footer
          actions={[
            {
              content: 'Cancelar',
              appearance: 'borderless',
              onClick: onClose,
            },
            {
              content: 'Transferir',
              loading,
              onClick: async () => {
                setLoading(true)
                try {
                  if (right && left.length > 0) {
                    await saveSelected(
                      left.map((user) => user.id),
                      right.id,
                    )
                    reload()
                    onClose()
                    toast(<ToasterContent color='normal' />, SuccessStyle)
                  }
                } catch (error) {
                  console.error(error)
                  toast(<ToasterContent color='error' />, ErrorStyle)
                  setLoading(false)
                }
              },
            },
          ]}
          buttonType='MwButton'
        />
      </Modal.Modal>
    </Provider>
  )
}

export default TransferUsers
