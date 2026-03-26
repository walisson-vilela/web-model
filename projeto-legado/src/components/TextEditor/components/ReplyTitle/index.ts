import ReactQuill from 'react-quill'

const BlockQuote = ReactQuill.Quill.import('formats/blockquote')

class ReplyTitle extends BlockQuote {
  static create(options: { level?: number } | boolean) {
    const config = {
      level: 0,
      ...(typeof options === 'boolean' ? {} : options),
    }

    const level = config.level

    const node = super.create(options) as HTMLElement

    node.style.paddingBottom = '7px'
    node.style.margin = `0 0 0 ${level * 14}px`

    return node
  }
}

ReplyTitle.blotName = 'reply-title'
ReplyTitle.className = 'reply-title'
ReplyTitle.tagName = 'blockquote'

export default ReplyTitle
