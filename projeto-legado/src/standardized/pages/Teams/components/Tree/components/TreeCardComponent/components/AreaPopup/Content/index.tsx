import { useCallback, useEffect, useState } from 'react'

import { MwEllipsisContainer, MwScrollContainer } from '@mw-kit/mw-ui'

import PopupHeader from '../../../../../../PopupHeader'
import { PopupContainer } from '../../../../../../PopupHeader/styles'
import CardItem from '../Item'
import { getRegionsOptions, getRegionsOptionsXlsx } from '../services'
import type { Regiontype } from '../types'
import { FunctionProps } from '../types'

const CardContent = (props: FunctionProps) => {
  const { nodeDatum, hierarchyId, hierarchyElementId } = props
  const { attributes } = nodeDatum

  const [regions, setRegions] = useState<Regiontype[]>([])
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: true,
  })
  const [loading, setLoading] = useState(true)

  const getList = useCallback(async () => {
    if (!hierarchyId) return

    setLoading(true)

    try {
      const resp = await getRegionsOptions(
        hierarchyId,
        search,
        pagination.page,
        hierarchyElementId,
        attributes.hierarchies_user?.user.id,
      )
      setRegions((prev) =>
        pagination.page === 1 ? [...resp.data] : [...prev, ...resp.data],
      )
      setPagination((prev) => ({
        ...prev,
        lastPage: !resp.pagination.has_next_page,
      }))
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [
    hierarchyId,
    search,
    pagination.page,
    hierarchyElementId,
    attributes.hierarchies_user?.user.id,
  ])

  useEffect(() => {
    getList()
  }, [getList])

  const downloadRegionData = useCallback(async () => {
    if (!hierarchyId) return

    setLoading(true)

    try {
      await getRegionsOptionsXlsx(
        hierarchyId,
        search,
        hierarchyElementId,
        attributes.hierarchies_user?.user.id,
      )
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [
    hierarchyId,
    search,
    hierarchyElementId,
    attributes.hierarchies_user?.user.id,
  ])

  const onScrollEnd = () => {
    setPagination((prev) =>
      prev.lastPage ? prev : { page: prev.page + 1, lastPage: true },
    )
  }

  return (
    <PopupContainer>
      <MwScrollContainer
        loading={loading}
        onScrollEnd={onScrollEnd}
        before={
          <PopupHeader
            title='Lista de Áreas'
            name={nodeDatum.name}
            search={[search, setSearch]}
            setPagination={setPagination}
            menu={{
              options: [
                {
                  label: (
                    <MwEllipsisContainer>Extrair Dados</MwEllipsisContainer>
                  ),
                  data: {},
                  onClick: () => downloadRegionData(),
                },
              ],
            }}
          />
        }
      >
        {regions.map((region) => (
          <CardItem key={region.id} region={region} />
        ))}
      </MwScrollContainer>
    </PopupContainer>
  )
}

export default CardContent
