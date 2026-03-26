import React, { useState } from 'react'

import { MwIcon } from '@mw-kit/mw-ui'

import ZoomImage from '../../../../../../../../components/ZoomImage'

import * as S from './styles'

type ToolbarProps = {
  onRemove: () => void
  disabled: boolean
  onMaximize: () => void
  viewMode?: boolean
}

type IImageOverlay = {
  viewMode?: boolean
  label: string
  url: string
} & (
  | Omit<ToolbarProps, 'onMaximize'>
  | {
      onClick: () => void
    }
)

const Toolbar = (props: ToolbarProps) => {
  const { onRemove, disabled, onMaximize, viewMode } = props

  const [remove, maximize] = [
    disabled ? {} : { onClick: onRemove, color: 'white' },
    { onClick: onMaximize, color: 'white' },
  ]

  return (
    <div>
      {!viewMode && (
        <MwIcon
          type='feather'
          icon='trash_2'
          width='17px'
          height='17px'
          strokeWidth='3px'
          {...remove}
        />
      )}

      <MwIcon
        type='feather'
        icon='maximize'
        width='17px'
        height='17px'
        strokeWidth='4px'
        {...maximize}
      />
    </div>
  )
}

const ImageOverlay = (props: IImageOverlay) => {
  const { url, label, viewMode } = props

  const [maximized, setMaximized] = useState(false)

  const [image, ToolbarComponent] =
    'onClick' in props
      ? [{ onClick: props.onClick }, () => null]
      : [
          {},
          () => (
            <Toolbar
              viewMode={viewMode}
              {...props}
              onMaximize={() => setMaximized(true)}
            />
          ),
        ]

  return (
    <React.Fragment>
      <S.ImageBackground>
        <S.Image src={url} {...image}>
          <div>
            <div>
              <div>{label}</div>
              <ToolbarComponent />
            </div>
          </div>
        </S.Image>
      </S.ImageBackground>

      {maximized && (
        <ZoomImage
          onClose={() => setMaximized(false)}
          label={label}
          url={url}
        />
      )}
    </React.Fragment>
  )
}

export default ImageOverlay
