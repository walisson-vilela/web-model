import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import ReactQuill, { Range } from 'react-quill'

import ImageResizer from './ImageResizer'
import Toolbar, { formats } from './Toolbar'
import CustomImage from './components/CustomImage'
import ReplyContainer from './components/ReplyContainer'
import ReplyTitle from './components/ReplyTitle'
import { imageHandler, linkHandler } from './functions'
import * as modules from './modules'
import * as S from './styles'
import { TextEditorProps } from './types'

ReactQuill.Quill.register(ReplyContainer, true)
ReactQuill.Quill.register(ReplyTitle, true)
ReactQuill.Quill.register('modules/clipboard', modules.clipboard.Plain, true)

const buildIcons = () => {
  /* Adiciona ícones customizados aos botões da barra de tarefas */
  let icons = ReactQuill.Quill.import('ui/icons')

  icons['bold'] = '<i class="bold icon" />'
  icons['italic'] = '<i class="italic icon" />'
  icons['underline'] = '<i class="underline icon" />'
  icons['strike'] = '<i class="strikethrough icon" />'

  icons['indent']['+1'] = '<i class="indent icon" />'
  icons['indent']['-1'] = '<i class="outdent icon" />'

  icons['align'][''] = '<i class="align left icon" />'
  icons['align']['center'] = '<i class="align center icon" />'
  icons['align']['right'] = '<i class="align right icon" />'
  icons['align']['justify'] = '<i class="align justify icon" />'

  icons['list']['ordered'] = '<i class="list ol icon" />'
  icons['list']['bullet'] = '<i class="list ul icon" />'

  icons['link'] = '<i class="linkify icon" />'

  icons['image'] = `<i class="image icon" />`
}

const TextEditor = (props: TextEditorProps) => {
  const [value, setValue] = props.state

  const quill = useRef<ReactQuill | null>(null)
  const [disabled, setDisabled] = props.disabled || useState<boolean>(false)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [lastSelection, setLastSelection] = useState<Range>(null)
  const [imageResizer, setImageResizer] = useState<MouseEvent | null>(null)

  buildIcons()

  useEffect(() => {
    CustomImage.setImageResizer = setImageResizer
    ReactQuill.Quill.register(CustomImage, true)
  }, [])

  useEffect(() => {
    if (!quill || !quill.current) {
      setLastSelection(null)
      return
    }

    quill.current.getEditor().on('selection-change', (range) => {
      if (range) setLastSelection(range)
    })
  }, [quill])

  const onChangeQuill = useCallback(() => {
    const callback = props.onChangeQuill || (() => {})
    return callback(quill)
  }, [quill, props.onChangeQuill])

  useEffect(() => {
    return onChangeQuill()
  }, [onChangeQuill])

  const modules = useMemo(
    () => ({
      toolbar: {
        container: '#toolbar',
        handlers: {
          image: () => {
            if (!quill || !quill.current || !props.imageHandle) return
            imageHandler(
              quill.current,
              props.imageHandle,
              setDisabled,
              setUploadProgress,
            )
          },
          link: (value: boolean) => {
            if (!quill || !quill.current) return
            linkHandler(quill.current, value)
          },
        },
      },
    }),
    [quill],
  )

  return (
    <S.Container
      $disabled={disabled}
      $progress={uploadProgress}
      $borderless={props.borderless}
    >
      <Toolbar
        quill={quill}
        lastSelection={lastSelection}
        rightSide={props.rightSide}
        disabled={disabled}
        file={props.file}
        image={props.imageHandle !== undefined}
      />

      <ReactQuill
        ref={quill}
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        preserveWhitespace
        readOnly={disabled}
        bounds='.quill'
      />

      {imageResizer && (
        <ImageResizer
          event={imageResizer}
          close={() => setImageResizer(null)}
        />
      )}
    </S.Container>
  )
}

export * from './types'

export default TextEditor
