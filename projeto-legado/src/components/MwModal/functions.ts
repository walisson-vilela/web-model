import { OpenedModal } from './interfaces'

export const isOppenedModal = (variable: any): variable is OpenedModal => {
  return variable && 'title' in variable
}
