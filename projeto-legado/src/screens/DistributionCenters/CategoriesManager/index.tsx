import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import * as MainStyles from '../styled'

import Manager from './Manager'
import { updateCategories } from './services'

interface CategoriesManagerProps {
  distribution_center_id: number
  title?: JSX.Element | string
  closeModal: () => void
  reload: () => void
}

const CategoriesManager = (props: CategoriesManagerProps) => {
  const { distribution_center_id, closeModal, reload, title } = { ...props }

  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<number[]>([])

  const onClickConfirm = async () => {
    setLoading(true)

    try {
      const response = await updateCategories(
        distribution_center_id,
        categories,
      )
      if (!response.success) throw new Error('Request returned no success')
      toast(<ToasterContent color='normal' />, SuccessStyle)
      reload()
      closeModal()
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }

  return (
    <Modal size='large' open>
      <MainStyles.ModalHeader
        content='Gerenciar Rateio por Linha de Produto'
        color='blue'
      />

      <MainStyles.Content>
        <Manager
          title={title}
          distribution_center_id={distribution_center_id}
          categories={categories}
          setCategories={setCategories}
          loading={loading}
          setLoading={setLoading}
        />
      </MainStyles.Content>

      <Modal.Actions>
        <Button
          basic
          className='tertiary'
          type='button'
          content='Cancelar'
          onClick={closeModal}
        />
        <Button
          type='button'
          content='Confirmar'
          color='blue'
          onClick={onClickConfirm}
          style={{ marginRight: 0 }}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default CategoriesManager
