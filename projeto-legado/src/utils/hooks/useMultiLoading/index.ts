import { useState } from 'react'

const useMultiLoading = <T extends { [key: string]: boolean }>(
  initial: T,
): [(keyof T)[], (key: keyof T, value: boolean) => void] => {
  const [state, setState] = useState({ ...initial })

  const loading = Object.keys(state).filter((e) => state[e])

  const setLoading = (key: keyof typeof state, value: boolean) => {
    setState((prev) => {
      return prev[key] === value ? prev : { ...prev, [key]: value }
    })
  }

  return [loading, setLoading]
}

export default useMultiLoading
