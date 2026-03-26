import React from 'react'

import { MwGrid, PopupProps } from '@mw-kit/mw-ui'

import Toolbar from './Toolbar'

export type Row<T> = {
  data: T
  disabled?: boolean
}

export type Rows<T> = (Row<T> & {
  content: Element | Element[] | RowComponent<T>
  popup?: Omit<PopupProps, 'trigger'>
} & (
    | { after?: Element | Element[] | RowComponent<T> }
    | { checked?: boolean }
  ))[]

export type IdentifyFunc<T> = (x: T, y: T) => boolean

type Element = JSX.Element | string

type GetRowPropsT = {
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement>
}

export type RowComponent<T> = React.FunctionComponent<
  Row<T> & { checked: boolean }
>

export type GridSelectorProps<T> = {
  rows: Rows<T>
  loading?: boolean
  messages?: Partial<{ [key in 'empty']: React.ReactNode }>
  pagination?: {
    page: [number, React.Dispatch<React.SetStateAction<number>>]
    lastPage: boolean
  }
  grid?: Parameters<typeof MwGrid>[0]

  scrollHeight?: string
} & (T extends { id: unknown }
  ? { identify?: IdentifyFunc<T> }
  : { identify: IdentifyFunc<T> }) &
  (
    | {
        checked: [T[], React.Dispatch<React.SetStateAction<T[]>>]
        getRowProps?: (row: Row<T>, checked: T[]) => GetRowPropsT
        type?: 'checkbox'
        toolbar?: Omit<
          Parameters<typeof Toolbar>[0],
          'checkAll' | 'clearChecked' | 'clearPage'
        > & {
          checkAll?: true
        }
      }
    | {
        checked: [T | null, React.Dispatch<React.SetStateAction<T | null>>]
        getRowProps?: (row: Row<T>, checked: T) => GetRowPropsT
        type: 'radio'
        toolbar?: Omit<
          Parameters<typeof Toolbar>[0],
          'checkAll' | 'clearChecked' | 'clearPage'
        >
      }
  )

export type { Rule } from './ActionType/types'
export type { TUseContent, TUseContentSelected } from './Container/interfaces'
