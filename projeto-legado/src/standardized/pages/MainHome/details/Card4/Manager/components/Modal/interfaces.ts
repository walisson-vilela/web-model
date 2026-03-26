import type { ReactNode } from 'react'

interface TabsProps {
  label: string
  component: JSX.Element
}

export interface CheckValidationModalProps {
  data: {
    title: ReactNode
    store_title: ReactNode
    store_subtitle: ReactNode
    options: TabsProps[]
    onClose: () => void
    showTabs?: boolean
  }
}
