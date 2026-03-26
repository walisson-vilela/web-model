import { useCallback, useEffect, useState } from 'react'

import { MwEllipsisContainer, MwInput, MwScrollContainer } from '@mw-kit/mw-ui'

import useTeamsContext from '../../../../../../../context'
import { getNodesByParentId, getNodesXlsx } from '../../../../../../../services'
import type { CardNodeDatum, NodeType } from '../../../../../../../types'
import PopupHeader from '../../../../../../PopupHeader'
import { PopupContainer } from '../../../../../../PopupHeader/styles'
import CardContentItem from '../Item'

const CardContent = ({ nodeDatum }: { nodeDatum: CardNodeDatum }) => {
  const {
    hierarchy: [hierarchy],
    resetDecisions,
  } = useTeamsContext()
  const { attributes } = nodeDatum

  const [checked, setChecked] = useState<NodeType[]>([])
  const [nodes, setNodes] = useState<NodeType[]>([])
  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: true,
  })
  const [loading, setLoading] = useState(true)

  const getList = useCallback(async () => {
    if (!attributes.parent_id || !hierarchy?.id) return

    setLoading(true)

    try {
      const response = await getNodesByParentId({
        hierarchy_id: hierarchy.id,
        parent_id: attributes.parent_id,
        search,
        page: pagination.page,
      })
      setNodes((prev) =>
        pagination.page === 1 ? response.data : [...prev, ...response.data],
      )
      setPagination((prev) => ({
        ...prev,
        lastPage: !response.pagination.has_next_page,
      }))
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [attributes.parent_id, hierarchy?.id, pagination.page, search])

  const downloadNodesXlsx = useCallback(async () => {
    if (!attributes.parent_id || !hierarchy?.id) return

    setLoading(true)

    try {
      await getNodesXlsx({
        hierarchy_id: hierarchy.id,
        parent_id: attributes.parent_id,
        search,
      })
    } catch (error) {
      console.error(error)
    }

    setLoading(false)
  }, [attributes.parent_id, hierarchy?.id, pagination.page, search])

  useEffect(() => {
    getList()
  }, [getList])

  const onScrollEnd = () => {
    setPagination((prev) =>
      prev.lastPage
        ? prev
        : {
            page: prev.page + 1,
            lastPage: true,
          },
    )
  }

  return (
    <PopupContainer>
      <MwScrollContainer
        loading={loading}
        onScrollEnd={onScrollEnd}
        before={
          <PopupHeader
            title='Lista de Executores'
            name={attributes.superior_name || 'Indefinido'}
            search={[search, setSearch]}
            setPagination={setPagination}
            menu={{
              options: [
                {
                  label: (
                    <MwEllipsisContainer>
                      Resetar Decisões <br />
                      Manuais
                    </MwEllipsisContainer>
                  ),
                  data: {},
                  onClick: () => {
                    const ids = checked.reduce<number[]>((ids, e) => {
                      if (!e.hierarchies_user) return ids
                      if (
                        !e.hierarchies_user.manual &&
                        !e.hierarchies_user.approval_count
                      ) {
                        return ids
                      }
                      return [...ids, e.hierarchies_user.user.id]
                    }, [])
                    if (ids.length < 1) return
                    resetDecisions({
                      user_ids: ids,
                    })
                  },
                  rules: [
                    () => {
                      return checked.some(
                        (e) =>
                          e.hierarchies_user?.manual ||
                          e.hierarchies_user?.approval_count,
                      )
                        ? true
                        : {
                            on: 'hover',
                            content:
                              'Para realizar a ação é necessário selecionar pelo menos 1 usuário com decisões manuais',
                          }
                    },
                  ],
                },
                {
                  label: (
                    <MwEllipsisContainer>Extrair Dados</MwEllipsisContainer>
                  ),
                  data: {},
                  onClick: () => downloadNodesXlsx(),
                },
              ],
            }}
            children={
              <MwInput
                type='checkbox'
                label={`Selecionados (${checked.length})`}
                checked={checked.length > 0 && checked.length === nodes.length}
                onChange={(e) => setChecked(e.target.checked ? [...nodes] : [])}
              />
            }
          />
        }
      >
        {nodes.map((node) => (
          <CardContentItem
            key={`${node.id || 0}${node.parent_id}`}
            node={node}
            checked={[checked, setChecked]}
          />
        ))}
      </MwScrollContainer>
    </PopupContainer>
  )
}

export default CardContent
