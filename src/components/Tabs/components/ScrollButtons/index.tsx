import React, { useCallback, useEffect, useState } from 'react'

import ScrollButton from '../ScrollButton'

import * as S from './styled'

type IScrollButton = React.PropsWithChildren<{
  activeTabIndex: number
  tabsLength: number
  internal: boolean | undefined
}>

const ScrollButtons = (props: IScrollButton) => {
  const { activeTabIndex, tabsLength } = props

  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(false)

  const checkScrollPosition = useCallback(() => {
    if (!ref) return
    if (ref.scrollWidth > ref.offsetWidth) {
      const { scrollLeft, scrollWidth, clientWidth } = ref

      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollWidth - clientWidth - scrollLeft > 10)
    } else {
      setShowLeftArrow(false)
      setShowRightArrow(false)
    }
  }, [ref])

  useEffect(() => {
    checkScrollPosition()

    window.addEventListener('resize', checkScrollPosition)
    return () => window.removeEventListener('resize', checkScrollPosition)
  }, [checkScrollPosition, tabsLength])

  // Faz o scroll para o item ativo
  useEffect(() => {
    if (!ref) return

    if (ref.scrollWidth <= ref.offsetWidth) return

    const element = ref.children[activeTabIndex] as HTMLElement | undefined
    if (!element) return

    element.scrollIntoView({
      behavior: 'smooth',
      inline: 'nearest',
    })
  }, [activeTabIndex, ref])

  return (
    <React.Fragment>
      <ScrollButton scrollRef={ref} mode='left' visible={showLeftArrow} />

      <S.Container
        ref={setRef}
        onWheel={(e: React.WheelEvent) => {
          if (!ref) return

          const x = (ref.offsetWidth * 100) / ref.scrollWidth
          ref.scrollLeft += x * (e.deltaY > 0 ? 1 : -1) * 2

          e.preventDefault()
        }}
        onScroll={checkScrollPosition}
        $internal={props.internal}
        children={props.children}
      />

      <ScrollButton scrollRef={ref} mode='right' visible={showRightArrow} />
    </React.Fragment>
  )
}

export default ScrollButtons
