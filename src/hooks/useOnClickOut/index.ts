import { useEffect, useState } from 'react'

const useOnClickOut = <T extends HTMLElement>(callback: () => void) => {
  const [ref, setRef] = useState<T | null>(null)

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref || ref.contains(event.target as Node)) {
        return
      }

      callback()
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])

  return setRef
}

export default useOnClickOut
