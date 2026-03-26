import { useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import GridSelector from '../../../../../components/GridSelector'
import { default as Modal } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import axios from '../../../../../services/Axios'
import { BodyInterface } from '../../interfaces'

import { StoreProps } from './components/interface'
import useLeft from './components/left'
import { getStores } from './components/left/service'
import useRight from './components/rigth'
import Context from './context'

interface IManagerPDV {
  setOpen: React.Dispatch<React.SetStateAction<JSX.Element>>
  areaBasics: BodyInterface
  loadData: () => void
}

const ManagerPDVs = ({ setOpen, areaBasics, loadData }: IManagerPDV) => {
  const [selected, setSelected] = useState<StoreProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const onClose = () => {
    setOpen(<></>)
  }

  const onSubmit = async () => {
    setLoading(true)

    try {
      const res = await axios.post(`/v1/tr/markets/${areaBasics.id}/stores`, {
        ids: selected.map((e) => e.id),
      })

      if (res.data.success) {
        close()
        toast(<ToasterContent color='normal' />, SuccessStyle)
        loadData()
      }
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
      onClose()
    }
  }

  const onloadSelected = async () => {
    setLoading(true)
    try {
      const response = await getStores('', [], areaBasics.id)
      setSelected(response)
    } catch (e) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
    setLoading(false)
  }

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
      <Modal.Header color='blue'>Gerenciar PDVs</Modal.Header>

      <Modal.Body style={{ padding: '0' }}>
        {' '}
        <Context.Provider
          value={{ flagId: areaBasics, loading: [loading, setLoading] }}
        >
          <GridSelector.Container
            selected={[selected, setSelected]}
            left={useLeft}
            right={useRight}
          />
        </Context.Provider>
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          type='button'
          appearance='link'
          content='Cancelar'
          onClick={onClose}
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

export default ManagerPDVs
