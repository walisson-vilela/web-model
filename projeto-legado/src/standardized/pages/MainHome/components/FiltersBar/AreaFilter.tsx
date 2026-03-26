import { useEffect, useMemo, useRef, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { useMainHomeContext } from '../../context'
import * as S from './styles'

const AreaFilter = () => {
  const {
    areas,
    selectedAreaIds,
    setSelectedAreaIds,
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
    if (selectedAreaIds.length === 0) return 'Todos'
    return `${selectedAreaIds.length} selecionado(s)`
  }, [selectedAreaIds])

  const openSelect = () => {
    if (loading.areas) return
    setVisible(true)
  }

  return (
    <S.FilterWrapper>
      <S.Trigger type='button' onClick={openSelect}>
        <S.Label>Área:</S.Label>
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
          loading={loading.areas}
          value={selectedAreaIds.map((id) => id.toString())}
          setValue={(values) => {
            const normalized = values.map((value) => Number(value))
            setSelectedAreaIds(normalized)
            setVisible(false)
          }}
          loader={async (search) => {
            const lowerSearch = search.trim().toLowerCase()

            const options = areas
              .map((area) => {
                const text = area.name.toLowerCase()

                if (lowerSearch && !text.includes(lowerSearch)) {
                  return null
                }

                return {
                  value: area.id.toString(),
                  label: area.name,
                  data: area,
                }
              })
              .filter((option) => option !== null) as {
              value: string
              label: React.ReactNode
              data: typeof areas[number]
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

export default AreaFilter
