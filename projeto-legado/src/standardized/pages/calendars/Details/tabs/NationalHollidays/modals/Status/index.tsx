import React from 'react'

import toast from 'react-hot-toast'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../components/Toaster'
import { Modal } from '../../../../components'
import { useMainContext, useTabContext } from '../../../../contexts'
import { toggleStatus } from '../../../../services'

import * as constants from './constants'
import { LABELS } from './constants'
import * as functions from './functions'
import { StatusProps } from './types'

const Status = Object.assign(
  (props: StatusProps) => {
    const { status, ids, close } = props

    const { target, title, name, message, value, color } = LABELS[status]

    const {
      loading: [, setLoading],
    } = useMainContext()

    const { reload } = useTabContext()

    const cards = ids[target]

    const onConfirm = async () => {
      close()
      setLoading(true)

      try {
        await toggleStatus(
          cards.map((card) => card.card_id),
          value,
        )
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
          header: title,
          body: (
            <React.Fragment>
              {message}
              <br />
              {cards.length === 1
                ? `Deseja ${name} o Evento ${cards[0].name}?`
                : `Deseja ${name} os ${cards.length} Eventos selecionados?`}
            </React.Fragment>
          ),
          footer: [
            {
              children: 'Cancelar',
              onClick: onCancel,
            },
            {
              children: name,
              onClick: onConfirm,
              appearance: 'solid',
              color,
            },
          ],
        }}
      />
    )
  },
  {
    ...constants,
    ...functions,
  },
)

export default Status
