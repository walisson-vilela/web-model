import { useCallback, useEffect, useState } from 'react'

import { MwEllipsisContainer, MwScrollContainer } from '@mw-kit/mw-ui'

import { generateKey } from '../../../../../../../../../../../../utils/Generate'
import { getUserEvent, getUserEventXlsx } from '../../../../../../services'
import type { Card, UserEvents } from '../../../../../../types'
import PopupHeader from '../PopupHeader'

import { CardContentItem } from './component/CardContentItem'
import { PopupContainer } from './styles'

export const InpactedUsersPopupContent = ({ data }: { data: Card }) => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState<UserEvents[]>([])
  const [pagination, setPagination] = useState({
    page: 1,
    lastPage: true,
  })
  const [loading, setLoading] = useState(true)

  const getUsersFunc = useCallback(async () => {
    setLoading(true)
    try {
      const response = await getUserEvent(
        'in',
        data.id,
        pagination.page,
        search,
      )
      setUsers((prev) => {
        if (response.pagination.page === 1) {
          return response.data
        }
        return [...prev, ...response.data]
      })
      setPagination({
        page: response.pagination.page,
        lastPage: !response.pagination.has_next_page,
      })
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [data.id, pagination.page, search])

  useEffect(() => {
    getUsersFunc()
  }, [getUsersFunc])

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
            title='Usuários Impactados'
            name={data.name}
            search={[search, setSearch]}
            setPagination={setPagination}
            menu={{
              options: [
                {
                  label: (
                    <MwEllipsisContainer>Extrair Dados</MwEllipsisContainer>
                  ),
                  data: {},
                  onClick: () =>
                    getUserEventXlsx('in', data.id, pagination.page, search),
                },
              ],
            }}
          />
        }
      >
        {users.map((user, index) => (
          <CardContentItem user={user} key={generateKey(index)} />
        ))}
      </MwScrollContainer>
    </PopupContainer>
  )
}
