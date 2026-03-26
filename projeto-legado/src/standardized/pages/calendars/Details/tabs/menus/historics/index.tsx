import React from 'react'

import { MwEllipsisContainer } from '@mw-kit/mw-ui'
import { Option } from '@mw-kit/mw-ui/dist/components/Menu/interfaces'

import { Card } from '../../../components/types'

const historics = (
  card: Card,
  setOpen: React.Dispatch<React.SetStateAction<'historics' | null>>,
): Option => {
  return {
    label: <MwEllipsisContainer children='Históricos' />,
    data: card,
    rules: [],
    onClick: () => setOpen('historics'),
    caret: true,
    keepOpen: true,
  }
}

export default historics
