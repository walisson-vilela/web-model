import React, { useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import { Modal } from '../../components'
import { useMainContext, useTabContext } from '../../contexts'
import { deleteEvents, toggleStatus } from '../../services'

import * as S from './styles'
import { RemoveProps } from './types'

const Remove = (props: RemoveProps) => {
  const { cards, close } = props

  const {
    loading: [, setLoading],
  } = useMainContext()

  const { reload } = useTabContext()

  const [isAware, setIsAware] = useState<boolean>(false)

  const onConfirm = async () => {
    close()
    setLoading(true)

    try {
      const ids = cards.map((card) => card.id)
      await deleteEvents(ids)
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    reload()
  }

  const onCancel = () => close()

  return (
    <Modal
      {...{
        header: 'Deletar Card',
        body: (
          <React.Fragment>
            Ao Deletar o Card, todos os seus eventos serão removidos ou
            interrompidos. Os usuários relacionados não serão mais impactados.
            <br />
            {cards.length === 1
              ? 'Deseja Deletar o Card?'
              : `Deseja Deletar ${cards.length} Cards?`}
            <S.AwareContainer>
              <MwInput
                type='checkbox'
                label='Sim, estou ciente disto'
                onChange={(e) => setIsAware(e.target.checked)}
                checked={isAware}
              />
            </S.AwareContainer>
          </React.Fragment>
        ),
        footer: [
          {
            children: 'Cancelar',
            onClick: onCancel,
          },
          {
            children: 'Deletar',
            appearance: 'solid',
            color: 'warningRed',
            ...(isAware ? { onClick: onConfirm } : { disabled: true }),
          },
        ],
      }}
    />
  )
}

export default Remove
