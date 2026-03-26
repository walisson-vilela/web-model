import ReactQuill from 'react-quill'

import { numberOrDefault } from '../../utils/Formatters'
import { isHTMLElement, isObject } from '../../utils/Validators'

import CustomImage from './components/CustomImage'
import { CustomImageProps } from './components/CustomImage/types'
import { ImageHandle } from './types'

export const imageHandler = async (
  quill: ReactQuill,
  props: ImageHandle,
  setDisabled: (loading: boolean) => void,
  setProgress: (progress: number) => void,
) => {
  const input = document.createElement('input')

  input.setAttribute('type', 'file')
  input.setAttribute('accept', 'image/*')
  input.click()

  input.addEventListener('change', async () => {
    setDisabled(true)
    setProgress(0)

    const file = input.files[0]
    const formData = new FormData()

    formData.append('image', file)

    try {
      const { id, name, url } = await props.upload(file, setProgress)
      const selection = quill.getEditor().getSelection()
      quill
        .getEditor()
        .insertEmbed(selection ? selection.index : 0, CustomImage.blotName, {
          src: url,
          'data-id': id.toString(),
          alt: name,
          title: name,
        } as CustomImageProps)
    } catch (e) {
      console.error(e)
    }

    setProgress(0)
    setDisabled(false)
  })
}

export const getHighestImageSize = (
  node: HTMLImageElement,
): 'height' | 'width' => {
  return node.naturalHeight > node.naturalWidth ? 'height' : 'width'
}

export const linkHandler = (quill: ReactQuill, value: boolean) => {
  const editor = quill.getEditor() as ReturnType<typeof quill.getEditor> & {
    theme?: unknown
  }
  if (
    !('theme' in editor) ||
    !isObject(editor.theme) ||
    !isObject(editor.theme.tooltip) ||
    !isHTMLElement(editor.theme.tooltip.root, 'div')
  )
    return

  const root = editor.theme.tooltip.root
  const input = root.querySelector<HTMLInputElement>('input[data-link]')
  if (!input) return
  input.dataset.link = ''
  input.placeholder = ''
  input.dataset.lpignore = 'true'

  if (!value) {
    editor.format('link', false)
    return
  }

  const range = editor.getSelection()
  if (range == null || range.length === 0) return

  const content = editor.getText(range.index)
  let prefix = ''
  // if it's an email
  if (/^\S+@\S+\.\S+$/.test(content)) {
    // if it doesn't have the prefix "mailto:", adds it
    if (content.indexOf('mailto:') !== 0) prefix = 'mailto:'
  } else {
    if (content.indexOf('http://') !== 0 || content.indexOf('https://') !== 0)
      prefix = 'https://'
  }
  const { tooltip } = editor.theme
  tooltip.edit('link', `${prefix}${content}`)
}

export const getHTMLImageIds = (html: string): number[] => {
  const parser = new DOMParser()
  const document = parser.parseFromString(html, 'text/html')
  const images = [...document.getElementsByTagName('img')]
  const ids = images.reduce((ids, e) => {
    const id = numberOrDefault(e.dataset.id)
    return [...ids, ...(id ? [id] : [])]
  }, [] as number[])

  return ids
}
