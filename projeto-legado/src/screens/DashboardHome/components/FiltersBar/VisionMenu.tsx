import { useMemo, useState } from 'react'

import { MwMenu } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../../utils/hooks'
import { FILTER_LABELS, useDashboardFilters } from '../../filters'
import * as S from './styles'

const VisionMenu = () => {
  const { state, options, setFilter } = useDashboardFilters()
  const [open, setOpen] = useState(false)
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null)
  const handleClickOutRef = useOnClickOutState<HTMLDivElement>(() =>
    setOpen(false),
  )

  const attachRef = (node: HTMLDivElement | null) => {
    handleClickOutRef(node)
    setAnchor(node)
  }

  const visionOptions = options.vision
  const selectedIndex = visionOptions.findIndex(
    (option) => Number(option.value) === state.vision,
  )
  const selectedOption =
    selectedIndex >= 0 ? visionOptions[selectedIndex] : undefined

  const menuOptions = useMemo(
    () =>
      visionOptions.map((option) => ({
        label: option.label,
        data: option,
        onClick: () => {
          setFilter('vision', option.value)
          setOpen(false)
        },
      })),
    [visionOptions, setFilter],
  )

  return (
    <S.VisionWrapper ref={attachRef}>
      <S.Trigger
        type='button'
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup='menu'
        aria-expanded={open}
      >
        <S.Label as='span'>{FILTER_LABELS.vision}:</S.Label>
        <S.TriggerValue>{selectedOption?.label ?? 'Selecionar'}</S.TriggerValue>
        <S.Caret aria-hidden $open={open}>
          <span />
        </S.Caret>
      </S.Trigger>
      <MwMenu
        open={open}
        close={() => setOpen(false)}
        options={menuOptions}
        highlight={selectedIndex >= 0 ? selectedIndex : undefined}
        boundRef={anchor}
        position='left bottom'
        containerSpacing='s1'
        pointer={{ distance: 's1', size: 's2', color: 'white' }}
      />
    </S.VisionWrapper>
  )
}

export default VisionMenu
