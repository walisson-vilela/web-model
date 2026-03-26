import { useMemo } from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import type { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'
import moment from 'moment'

import type { Card } from '../../../components/types'
import { useModalContext, useTabContext } from '../../../contexts'
import type { Remove } from '../../../modals'

const getRemoveRules = (
  validatedRules: boolean,
  cards: Card[],
): Option['rules'] | undefined => {
  if (!validatedRules) {
    return [
      () => ({
        position: 'right center',
        content:
          'Não é permitido deletar eventos passados ou que tenha usuários não subordinados.',
      }),
    ]
  }

  if (!cards.length) {
    return [
      () => ({
        position: 'right center',
        content: 'É necessário ter ao menos um Card selecionado para Deletar.',
      }),
    ]
  }

  return undefined
}

const remove = (): Option => {
  const {
    checked: [checked],
  } = useTabContext()

  const { openModal, closeModal } = useModalContext<{
    Remove: typeof Remove
  }>()

  const cards = checked.reduce<Card[]>((cards, month) => {
    return [
      ...cards,
      ...month.cards.reduce<Card[]>((cards, card) => {
        return [...cards, card]
      }, []),
    ]
  }, [])

  const validatedRules = useMemo(() => {
    const now = moment()

    for (const card of cards) {
      const start = moment(card.starts_at)
      const diffInMinutes = start.diff(now, 'minutes')

      // Card must be more than 1 hour before start time
      if (diffInMinutes <= 60) {
        return false
      }
      // Card must have subordinate_count equal to user_count
      if (
        card.user_count === 0 ||
        card.subordinate_count === 0 ||
        card.user_count !== card.subordinate_count
      ) {
        return false
      }
    }

    return true
  }, [cards])

  return {
    label: <MwEllipsisContainer children='Deletar' />,
    onClick: () => {
      openModal('Remove', { cards, close: closeModal })
    },
    data: {},
    rules: getRemoveRules(validatedRules, cards),
    delimiter: true,
  }
}

export default remove
