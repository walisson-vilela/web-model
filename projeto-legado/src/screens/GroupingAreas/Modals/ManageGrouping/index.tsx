import { useCallback, useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import GridSelector from '../../../../components/GridSelector'
import Modal from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { BodyInterface } from '../../tabs/interfaces'

import { useLeft, useRight } from './components'
import { ManageGroupingProvider } from './context'
import { Selected } from './interface'
import * as Services from './services'
import * as S from './styles'

interface IManageGrouping {
  close: () => void
  data: BodyInterface
  reload: () => void
}

// TODO: IMPLEMENT useDirty to disable submit button

const ManageGrouping = ({ close, data, reload }: IManageGrouping) => {
  const [selected, setSelected] = useState<Selected>([])
  const [loading, setLoading] = useState<boolean>(true)

  const onSubmit = useCallback(async () => {
    setLoading(true)

    try {
      await Services.saveAreas(selected, data.id)

      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      close()
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [data.id, selected])

  const onloadSelected = useCallback(async () => {
    setLoading(true)
    try {
      const response = await Services.getAreas(data.id)
      setSelected(response)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
    setLoading(false)
  }, [data.id])

  useEffect(() => {
    onloadSelected()
  }, [])

  return (
    <Modal.Modal
      open
      size='tiny'
      style={{
        width: '1095px',
        //height: '603px',
        maxWidth: '90vw',
        maxHeight: '90vh',
      }}
    >
      <Modal.Header color='blue'>Gerenciar Agrupamento</Modal.Header>

      <Modal.Body
        $paddingTop='s4'
        $paddingBottom='0'
        $paddingLeft='0'
        $paddingRight='0'
      >
        <S.TitleContainer>
          <Modal.Subtitle>
            Agrupamento: <b>{data.name || '-'}</b> - País:{' '}
            <b>{data.country || '-'}</b>
          </Modal.Subtitle>
        </S.TitleContainer>

        <ManageGroupingProvider value={{ loading, data }}>
          <GridSelector.Container
            selected={[selected, setSelected]}
            left={useLeft}
            right={useRight}
          />
        </ManageGroupingProvider>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          appearance='link'
          content='Cancelar'
          onClick={close}
          size='large'
        />

        <MwButton
          type='button'
          content='Confirmar'
          onClick={onSubmit}
          disabled={loading}
          loading={loading}
          size='large'
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ManageGrouping
