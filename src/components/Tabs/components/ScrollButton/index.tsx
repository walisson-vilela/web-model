import React, { useCallback } from 'react'

import Icon from '../../../Icon'

import * as S from './styled'

const ScrollButton = (props: {
  mode: 'left' | 'right'
  visible: boolean
  scrollRef: HTMLDivElement | null
}) => {
  const { mode, visible, scrollRef } = props

  const icon = `chevron_${mode}` as 'chevron_left' | 'chevron_right'

  const onClick = useCallback(() => {
    if (!scrollRef) return

    scrollRef.scrollBy({
      left:
        mode === 'left' ? -(scrollRef.scrollWidth + 1) : scrollRef.scrollWidth,
      behavior: 'smooth',
    })
  }, [scrollRef, mode])

  return (
    <S.Container
      className={['scroll-arrow', ...(visible ? ['visible'] : [])].join(' ')}
      onClick={onClick}
    >
      <Icon type='feather' icon={icon} width={16} height={16} color='black' />
    </S.Container>
  )
}

export default ScrollButton
