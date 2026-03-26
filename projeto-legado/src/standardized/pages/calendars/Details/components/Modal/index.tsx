import React from 'react'

import { MwButton } from '@mw-kit/mw-ui'
import { Popup, Modal as SemanticModal } from 'semantic-ui-react'

import { isObject } from '../../../../../../utils/Validators'

import * as S from './styles'
import { BodyProps, HeaderProps, ModalProps } from './types'

const Modal = (props: ModalProps) => {
  const { header: Header, body: Body, footer } = props

  return (
    <SemanticModal size='tiny' {...(props.modal || {})} open>
      <S.Container {...(props.container || {})}>
        {typeof Header === 'function' ? (
          <Header />
        ) : (
          <S.Header
            {...(isObject<HeaderProps>(Header) ? Header : { children: Header })}
          />
        )}

        {typeof Body === 'function' ? (
          <Body />
        ) : (
          <S.Body
            {...(!React.isValidElement(Body) && isObject<BodyProps>(Body)
              ? Body
              : { children: Body })}
          />
        )}

        <S.Footer>
          {footer.map((Button, index) => {
            if (typeof Button === 'function') return <Button key={index} />

            const buttonProps = { ...Button }
            delete buttonProps.popup

            const content = (
              <MwButton
                key={index}
                type='button'
                size='large'
                appearance='borderless'
                {...buttonProps}
              />
            )

            if (!('popup' in Button)) return content

            return (
              <Popup
                key={index}
                {...Button.popup}
                trigger={<div>{content}</div>}
              />
            )
          })}
        </S.Footer>
      </S.Container>
    </SemanticModal>
  )
}

export default Modal
