import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import type { Card } from '../../../components/types'
import { useModalContext } from '../../../contexts'
import type { Form } from '../../../modals'
import type { FormProps } from '../../../modals/types'

const edit = (
  card: Card,
  isFuture: boolean,
  steps: FormProps['steps'],
): Option => {
  const { openModal, closeModal } = useModalContext<{
    Form: typeof Form
  }>()

  const onClick = () => {
    openModal('Form', { card_id: card.id, close: closeModal, steps })
  }

  return {
    label: <MwEllipsisContainer>Editar</MwEllipsisContainer>,
    data: card,
    rules: [
      () => {
        let content = 'Eventos passados não podem ser editados.'
        if (!isFuture) {
          content = 'Eventos concluídos não podem ser editados.'
        } else {
          return true
        }

        // if (card.status === CARD_STATUS.INTERRUPTED.value) {
        //   content = 'Eventos interrompidos não podem ser editados.'
        // }

        return {
          content,
          position: 'left center',
        }
      },
    ],
    onClick,
  }
}

export default edit
