import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import { CARD_STATUS } from '../../../../../constants'
import { useModalContext, useTabContext } from '../../../../../contexts'
import { Status } from '../../../modals'
import { Status as StatusType } from '../../../modals/Status/types'

const status = (status: StatusType): Option => {
  const { openModal, closeModal } = useModalContext<{
    Status: typeof Status
  }>()

  const { target, title, errors } = Status.LABELS[status]

  const {
    checked: [checked],
  } = useTabContext()

  const ids = Status.groupCards(checked)

  return {
    label: <MwEllipsisContainer children={title} />,
    data: {},
    onClick: () => {
      openModal('Status', { status, ids, close: closeModal })
    },
    rules: [
      () => {
        if (ids[target].length > 0) {
          return true
        }

        let content = errors.ONLY
        if (ids[CARD_STATUS.CONCLUDED.value].length > 0) {
          content = 'Eventos Concluídos não podem ser ativados ou inativados'
        }

        if (checked.length < 1) {
          content = errors.AT_LEAST_ONE
        }

        return {
          position: 'right center',
          content,
        }
      },
    ],
  }
}

export default status
