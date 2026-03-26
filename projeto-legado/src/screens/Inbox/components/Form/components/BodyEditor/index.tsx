import React, { useCallback } from 'react'

import { DeltaStatic } from 'quill'

import TextEditor, {
  OnChangeQuillHandler,
} from '../../../../../../components/TextEditor'
import ReplyContainer from '../../../../../../components/TextEditor/components/ReplyContainer'
import ReplyTitle from '../../../../../../components/TextEditor/components/ReplyTitle'
import { FormState, UseFormSetter } from '../../interfaces'

import { uploadImage } from './services'

const BodyEditor = (props: {
  set: UseFormSetter
  reply: FormState['reply']
  body: FormState['body']
  clearFileCache: React.MouseEventHandler<HTMLInputElement>
  disabled: FormState['editorDisabled']
}) => {
  const { set, reply, body, clearFileCache, disabled } = props

  const onChangeFile: React.ChangeEventHandler<HTMLInputElement> = async (
    e,
  ) => {
    const { files: inputFiles } = e.target
    if (inputFiles.length < 1) return

    set('files', (prev) => [
      ...prev,
      ...[...inputFiles].map((file) => ({ file })),
    ])
  }

  const onChangeQuill: OnChangeQuillHandler = useCallback(
    (quill) => {
      if (!quill || !quill.current) return

      const editor = quill.current.getEditor()

      if (reply.title && reply.body) {
        let contents = editor.getContents()

        // writing title
        contents = contents.concat({
          ops: [
            {
              insert: reply.title,
            },
          ],
        } as unknown as DeltaStatic)
        // wraping with the title container
        contents = contents.concat({
          ops: [
            {
              attributes: {
                [ReplyTitle.blotName]: {},
              },
              insert: '\n',
            },
          ],
        } as unknown as DeltaStatic)

        // writing reply body
        const elements = editor.clipboard.convert(reply.body)
        let level = 0
        elements.eachLine((line, attributes) => {
          // writing content
          contents = contents.concat(line)

          // if is a title, means that it is stating a new reply block
          if (ReplyTitle.blotName in attributes) {
            // increase padding level
            level += 1
            // wraping with the title container
            contents = contents.concat({
              ops: [
                {
                  attributes: {
                    [ReplyTitle.blotName]: {
                      level,
                    },
                  },
                  insert: '\n',
                },
              ],
            } as unknown as DeltaStatic)
          } else {
            // wraping with the line container
            contents = contents.concat({
              ops: [
                {
                  attributes: {
                    [ReplyContainer.blotName]: {
                      level,
                    },
                  },
                  insert: '\n',
                },
              ],
            } as unknown as DeltaStatic)
          }
        })

        editor.setContents(contents)
      }

      editor.insertText(editor.getLength(), '\n')
    },
    [reply.body, reply.title],
  )

  return (
    <TextEditor
      state={[body, (v) => set('body', v)]}
      onChangeQuill={onChangeQuill}
      imageHandle={{ upload: uploadImage }}
      disabled={[disabled, (v) => set('editorDisabled', v)]}
      file={{
        onChange: onChangeFile,
        onClick: clearFileCache,
      }}
      borderless
    />
  )
}

export default BodyEditor
