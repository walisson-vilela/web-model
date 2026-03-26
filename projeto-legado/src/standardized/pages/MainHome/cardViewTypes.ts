import type { ReactNode } from 'react'

import type { PlaceholderProps } from '@mw-kit/mw-ui/dist/components/Placeholder/interfaces'

import type { CardStatus } from './components/Card'

export type CardView = {
  title?: string
  content: ReactNode
  footer?: ReactNode
  status?: CardStatus
}

export type CardConfig<TData = unknown> = {
  load: () => Promise<TData>
  build: (data: TData) => CardView
  placeholderType?: PlaceholderProps['type']
}

