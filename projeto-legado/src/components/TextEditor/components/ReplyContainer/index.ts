import ReactQuill from 'react-quill'

const BlockQuote = ReactQuill.Quill.import('formats/blockquote')

class ReplyContainer extends BlockQuote {
  static create(options: { level?: number } | boolean) {
    const config = {
      level: 0,
      ...(typeof options === 'boolean' ? {} : options),
    }

    const level = config.level

    const node = super.create(options) as HTMLElement

    node.style.paddingLeft = '14px'
    node.style.paddingBottom = '7px'
    node.style.borderLeft = '1px solid #DDD'
    node.style.margin = `0 0 0 ${level * 14}px`

    return node
  }
}

ReplyContainer.blotName = 'reply-container'
ReplyContainer.className = 'reply-container'
ReplyContainer.tagName = 'blockquote'

export default ReplyContainer
