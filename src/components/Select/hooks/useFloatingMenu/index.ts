import {
  autoUpdate,
  flip,
  size,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react'

import { MENU_EXIT_MS } from '../../constants'

type UseFloatingMenuParams = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const useFloatingMenu = ({ open, onOpenChange }: UseFloatingMenuParams) => {
  const floating = useFloating({
    open,
    onOpenChange,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
          })
        },
      }),
    ],
  })

  const transition = useTransitionStatus(floating.context, {
    duration: MENU_EXIT_MS,
  })

  const dismiss = useDismiss(floating.context, {
    outsidePressEvent: 'mousedown',
    escapeKey: true,
  })

  const interactions = useInteractions([dismiss])

  return {
    floating,
    transition,
    interactions,
  }
}

export default useFloatingMenu
