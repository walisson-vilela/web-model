import React from 'react'

import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'

import { formatFileSize } from '../../../../../../utils/Formatters'
import { useFileUploaderProps } from '../../../../../../utils/hooks/useFileUpload'
import { uploadFile } from '../../services'

import * as S from './styles'

const FileContainer = (
  props: Pick<useFileUploaderProps, 'file' | 'onError'> & {
    onRemove: (id: number) => void
  },
) => {
  const {
    file: [file],
    onRemove,
  } = props

  uploadFile(props, 'messages')

  return (
    <S.FileContainer progress={'progress' in file ? file.progress || 0 : 100}>
      <div>
        <div
          onClick={'id' in file ? () => window.open(file.file.url) : undefined}
        >
          <MwEllipsisContainer children={file.file.name} />(
          {formatFileSize(file.file.size).preference.formatted})
        </div>

        <MwIcon
          type='feather'
          icon='x'
          //@ts-ignore
          onClick={() => onRemove(file.id)}
          width='17px'
          height='17px'
        />
      </div>

      <div />
    </S.FileContainer>
  )
}

export default FileContainer
