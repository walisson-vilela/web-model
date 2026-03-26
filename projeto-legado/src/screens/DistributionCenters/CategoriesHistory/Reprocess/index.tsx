import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { Button, Checkbox, Loader, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import * as MainStyles from '../../styled'

import { reprocess } from './services'
import * as S from './styled'

interface ReprocessProps {
  distribution_center_id: number
  closeModal: () => void
  reload: () => void
  reference: string
}

const options: { label: string; value: string }[] = [
  {
    label: 'PDVs Associados',
    value: 'stores',
  },
  {
    label: 'Regra de Rateio',
    value: 'apportionment',
  },
]

const Reprocess = (props: ReprocessProps) => {
  const { distribution_center_id, closeModal, reference, reload } = { ...props }

  const [loading, setLoading] = useState<boolean>(false)
  const [toReprocess, setToReprocess] = useState<string[]>([])

  const onClickConfirm = async () => {
    setLoading(true)

    try {
      const response = await reprocess(distribution_center_id, toReprocess)
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
    <Modal size='small' open>
      <MainStyles.ModalHeader content='Reprocessar Rateio' />

      <MainStyles.Content height='25vh'>
        <div>
          Defina quais parâmetros serão reprocessados no mês de{' '}
          <b>{reference}</b>.
        </div>

        <div>
          {loading ? (
            <Loader />
          ) : (
            options.map((option) => (
              <S.CheckboxContainer key={option.value}>
                <Checkbox
                  label={option.label}
                  checked={toReprocess.includes(option.value)}
                  onChange={(_event: any, data: any) => {
                    const newToReprocess = toReprocess.filter(
                      (e) => e !== option.value,
                    )
                    if (data.checked) newToReprocess.push(option.value)
                    setToReprocess(newToReprocess)
                  }}
                />
              </S.CheckboxContainer>
            ))
          )}
        </div>
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
          disabled={toReprocess.length < 1}
        />
      </Modal.Actions>
    </Modal>
  )
}

export default Reprocess
