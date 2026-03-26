import type {
  Mask,
  MaskFunction,
  MaskReplace,
  MaskReplaceArray,
} from './interfaces'

const isMaskFunction = (value?: Mask): value is MaskFunction =>
  typeof value === 'function'
const isMaskReplace = (value?: Mask): value is MaskReplace =>
  Array.isArray(value) && value[0] instanceof RegExp
const isMaskReplaceArray = (value?: Mask): value is MaskReplaceArray =>
  Array.isArray(value) && Array.isArray(value[0])

export const getMask = (mask?: Mask): MaskFunction => {
  if (isMaskFunction(mask)) {
    return mask
  }

  if (isMaskReplace(mask)) {
    const [find, replace] = mask
    return (value: string) => value.replace(find, replace)
  }

  if (isMaskReplaceArray(mask)) {
    return (value: string) => {
      let newValue = value
      mask.forEach(([find, replace]) => {
        newValue = newValue.replace(find, replace)
      })
      return newValue
    }
  }

  return (value: string) => value
}
