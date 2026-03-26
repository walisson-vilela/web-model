import { MwButton } from '@mw-kit/mw-ui'
import { ButtonProps } from 'semantic-ui-react'

type MwButtonProps = Parameters<typeof MwButton>[0]

export type HeaderColors = 'blue' | 'white' | 'black' | 'grey'

export type Actions =
  | {
      buttonType?: 'SemanticButton'
      actions: (ButtonProps | JSX.Element)[]
    }
  | {
      buttonType: 'MwButton'
      actions: (MwButtonProps | JSX.Element)[]
    }

export type OpenedModal = {
  title: JSX.Element | string | JSX.Element[] | string[]
  titleColor?: HeaderColors
  content: JSX.Element | string | JSX.Element[] | string[]
  size?: 'small' | 'tiny' | 'mini' | 'large' | 'fullscreen'
  className?: string
  modalStyles?: React.CSSProperties
  contentStyles?: React.CSSProperties
  contentPadding?: string
} & Actions
