import type { HTMLAttributes } from 'react'
import { useCallback } from 'react'

import type { Option } from '../interfaces'

export const isAvailable = (index: number, option: Option) => {
  return (
    !option.disabled &&
    !(option.rules || []).some((rule) => rule(index, option.data) !== true)
  )
}

const useNavigation = (props: {
  highlight: [number, React.Dispatch<React.SetStateAction<number>>]
  options: Option[]
  onSelectHighlight: (index: number, option: Option) => void
}) => {
  const {
    highlight: [highlight, setHighlight],
    options,
    onSelectHighlight,
  } = props

  const onKeyDown = useCallback<
    Required<HTMLAttributes<HTMLInputElement>>['onKeyDown']
  >(
    (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault()

        const getNext = (index: number, current: number): number => {
          const option = options[index]
          if (!option) return current
          if (isAvailable(index, option)) {
            return index
          }
          return getNext(index + 1, current)
        }

        setHighlight((prev) => {
          return getNext(prev + 1, prev)
        })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()

        const getPrev = (index: number, current: number): number => {
          const option = options[index]
          if (!option) return current
          if (isAvailable(index, option)) {
            return index
          }
          return getPrev(index - 1, current)
        }

        setHighlight((prev) => {
          return getPrev(prev - 1, prev)
        })
      } else if (e.key === 'Enter') {
        e.preventDefault()

        const option = options[highlight]
        if (option) {
          onSelectHighlight(highlight, option)
        }
      }
    },
    [highlight, options],
  )

  const onFocus: HTMLAttributes<HTMLInputElement>['onFocus'] = () => {
    setHighlight(options.findIndex((e, i) => isAvailable(i, e)))
  }

  const onBlur: HTMLAttributes<HTMLInputElement>['onFocus'] = () => {
    setHighlight(-1)
  }

  return { onKeyDown, onFocus, onBlur }
}

export default useNavigation
