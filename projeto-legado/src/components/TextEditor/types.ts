import React from 'react'

import ReactQuill from 'react-quill'

import { UseState } from '../../screens/interfaces'

export type OnChangeQuillHandler = (
  quill: React.MutableRefObject<ReactQuill> | null,
) => void | (() => void)

export type ImageHandle = {
  upload: (
    file: File,
    setProgress: (progress: number) => void,
  ) => Promise<{
    id: number
    name: string
    url: string
  }>
}

export interface TextEditorProps {
  state: UseState<string>
  rightSide?: JSX.Element
  onChangeQuill?: OnChangeQuillHandler
  imageHandle?: ImageHandle
  disabled?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  file?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
  borderless?: boolean
}
