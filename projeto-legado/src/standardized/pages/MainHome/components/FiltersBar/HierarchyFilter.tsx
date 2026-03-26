import { useEffect, useMemo, useRef, useState } from 'react'

import { MwInput } from '@mw-kit/mw-ui'

import { useMainHomeContext } from '../../context'
import * as S from './styles'

const HierarchyFilter = () => {
  const {
    hierarchies,
    selectedHierarchyId,
    setSelectedHierarchyId,
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

  const selectedName = useMemo(
    () =>
      hierarchies.find((item) => item.id === selectedHierarchyId)?.name ?? '-',
    [hierarchies, selectedHierarchyId],
  )

  return (
    <S.FilterWrapper>
      <S.Trigger type='button' onClick={() => setVisible(true)}>
        <S.Label>Visão:</S.Label>
        <S.Value>{selectedName}</S.Value>
        <S.Caret aria-hidden $open={false}>
          <span />
        </S.Caret>
      </S.Trigger>
      <S.SelectOverlay>
        <MwInput
          ref={inputRef}
          type='select'
          value={selectedHierarchyId != null ? selectedHierarchyId.toString() : ''}
          borderless
          width='100%'
          inputWidth='100%'
          placeholder='Selecione'
          loading={loading.hierarchies}
          setValue={(value) => {
            const parsed = Number(value)
            if (Number.isNaN(parsed)) return
            setSelectedHierarchyId(parsed)
            setVisible(false)
          }}
          loader={async () => ({
            lastPage: true,
            options: hierarchies.map((item) => ({
              label: item.name,
              value: item.id.toString(),
              data: item,
            })),
          })}
        />
      </S.SelectOverlay>
    </S.FilterWrapper>
  )
}

export default HierarchyFilter
