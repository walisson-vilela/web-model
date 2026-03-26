import React, { useEffect, useRef, useState } from 'react'

import { MwButton, MwIcon, MwInput } from '@mw-kit/mw-ui'
import ReactQuill, { Range, ReactQuillProps } from 'react-quill'

import CustomImage from '../components/CustomImage'
import ReplyContainer from '../components/ReplyContainer'
import ReplyTitle from '../components/ReplyTitle'

import * as S from './styles'

interface ToolbarProps {
  quill: React.MutableRefObject<ReactQuill>
  lastSelection: Range
  rightSide?: JSX.Element
  disabled: boolean
  file?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  image: boolean
}

const Toolbar = (props: ToolbarProps) => {
  const { quill, lastSelection, rightSide, disabled, file } = props

  const [fontSize, setFontSize] = useState<string>('4')

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (!isFirstRender.current && quill) {
      const editor = quill.current.getEditor()
      editor.formatLine(
        lastSelection ? lastSelection.index : 0,
        1,
        'header',
        fontSize,
      )
    }

    isFirstRender.current = false
  }, [fontSize])

  return (
    <S.Container id='toolbar'>
      <S.LeftSide>
        <MwButton
          appearance='bordered'
          color='grey'
          className='ql-bold'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='grey'
          className='ql-italic'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='grey'
          className='ql-underline'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='grey'
          className='ql-strike'
          disabled={disabled}
        />

        <MwInput
          type='select'
          placeholder='Selecione'
          value={fontSize}
          className='ql-header'
          setValue={(value) => setFontSize(value)}
          style={{ width: 75 }}
          position='left bottom'
          loader={async () => ({
            lastPage: true,
            options: [
              { label: '18', value: '1', data: {} },
              { label: '16', value: '2', data: {} },
              { label: '14', value: '3', data: {} },
              { label: '12', value: '4', data: {} },
              { label: '10', value: '5', data: {} },
              { label: '8', value: '6', data: {} },
            ],
          })}
          disabled={disabled}
        />

        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-list'
          value='ordered'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-list'
          value='bullet'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-indent'
          value='-1'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-indent'
          value='+1'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-align'
          value=''
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-align'
          value='center'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-align'
          value='right'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-align'
          value='justify'
          disabled={disabled}
        />
        <MwButton
          appearance='bordered'
          color='lightGrey'
          className='ql-link'
          disabled={disabled}
        />
        {props.image && (
          <MwButton
            appearance='bordered'
            color='lightGrey'
            className='ql-image'
            disabled={disabled}
          />
        )}
      </S.LeftSide>

      <S.RightSide>
        {rightSide}
        {file && (
          <S.FileInput>
            <div>
              <MwIcon type='feather' icon='paperclip' />
              Anexar
            </div>

            <input {...file} type='file' multiple />
          </S.FileInput>
        )}
      </S.RightSide>
    </S.Container>
  )
}

export const formats: ReactQuillProps['formats'] = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'font',
  'size',
  'list',
  'bullet',
  'indent',
  'align',
  'link',
  'image',
  'blockquote',
  CustomImage.blotName,
  ReplyContainer.blotName,
  ReplyTitle.blotName,
]

export default Toolbar
