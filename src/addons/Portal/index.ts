import { useEffect } from 'react'

import { createPortal } from 'react-dom'

import type { PortalProps } from './interfaces'

const Portal = (props: PortalProps) => {
  const { id, opened, children } = props

  const portalRoot = document.createElement('div')

  useEffect(() => {
    if (opened) {
      portalRoot.id = id + '-root'

      document.body.appendChild(portalRoot)

      return () => {
        document.body.removeChild(portalRoot)
      }
    }
  }, [opened])

  return opened ? createPortal(children, portalRoot) : null
}

export default Portal
