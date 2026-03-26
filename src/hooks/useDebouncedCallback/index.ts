import { useEffect, useMemo } from 'react'

export type DebouncedFunction<T extends (...args: never[]) => unknown> = {
  (...args: Parameters<T>): void
  cancel: () => void
  flush: () => void
}

export const debounce = <T extends (...args: never[]) => unknown>(
  fn: T,
  delay: number,
): DebouncedFunction<T> => {
  let timeout: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null

  const debounced = (...args: Parameters<T>): void => {
    lastArgs = args

    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      if (lastArgs !== null) {
        fn(...lastArgs)
        lastArgs = null
      }
      timeout = null
    }, delay)
  }

  debounced.cancel = (): void => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
    lastArgs = null
  }

  debounced.flush = (): void => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }

    if (lastArgs !== null) {
      fn(...lastArgs)
      lastArgs = null
    }
  }

  return debounced
}

export const useDebouncedCallback = <T extends (...args: never[]) => unknown>(
  callback: T,
  delay: number,
): DebouncedFunction<T> => {
  const debounced = useMemo(() => debounce(callback, delay), [callback, delay])

  // Cancela o debounce antigo quando callback ou delay mudam
  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [debounced])

  return debounced
}

export default useDebouncedCallback
