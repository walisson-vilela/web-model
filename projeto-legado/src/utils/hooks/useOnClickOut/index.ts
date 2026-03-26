import { useEffect, useRef, useState } from 'react'

export const useOnClickOut = <T extends HTMLElement>(
  ref: T,
  callback: (e: MouseEvent | TouchEvent) => void,
  options?: {
    checkContains?: (ref: T, target: Node) => boolean
  },
) => {
  const { checkContains }: Required<typeof options> = {
    checkContains: (ref, target) => ref.contains(target),
    ...(options || {}),
  }

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref || checkContains(ref, event.target as Node)) {
        return
      }

      callback(event)
    }

    document.addEventListener('mousedown', listener, { capture: true })
    document.addEventListener('touchstart', listener, { capture: true })

    return () => {
      document.removeEventListener('mousedown', listener, { capture: true })
      document.removeEventListener('touchstart', listener, { capture: true })
    }
  }, [ref, callback])
}

export const useOnClickOutState = <T extends HTMLElement>(
  callback: () => void,
  options?: {
    checkContains?: (ref: T, target: Node) => boolean
  },
) => {
  const [ref, setRef] = useState<T | null>(null)

  useOnClickOut(ref, callback, options)

  return setRef
}

export const useOnClickOutRef = (
  handler: (e: MouseEvent | TouchEvent) => void,
) => {
  const ref = useRef(null)

  useOnClickOut(ref && ref.current ? ref.current : null, handler)

  return ref
}
