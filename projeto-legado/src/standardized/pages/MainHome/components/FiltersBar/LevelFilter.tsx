import { useEffect, useMemo, useRef, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { useMainHomeContext } from '../../context'
import * as S from './styles'

const LevelFilter = () => {
  const {
    levels,
    selectedLevelIds,
    setSelectedLevelIds,
    loading,
  } = useMainHomeContext()

  const [visible, setVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (!visible) return
    const id = requestAnimationFrame(() => {
      inputRef.current?.click()
    })
    return () => cancelAnimationFrame(id)
  }, [visible])

  const selectedLabel = useMemo(() => {
    if (selectedLevelIds.length === 0) return 'Todos'
    return `${selectedLevelIds.length} selecionado(s)`
  }, [selectedLevelIds])

  const openSelect = () => {
    if (loading.levels) return
    setVisible(true)
  }

  return (
    <S.FilterWrapper>
      <S.Trigger type='button' onClick={openSelect}>
        <S.Label>Nível:</S.Label>
        <S.Value>{selectedLabel}</S.Value>
        <S.Caret aria-hidden $open={visible}>
          <span />
        </S.Caret>
      </S.Trigger>

      <S.MultSelectOverlay $visible={visible}>
        <MwInput
          ref={inputRef}
          type='select-multiple'
          placeholder='Pesquisar'
          search
          selectAll
          width='100%'
          inputWidth='100%'
          icon={null}
          loading={loading.levels}
          value={selectedLevelIds.map((id) => id.toString())}
          setValue={(values) => {
            const normalized = values.map((value) => Number(value))
            setSelectedLevelIds(normalized)
            setVisible(false)
          }}
          loader={async (search) => {
            const lowerSearch = search.trim().toLowerCase()

            const options = levels
              .map((level) => {
                const label = (
                  <S.LevelOption>
                    <span>{level.name}</span>
                    <span>
                      {level.structure.name} | {level.structure.level}º Nível
                    </span>
                  </S.LevelOption>
                )

                const text = `${level.name} ${level.structure.name} ${level.structure.level}`.toLowerCase()

                if (lowerSearch && !text.includes(lowerSearch)) {
                  return null
                }

                return {
                  value: level.id.toString(),
                  label,
                  data: level,
                }
              })
              .filter((option) => option !== null) as {
              value: string
              label: React.ReactNode
              data: typeof levels[number]
            }[]

            return {
              lastPage: true,
              options,
            }
          }}
        />
      </S.MultSelectOverlay>
    </S.FilterWrapper>
  )
}

export default LevelFilter
