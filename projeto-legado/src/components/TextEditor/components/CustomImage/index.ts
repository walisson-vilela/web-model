import ReactQuill from 'react-quill'

import { isObject } from '../../../../utils/Validators'
import { predefinitions } from '../../ImageResizer/constants'
import { getHighestImageSize } from '../../functions'

import { CustomImageProps } from './types'

const Img = ReactQuill.Quill.import('formats/image')

class CustomImage extends Img {
  static create(options: CustomImageProps | string | boolean) {
    const node = super.create(options) as HTMLImageElement

    if (typeof options === 'string') {
      node.src = options
    } else if (isObject(options)) {
      Object.keys(options).forEach((prop) => {
        if (prop.startsWith('data-')) {
          node.dataset[prop.slice(5)] = options[prop]
        } else if (options[prop]) {
          node.setAttribute(prop, options[prop])
        }
      })
    }

    node.style.maxWidth = node.style.maxHeight = '100%'

    if (!node.getAttribute('width') && !node.getAttribute('height')) {
      node.addEventListener('load', () => {
        const higherSize = getHighestImageSize(node)

        const map = {
          width: node.naturalWidth,
          height: node.naturalHeight,
        }

        if (map[higherSize] > predefinitions.best.value) {
          node.setAttribute(higherSize, `${predefinitions.best.value}px`)
        }
      })
    }

    node.addEventListener('load', () => {
      node.addEventListener('click', (e) => {
        if (this.setImageResizer) this.setImageResizer(e)
      })
    })

    return node
  }

  static value(node: HTMLImageElement) {
    const options: CustomImageProps = {
      src: node.getAttribute('src'),
      'data-id': node.dataset.id,
      ...['alt', 'title', 'width', 'height'].reduce((parsed, prop) => {
        const value = node.getAttribute(prop)
        if (value) parsed[prop] = value
        return parsed
      }, {}),
    }

    return options
  }
}

CustomImage.blotName = 'custom-image'
CustomImage.className = 'custom-image'
CustomImage.tagName = 'img'

export default CustomImage
