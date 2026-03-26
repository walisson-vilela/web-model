import React, { useEffect } from 'react'

import Portal from '../../addons/Portal'
import Button from '../Button'
import Loader from '../Loader'

import { heights } from './contants'
import type { ModalProps } from './interfaces'
import * as S from './styles'

const Modal = (props: ModalProps) => {
  const {
    openState,
    title,
    size,
    color,
    inverted,
    children,
    content,
    footer,
    footerMessage,
    loading,
    closeOnEsc,
    closeOnClickOutside,
    customSize,
  } = props

  const [open, setOpen] = openState

  const onClickOutside = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (
      closeOnClickOutside &&
      (event.target as HTMLDivElement).parentElement?.id
    ) {
      setOpen(false)
    }
  }

  useEffect(() => {
    const onEscDown = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape') {
        event.preventDefault()

        setOpen(false)
      }
    }

    document.addEventListener('keydown', onEscDown)

    return () => {
      document.removeEventListener('keydown', onEscDown)
    }
  }, [])

  const _size = size ? heights[size] : heights.default

  return (
    <Portal opened={open || false} id='modal'>
      <S.Background onClick={onClickOutside}>
        <S.Container
          $size={size || 'small'}
          $color={color || 'blue'}
          $inverted={inverted}
          $customSize={customSize}
        >
          <S.Header>{title}</S.Header>

          <S.Content>
            {loading ? (
              <Loader
                color='blue'
                size={`calc(${_size} * 0.1454)`}
                borderSize='3px'
              />
            ) : (
              children || content
            )}
          </S.Content>

          <S.Footer>
            <S.FooterMessage>
              {footerMessage &&
                (typeof footerMessage === 'string' ? (
                  <span>{footerMessage}</span>
                ) : (
                  footerMessage
                ))}
            </S.FooterMessage>

            <S.FooterButtons>
              {footer ? (
                footer.map(({ children, ...buttonProps }, index) => (
                  <Button key={index} {...buttonProps}>
                    {children}
                  </Button>
                ))
              ) : (
                <Button
                  content='OK'
                  color={color || 'blue'}
                  onClick={() => setOpen(false)}
                />
              )}
            </S.FooterButtons>
          </S.Footer>
        </S.Container>
      </S.Background>
    </Portal>
  )
}

export default Modal
