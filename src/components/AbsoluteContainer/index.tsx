import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'

import { filterObject, keys } from '../../functions/formatters'
import { isKeyOf } from '../../functions/validators'
import Transition from '../Transition'

import type { AbsoluteContainerProps, Position } from './interfaces'
import * as S from './styles'

export const AbsoluteContainer = React.forwardRef(
  (
    props: AbsoluteContainerProps,
    fowardedRef?: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const { open, boundRef } = props

    const center = props.center || {
      x: 50,
      y: 75,
    }

    const axis = props.axis || 'y'

    const [ref, setRef] = useState<HTMLDivElement | null>(null)

    const getPosition = useCallback((): Position | null => {
      if (props.position) return props.position

      if (!ref) return null

      const { width, height, offsetTop, offsetLeft } = boundRef
        ? (() => {
            const rect = boundRef.getBoundingClientRect()
            return {
              offsetTop: rect.top,
              offsetLeft: rect.left,
              width: boundRef.offsetWidth,
              height: boundRef.offsetHeight,
            }
          })()
        : {
            offsetTop: 0,
            offsetLeft: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          }

      const rect = ref.getBoundingClientRect()
      const top = rect.top - offsetTop
      const left = rect.left - offsetLeft

      const x = (left * 100) / width
      const y = (top * 100) / height

      if (axis === 'y') {
        const xDirection = x > center.x ? 'right' : 'left'
        const yDirection = y > center.y ? 'top' : 'bottom'

        const newPosition: Position = `${xDirection} ${yDirection}` as Position
        return newPosition
      } else {
        const xDirection = x > center.x ? 'left' : 'right'
        const yDirection = y > center.y ? 'bottom' : 'top'

        const newPosition: Position = `${yDirection} ${xDirection}` as Position
        return newPosition
      }
    }, [ref, boundRef, props.position])

    const [position, setPosition] = useState<Position | null>(getPosition)

    useImperativeHandle(fowardedRef, () => ref as HTMLDivElement)

    useEffect(() => {
      setPosition(getPosition)
    }, [getPosition])

    const htmlProps = filterObject<
      AbsoluteContainerProps,
      React.HTMLAttributes<HTMLDivElement>
    >(props, [
      'width',
      'height',
      'maxWidth',
      'maxHeight',
      'references',
      'zIndex',
      'pointer',
      'bgColor',
      'open',
      'position',
      'axis',
      'center',
      'ref',
      'boundRef',
      'transition',
      'content' as keyof AbsoluteContainerProps,
    ])

    const cssKeys = {
      width: 'width',
      'max-width': 'maxWidth',
      height: 'height',
      'max-height': 'maxHeight',
    }

    const propsTransition = {
      mountDuration: 500,
      properties: keys(cssKeys)
        .filter((k) => {
          const key = cssKeys[k]
          return isKeyOf(props, key) && props[key] !== undefined
        })
        .reduce((prev, k) => ({ ...prev, [k]: {} }), {}),
      ...(props.transition || {}),
    }

    return (
      <Transition
        active={open}
        mountDuration={propsTransition.mountDuration}
        element={(transition) => (
          <S.Container
            {...htmlProps}
            ref={setRef}
            $position={position}
            $transition={{
              ...propsTransition,
              ...transition,
            }}
            $bgColor={props.bgColor}
            $width={props.width}
            $height={props.height}
            $maxWidth={props.maxWidth}
            $maxHeight={props.maxHeight}
            $references={props.references}
            $pointer={props.pointer}
            $zIndex={props.zIndex}
          >
            <div
              children={'content' in props ? <props.content /> : props.children}
            />
          </S.Container>
        )}
      />
    )
  },
)

AbsoluteContainer.displayName = 'AbsoluteContainer'

export default AbsoluteContainer
