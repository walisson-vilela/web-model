import React, { useState } from 'react'

import { MwAbsoluteContainer, MwIcon } from '@mw-kit/mw-ui'
import { SketchPicker, SketchPickerProps } from 'react-color'

import { useOnClickOutState } from '../../../../../../../../../utils/hooks'
import { notEmptyStringOrDefault } from '../../../../../../../../utils/formatters'

import * as S from './styles'

type Props = Pick<SketchPickerProps, 'color' | 'onChange'> & {
  disabled?: boolean
  viewMode?: boolean
}

const ColorInput = (props: Props) => {
  const { viewMode } = props

  const [open, setOpen] = useState(false)

  const color = props.color ? props.color.toString() : undefined

  const content = (
    <React.Fragment>
      <MwIcon
        type='semantic'
        icon='paint brush'
        width='14px'
        height='14px'
        color='darkBlue'
      />
      Cor da Fonte (<S.ColorSquare value={notEmptyStringOrDefault(color)} />
      {color})
    </React.Fragment>
  )
  return (
    <div>
      <S.Container ref={useOnClickOutState(() => setOpen(false))}>
        {viewMode ? (
          <S.Content children={content} />
        ) : (
          <S.Link
            {...{
              ...(props.disabled
                ? {}
                : {
                    onClick: () => setOpen((prev) => !prev),
                  }),
            }}
            children={content}
          />
        )}

        <MwAbsoluteContainer
          open={open}
          position='top right'
          transition={{
            properties: {
              width: {},
            },
          }}
          width='220px'
        >
          <SketchPicker {...props} disableAlpha />
        </MwAbsoluteContainer>
      </S.Container>
    </div>
  )
}

export default ColorInput
