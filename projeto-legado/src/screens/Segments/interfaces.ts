import { ButtonProps } from 'semantic-ui-react'

type HeaderColors = 'blue'

export interface OpenedModal {
  title: JSX.Element | string | JSX.Element[] | string[]
  titleColor?: HeaderColors
  content: JSX.Element | string | JSX.Element[] | string[]
  actions: ButtonProps[]
  size?: 'small' | 'tiny' | 'mini' | 'large' | 'fullscreen'
}
