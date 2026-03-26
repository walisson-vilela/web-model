import { useCallback, useState } from 'react'

interface TranslateProps {
  x: number
  y: number
}

type HookReturnType = [TranslateProps, (element: HTMLElement) => void]

const useCenteredTree = (): HookReturnType => {
  const [translate, setTranslate] = useState<TranslateProps>({ x: 0, y: 0 })

  const ref = useCallback((element: HTMLElement) => {
    if (element) {
      const { width, height } = element.getBoundingClientRect()

      setTranslate({
        x: width / 2,
        y: height / 2,
      })
    }
  }, [])

  return [translate, ref]
}

export default useCenteredTree
