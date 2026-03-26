import { useState } from 'react'

import { MwButton, MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import Modal from '../../../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import { numberOrDefault } from '../../../../../../../../../utils/Formatters'
import { BodyInterface } from '../../../../interfaces'
import { unifiedStores } from '../../service'

import * as S from './styled'

interface IConfirmationModal {
  checkeds: BodyInterface[]
  onClose: () => void
  close: () => void
  reloadManager: () => void
  item: BodyInterface
}

const ConfirmationModal = (props: IConfirmationModal) => {
  const { checkeds, onClose, item, reloadManager, close } = props
  const [loading, setLoading] = useState<boolean>(false)

  const [checked, setChecked] = useState<boolean>(false)

  const onSubmit = async () => {
    setLoading(true)

    try {
      await unifiedStores(
        item.id,
        checkeds.map((e) => numberOrDefault(e.id)),
      )

      close()
      onClose()
      reloadManager()
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (error) {
      console.error(error)
      setLoading(false)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  return (
    <Modal.Modal open size='tiny'>
      <Modal.Header>Unir PDVs</Modal.Header>
      <Modal.Body>
        <div>
          Ao unir, todas as informações referentes aos PDVs selecionados serão
          levadas para o PDV Base e os mesmos serão deletados.
        </div>
        <div>
          Deseja unir
          {checkeds.length > 1
            ? ` ${checkeds.length} PDVs selecionados `
            : ` ${checkeds.length} PDV selecionado `}
          ao PDV Base?
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: '1',
          }}
        >
          <MwInput
            type='checkbox'
            onChange={(e) => setChecked(e.currentTarget.checked)}
            label={<S.Label>Sim, eu estou ciente disto</S.Label>}
          />
          <div>
            <MwButton
              content='Cancelar'
              appearance='borderless'
              onClick={onClose}
            />
            <MwButton
              content='Unir PDVs'
              disabled={!checked}
              loading={loading}
              onClick={onSubmit}
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ConfirmationModal
