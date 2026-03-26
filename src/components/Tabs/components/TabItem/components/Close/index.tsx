import React, { useCallback } from 'react'

import Icon from '../../../../../Icon'
import type { TabProps, TabsProps } from '../../../../interfaces'

import * as S from './styles'

const Close = (
  props: Pick<TabsProps, 'onClose'> & {
    index: number
    active: Exclude<TabsProps['active'], number>
    options: [TabProps[], React.Dispatch<React.SetStateAction<TabProps[]>>]
  },
) => {
  const {
    index,
    active: [active, setActive],
    options: [options, setOptions],
  } = props
  const onClose = props.onClose || (() => true)

  const onClickClose = useCallback(
    async (event: React.MouseEvent<SVGElement, MouseEvent>) => {
      if (options.length === 1) return

      const newOptions = [...options]
      newOptions.splice(index, 1)

      if (!(await onClose(index, options[index], event))) {
        return
      }

      // move to previous index if the closed index:
      // or was before the active index
      // or was the active and last index
      const newactive =
        index < active || !newOptions[active] ? active - 1 : active
      setActive(newactive, newOptions[newactive].data)

      setOptions(newOptions)
    },
    [options, active, index, onClose],
  )

  return (
    <S.Close>
      <Icon
        type='feather'
        icon='x'
        onClick={onClickClose}
        width='14px'
        height='14px'
        strokeWidth='3px'
      />
    </S.Close>
  )
}

export default Close
