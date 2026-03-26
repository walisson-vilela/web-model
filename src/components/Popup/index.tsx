import React, { useCallback, useMemo, useState } from 'react'

import type { Middleware } from '@floating-ui/react'
import {
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  hide,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react'

import { useFallbackPlacements, useOpen } from './hooks'
import * as S from './styles'
import type { PopupProps } from './types'

const mergeRefs = <T,>(...refs: Array<React.Ref<T> | undefined>) => {
  return (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return
      if (typeof ref === 'function') ref(node)
      else (ref as React.MutableRefObject<T | null>).current = node
    })
  }
}

const PopupComponent = (props: PopupProps) => {
  const {
    content: Content,
    renderTrigger,
    triggerProps,
    on = 'hover',
    placement,
    offset: offsetValue = 8,
    shift: shiftValue = 8,
    background = 'dark',
    closeOnClip = false,
    zIndex = 1000,
  } = props

  const arrowStyle =
    props.arrow || (background === 'dark' ? 'pointed' : 'flattened')
  const withArrow = arrowStyle !== 'none'

  const [open, setOpen] = useOpen(props)
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null)

  const fallbackPlacements = useFallbackPlacements(props)

  const floating = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(offsetValue),
      flip({ fallbackPlacements, padding: shiftValue }),
      shift({ padding: shiftValue }),
      ...(withArrow ? [arrow({ element: arrowElement })] : []),
      ...(closeOnClip
        ? [
            hide(),
            {
              name: 'closeOnClip',
              fn(state) {
                if (state.middlewareData.hide?.referenceHidden) {
                  setOpen(false)
                }
                return {}
              },
            } as Middleware,
          ]
        : []),
    ],
  })
  const { refs, floatingStyles, placement: floatingPlacement } = floating

  const setFloating = useCallback(
    (node: HTMLDivElement | null) => {
      refs.setFloating(node)
    },
    [refs],
  )

  const hover = useHover(floating.context, {
    move: false,
    enabled: on === 'hover',
  })

  const click = useClick(floating.context, {
    enabled: on === 'click',
  })

  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'mousedown',
    escapeKey: true,
    enabled: on === 'click',
  })

  const interactions = useInteractions([hover, click, dismiss])

  const referenceProps = useMemo(() => {
    const { ref: triggerRef, ...rest } = triggerProps || {}
    return interactions.getReferenceProps({
      ...rest,
      ref: mergeRefs(refs.setReference, triggerRef),
    }) as React.HTMLAttributes<HTMLElement>
  }, [interactions, refs.setReference, triggerProps])

  return (
    <React.Fragment>
      {renderTrigger(referenceProps)}

      {open ? (
        <FloatingPortal>
          <S.TooltipSurface
            ref={setFloating}
            style={{ ...floatingStyles, zIndex }}
            $placement={floatingPlacement}
            $background={background}
            {...interactions.getFloatingProps()}
          >
            {withArrow ? (
              <S.TooltipArrow
                ref={setArrowElement}
                $arrow={arrowStyle}
                $placement={floatingPlacement}
              />
            ) : null}
            <Content />
          </S.TooltipSurface>
        </FloatingPortal>
      ) : null}
    </React.Fragment>
  )
}

const Popup = (({
  enabled,
  ...props
}: PopupProps & {
  enabled?: boolean
}) => {
  return enabled !== false ? (
    <PopupComponent {...props} />
  ) : (
    props.renderTrigger(props.triggerProps || {})
  )
}) as <T extends React.ElementType = 'div'>(
  props: PopupProps<T> & {
    enabled?: boolean
  },
) => React.ReactElement | null

export default Popup
