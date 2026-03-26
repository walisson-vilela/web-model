import React, { useState } from 'react'

import { filterObject } from '../../functions/formatters'
import Loader from '../Loader'

import type {
  AfterBefore,
  OverflowContainerProps,
  ScrollContainerProps,
  StyledAfterBefore,
} from './interfaces'
import * as S from './styles'

const isAfterBefore = (
  props: Exclude<ScrollContainerProps['before'], undefined>,
): props is AfterBefore => {
  return !React.isValidElement(props)
}

const getBeforeAfter = (props: ScrollContainerProps['before']) => {
  if (!props) return null

  if (!isAfterBefore(props)) return <S.BeforeAfterContainer children={props} />

  const args = filterObject<AfterBefore, StyledAfterBefore>(
    props,
    ['fluid', 'background', 'spacing'],
    {
      $fluid: props.fluid,
      $background: props.background,
      $spacing: props.spacing,
    },
  )

  return <S.BeforeAfterContainer {...args} />
}

const ScrollContainer = React.forwardRef<HTMLDivElement, ScrollContainerProps>(
  (props, ref) => {
    const { loading } = props

    const onScrollEnd = props.onScrollEnd || (() => {})

    const [, setLastPagination] = useState<Date>(new Date())

    const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      // preventing event bublling, can be removed if react is grather than 17
      if (event.target !== event.currentTarget) return

      const target = event.nativeEvent.target as HTMLDivElement | null

      if (!target) return

      const scrollTopMax =
        target.scrollHeight - target.getBoundingClientRect().height - 10 // -10 is a workaround to work with Chrome zoom
      const scrollTop = target.scrollTop

      if (scrollTopMax > 0 && scrollTop >= scrollTopMax) {
        setLastPagination((prev) => {
          const now = new Date()

          const diff = Math.abs((now.getTime() - prev.getTime()) / 1000)

          if (diff < 0.5) return prev

          onScrollEnd(event)
          return now
        })
      }
    }

    const _onScroll = props.onScroll || (() => {})

    const htmlProps = filterObject<
      ScrollContainerProps,
      OverflowContainerProps
    >(
      props,
      [
        'onScrollEnd',
        'before',
        'after',
        'loading',
        'height',
        'maxHeight',
        'spacing',
        'empty',
      ],
      {
        $height: props.height,
        $maxHeight: props.maxHeight,
        $spacing: props.spacing,
      },
    )

    return (
      <S.Container>
        {getBeforeAfter(props.before)}

        <S.RelativeContainer>
          {
            <S.OverflowContainer
              ref={ref}
              {...htmlProps}
              onScroll={(event: React.UIEvent<HTMLDivElement, UIEvent>) => {
                _onScroll(event)
                onScroll(event)
              }}
              {...(props.empty && props.empty.empty
                ? { children: props.empty.content }
                : {})}
            />
          }

          {loading && <Loader filled {...(loading === true ? {} : loading)} />}
        </S.RelativeContainer>

        {getBeforeAfter(props.after)}
      </S.Container>
    )
  },
)

ScrollContainer.displayName = 'ScrollContainer'

export default ScrollContainer
