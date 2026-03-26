import { Mask, MaskFunction, MaskReplace, MaskReplaceArray } from './interfaces'

const isMaskFunction = (value: Mask): value is MaskFunction => {
  return typeof value === 'function'
}

const isMaskReplace = (value: Mask): value is MaskReplace => {
  return Array.isArray(value) && value[0] instanceof RegExp
}

const isMaskReplaceArray = (value: Mask): value is MaskReplaceArray => {
  return Array.isArray(value) && Array.isArray(value[0])
}

export const getMask = (mask?: Mask): MaskFunction => {
  if (isMaskFunction(mask)) {
    return mask
  } else if (isMaskReplace(mask)) {
    const [find, replace] = mask
    return (value: string) => value.replace(find, replace)
  } else if (isMaskReplaceArray(mask)) {
    return (value: string) => {
      let newValue = value

      mask.forEach((e) => {
        const [find, replace] = e
        newValue = newValue.replace(find, replace)
      })

      return newValue
    }
  }

  return (value: string) => value
}
