import { CSSProperties, useState } from 'react'

import {
  Loader as SemanticLoader,
  Popup as SemanticPopup
} from 'semantic-ui-react'

import * as S from './styled'

interface PopupProps {
  trigger: JSX.Element | string
  inverted?: boolean
  disabled?: boolean
  style?: CSSProperties
  triggerDisplay?: 'inline' | 'flex' | 'block'
  on?: 'click' | 'hover'
  getContent: () => Promise<JSX.Element | string>
  offset?: [number, number]
  position?:
    | 'top left'
    | 'top right'
    | 'bottom right'
    | 'bottom left'
    | 'right center'
    | 'left center'
    | 'top center'
    | 'bottom center'
}

const Loader = () => {
  return (
    <S.LoaderContainer>
      <SemanticLoader size='large' active />
    </S.LoaderContainer>
  )
}

const ManagerColumnPopup = (props: PopupProps) => {
  const {
    trigger,
    getContent,
    position,
    inverted,
    on,
    offset,
    disabled,
    triggerDisplay,
  } = { ...props }

  const style = props.style || {}
  style.maxWidth = 'unset'

  const [content, setContent] = useState<JSX.Element | string>(<Loader />)

  const displayLoader = () => {
    setContent(<Loader />)
  }

  const onOpen = async () => {
    displayLoader()
    setContent(await getContent())
  }

  return (
    <SemanticPopup
      style={style}
      offset={offset}
      on={on || 'click'}
      className={inverted ? 'popup-field' : ''}
      content={{ content }}
      onOpen={onOpen}
      inverted={inverted}
      disabled={disabled || false}
      trigger={
        <S.TriggerContainer display={triggerDisplay}>
          {trigger}
        </S.TriggerContainer>
      }
      position={position}
    />
  )
}

export default ManagerColumnPopup
