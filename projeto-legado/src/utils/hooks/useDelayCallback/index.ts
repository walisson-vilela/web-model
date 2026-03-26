import { useState } from 'react'

type Callback = (...args: any) => void | Promise<void>

const voidF = () => {}

const useDelayCallback = <T extends Callback>(
  callback: T,
  delay: number,
  always: () => void | Promise<void> = voidF,
) => {
  const [, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const execute = (...args: Parameters<T>) => {
    always()
    setTimeoutId((prev) => {
      clearTimeout(prev)
      return setTimeout(() => callback(...args), delay)
    })
  }

  return execute
}

export default useDelayCallback
