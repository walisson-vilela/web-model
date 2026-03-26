import React, { useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer } from '@mw-kit/mw-ui'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../utils/Formatters'
import { useOnClickOutState } from '../../../utils/hooks'
import { getHighestImageSize } from '../functions'

import { predefinitions, sizeProps } from './constants'
import { getPosition } from './functions'
import * as S from './styles'
import { ImageResizerProps, SizeState } from './types'

const ImageResizer: React.VoidFunctionComponent<ImageResizerProps> = (
  props,
) => {
  const { event, close } = props

  const node = event.target as HTMLImageElement

  const [size, setSize] = useState<SizeState>({
    ...Object.keys(sizeProps).reduce((size, prop) => {
      const style = notEmptyStringOrDefault(node.getAttribute(prop))
      if (!style) return size

      const value = numberOrDefault((style as string).slice(0, -2))
      if (!value) return size

      return { ...size, [prop]: value }
    }, {} as SizeState),
  })

  useEffect(() => {
    Object.keys(sizeProps).forEach((prop) => {
      prop in size
        ? node.setAttribute(prop, `${size[prop]}px`)
        : node.removeAttribute(prop)
    })
  }, [node, size])

  const higherSize = getHighestImageSize(node)

  return (
    <S.Container
      ref={useOnClickOutState(close)}
      position={getPosition({ x: event.x, y: event.y })}
    >
      <MwEllipsisContainer children={node.alt} />

      <div>
        {Object.keys(predefinitions).map((prop) => {
          const { value, label } = predefinitions[prop]

          return (
            <MwButton
              key={prop}
              appearance='link'
              type='button'
              onClick={() => setSize({ [higherSize]: value })}
              children={label}
              disabled={
                Object.keys(size).length === 1 && size[higherSize] === value
              }
            />
          )
        })}

        <MwButton
          type='button'
          appearance='link'
          onClick={() => setSize({})}
          children='Máximo'
          disabled={Object.keys(size).length < 1}
        />
      </div>

      <div>
        {Object.keys(sizeProps).map((prop) => {
          const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
            const value = parseFloat(e.target.value)
            setSize(isNaN(value) ? {} : { [prop]: value })
          }

          return (
            <input
              key={prop}
              type='number'
              placeholder={`${sizeProps[prop]} (pixels)`}
              onChange={onChange}
              value={size[prop] || ''}
            />
          )
        })}
      </div>
    </S.Container>
  )
}

export default ImageResizer
