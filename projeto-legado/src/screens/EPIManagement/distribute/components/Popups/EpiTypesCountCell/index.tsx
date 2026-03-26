import React, { useEffect, useMemo, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { Popup } from 'semantic-ui-react'

import { DistributionEpiType } from '../../../interfaces'
import { listDistributionEpiTypes } from '../../../services'
import EpiTypesQuantityTable from '../EpiTypesQuantityTable'
import * as S from './styles'

type Props = {
  count: number
  distributionId: number
  initialItems?: DistributionEpiType[]
}

const EpiTypesCountCell: React.FC<Props> = ({
  count,
  distributionId,
  initialItems = [],
}) => {
  const [search, setSearch] = useState('')
  const [items, setItems] = useState<DistributionEpiType[]>(initialItems)
  const [loading, setLoading] = useState(false)
  const [initialized, setInitialized] = useState(initialItems.length > 0)

  const handleOpen = async () => {
    if (initialized) return
    setInitialized(true)
    try {
      setLoading(true)
      const data = await listDistributionEpiTypes(distributionId)
      setItems(data)
    } catch (error) {
      console.error(error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (initialItems.length > 0) {
      setItems(initialItems)
      setInitialized(true)
    }
  }, [initialItems])

  const filtered = useMemo(() => {
    if (!search.trim()) return items
    const term = search.toLowerCase()
    return items.filter((item) => item.name.toLowerCase().includes(term))
  }, [items, search])

  return (
    <Popup
      on='click'
      onOpen={handleOpen}
      position='bottom center'
      style={{ padding: 0 }}
      trigger={
        <S.Trigger>
          <S.Value>{count.toString().padStart(2, '0')}</S.Value>
          <S.Label>Tipos de EPI&apos;s</S.Label>
        </S.Trigger>
      }
      content={
        <S.Container>
          <S.Header>
            <div>
              <p>
                <b>Lista de Distribuição</b>
              </p>
            </div>
            <div>
              <SearchFilter setSearch={setSearch} size='mini' />
            </div>
          </S.Header>

          <S.Body>
            <EpiTypesQuantityTable data={filtered} loading={loading} />
          </S.Body>
        </S.Container>
      }
    />
  )
}

export default EpiTypesCountCell
