import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwScrollContainer } from '@mw-kit/mw-ui'

import Modal from '../../../../../../components/MwModal'
import { getWorkShifts } from '../../../../WorkShifts/services/list'
import { WorkShift } from '../../../../WorkShifts/types'

import { Row } from './components/Row'
import { TitleWrapper } from './styled'

type WorkShiftModalProps = {
  electronicPoint: boolean
  checked: WorkShift | null
  onClose: () => void
  onSubmit: (checked: WorkShift) => void
}

export const WorkshiftModal = (props: WorkShiftModalProps) => {
  const { electronicPoint, onClose, onSubmit } = props

  const [checked, setChecked] = useState<WorkShift | null>(props.checked)
  const [list, setList] = useState<WorkShift[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [pagination, setPagination] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })

  const paginator = () => {
    setPagination((prev) => {
      return prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev
    })
  }

  const onLoadRows = useCallback(async () => {
    setLoading(true)

    try {
      const {
        data: results,
        pagination: { has_next_page, count, page: currentPage },
      } = await getWorkShifts({
        page: pagination.page,
        active: true,
        electronic_point: electronicPoint,
      })

      setList((prev) =>
        pagination.page === 1 ? results : [...prev, ...results],
      )
      setPagination({
        has_next_page,
        page: currentPage,
        count,
      })
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [pagination.page, electronicPoint])

  const setWorkshift = () => {
    if (!checked) return
    onSubmit(checked)
    onClose()
  }

  useEffect(() => {
    onLoadRows()
  }, [onLoadRows])

  return (
    <Modal.Modal open style={{ maxWidth: 640 }}>
      <Modal.Header color='blue'>Definir Turno</Modal.Header>

      <Modal.Body>
        <TitleWrapper>Defina abaixo qual será o turno do Usuário</TitleWrapper>
        <MwScrollContainer
          onScrollEnd={paginator}
          style={{
            minHeight: 50,
            maxHeight: 170,
            height: '100%',
            position: 'relative',
          }}
          loading={loading}
        >
          {list.map((el) => (
            <Row key={el.id} data={el} checked={[checked, setChecked]} />
          ))}
        </MwScrollContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton appearance='bordered' onClick={onClose}>
          Cancelar
        </MwButton>
        <MwButton onClick={() => setWorkshift()} disabled={checked === null}>
          Aplicar
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}
