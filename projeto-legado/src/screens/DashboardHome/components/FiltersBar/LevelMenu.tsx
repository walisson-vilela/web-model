import { useMemo, useState } from 'react'

import { MwMenu } from '@mw-kit/mw-ui'

import { useOnClickOutState } from '../../../../utils/hooks'
import { FILTER_LABELS, useDashboardFilters } from '../../filters'
import * as S from './styles'

const LevelMenu = () => {
  const {
    state,
    levels,
    levelElements,
    setLevelFilter,
  } = useDashboardFilters()

  const [openMain, setOpenMain] = useState(false)
  const [openSub, setOpenSub] = useState(false)
  const [activeLevelId, setActiveLevelId] = useState<number>(
    state.levelId || levels[0]?.id || 0,
  )
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null)
  const [mainMenuRef, setMainMenuRef] = useState<HTMLDivElement | null>(null)
  const handleClickOutRef = useOnClickOutState<HTMLDivElement>(() => {
    setOpenMain(false)
    setOpenSub(false)
  })

  const closeMenus = () => {
    setOpenMain(false)
    setOpenSub(false)
  }

  const attachRef = (node: HTMLDivElement | null) => {
    handleClickOutRef(node)
    setAnchor(node)
  }

  const handleToggle = () => {
    if (!openMain) {
      setActiveLevelId(state.levelId || levels[0]?.id || 0)
      setOpenSub(true)
    } else {
      setOpenSub(false)
    }
    setOpenMain((prev) => !prev)
  }

  const currentElements = useMemo(() => {
    const list = levelElements.filter((item) => item.levelId === activeLevelId)
    return [{ id: 0, levelId: activeLevelId, name: 'Todos' }, ...list]
  }, [levelElements, activeLevelId])

  const currentLevelLabel = useMemo(() => {
    const level = levels.find((lvl) => lvl.id === state.levelId)
    const element = levelElements.find(
      (el) => el.id === state.levelElementId,
    )

    if (!level) return 'Todos'
    if (!element || element.id === 0 || element.levelId !== level.id)
      return level.name
    return `${level.name} · ${element.name}`
  }, [levels, levelElements, state.levelId, state.levelElementId])

  const mainOptions = levels.map((level) => ({
    label: (
      <S.MenuItem
        data-active={level.id === activeLevelId}
        onMouseEnter={() => {
          setActiveLevelId(level.id)
          setOpenSub(true)
        }}
      >
        {level.name}
      </S.MenuItem>
    ),
    keepOpen: true,
    data: level,
  }))

  const submenuHighlight = currentElements.findIndex(
    (element) =>
      element.id === state.levelElementId &&
      element.levelId === state.levelId,
  )

  return (
    <S.LevelWrapper ref={attachRef}>
      <S.Trigger type='button' onClick={handleToggle} aria-haspopup='menu'>
        <S.Label as='span'>{FILTER_LABELS.level}:</S.Label>
        <S.TriggerValue>{currentLevelLabel}</S.TriggerValue>
        <S.Caret $open={openMain}>
          <span />
        </S.Caret>
      </S.Trigger>

      <MwMenu
        ref={setMainMenuRef}
        open={openMain}
        close={closeMenus}
        options={mainOptions}
        boundRef={anchor}
        axis='y'
        center={{ x: 50, y: 120 }}
        containerSpacing='s1'
        pointer={{ distance: 's1', size: 's2', color: 'white' }}
      />

      <MwMenu
        open={openMain && openSub}
        close={closeMenus}
        options={currentElements.map((element) => ({
          label: element.name,
          data: element,
          onClick: () => {
            setLevelFilter(activeLevelId, element.id)
            closeMenus()
          },
        }))}
        highlight={submenuHighlight >= 0 ? submenuHighlight : undefined}
        boundRef={mainMenuRef || anchor}
        position='top right'
        references={{ top: '20px', left: '190px' }}
        containerSpacing='s1'
        pointer={{ distance: 's1', size: 's2', color: 'white' }}
      />
    </S.LevelWrapper>
  )
}

export default LevelMenu
