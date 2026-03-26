import { useState } from 'react'

import type { PopupProps } from '../../types'

const useOpen = (props: PopupProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const isControlled = props.open !== undefined
  const open = isControlled ? props.open : uncontrolledOpen
  const setOpen = (nextOpen: boolean) => {
    if (isControlled) {
      props.setOpen?.(nextOpen)
      return
    }

    setUncontrolledOpen(nextOpen)
  }

  return [open, setOpen] as const
}

export default useOpen
