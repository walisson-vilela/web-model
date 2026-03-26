import { useState } from 'react'

import Modal from '../../../../../../../../../../../components/MwModal'
import { RouteTabContextProps } from '../../../../../../../../../../../routes/types'
import { CheckAddress } from '../../../../../../../components'
import { addByDocument, addById } from '../../../../../../services'
import { ResponseBaseStore } from '../../../../../../services/checkDocument'
import { CheckAddressContainer } from '../styles'

const AssociateModal = (props: {
  response: ResponseBaseStore['data']
  onClose: () => void
  resetAll: () => void
  closeTab: RouteTabContextProps['close']
}) => {
  const { response, onClose, resetAll, closeTab } = props

  const [loading, setLoading] = useState(false)

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header children='Notificação' />

      <Modal.Body>
        <div>
          Identificamos um PDV com o CNPJ <b>{response.document}</b>.
        </div>

        <div>Deseja Associar ao seu Cadastro?</div>

        <CheckAddressContainer>
          <CheckAddress status={response.source_status} right>
            <b>{response.nickname}</b>
          </CheckAddress>
        </CheckAddressContainer>

        <div>{response.address}</div>
      </Modal.Body>

      <Modal.Footer
        buttonType='MwButton'
        actions={[
          {
            type: 'button',
            onClick: () => {
              resetAll()
              onClose()
            },
            children: 'Cancelar',
            appearance: 'borderless',
            ...(loading ? { disabled: true } : {}),
          },

          {
            type: 'button',
            onClick: async () => {
              setLoading(true)

              try {
                const id = await ('id' in response
                  ? addById(response.id)
                  : addByDocument(response.document))

                closeTab(`/main/stores/home/edit/${id}`)
              } catch (e) {
                console.error(e)
                setLoading(false)
              }
            },
            children: 'Associar e Salvar',
            ...(loading ? { loading: true, disabled: true } : {}),
          },
        ]}
      />
    </Modal.Modal>
  )
}

export default AssociateModal
