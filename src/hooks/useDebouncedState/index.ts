import { useCallback, useState } from 'react'

import useDebouncedCallback from '../useDebouncedCallback'

const useDebouncedState = <T>(initial: T, onUpdate: () => void, ms: number) => {
  const [state, setState] = useState({ current: initial, debounced: initial })

  const onUpdateSearch = useDebouncedCallback(
    useCallback((search: T) => {
      onUpdate()
      setState((prev) => ({ ...prev, debounced: search }))
    }, []),
    ms,
  )

  const setCurrent = (input: T) => {
    setState((prev) => ({ ...prev, current: input }))
    onUpdateSearch(input)
  }

  const setDebounced = (value: T) => {
    setState({ current: value, debounced: value })
  }

  return {
    current: [state.current, setCurrent],
    debounced: [state.debounced, setDebounced],
  } as const
}

export default useDebouncedState
