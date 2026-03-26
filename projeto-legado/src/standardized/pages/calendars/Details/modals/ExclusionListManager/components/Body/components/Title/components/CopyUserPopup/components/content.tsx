import { useCallback, useEffect, useState } from 'react'

import {
  MwButton,
  MwEllipsisContainer,
  MwIcon,
  MwInput,
  MwScrollContainer,
} from '@mw-kit/mw-ui'

import { numberOrDefault } from '../../../../../../../../../../../../../utils/Formatters'
import Popup from '../../../../../../../../../../../../components/Popup'
import type { PaginationObjType } from '../../../../../../../../../../../../services/parsers/pagination'
import { Search } from '../../../../../../../../../components'
import { PopupContainer } from '../../../../../../../../../components/Grid/components/Card/components/InpactedUsersPopup/components/PopupHeader/styles'
import { getUserEventOptions } from '../../../../../../../../../components/Grid/services'
import type { UserOptions } from '../../../../../../../../../components/Grid/types'
import { useMainContext } from '../../../../../../../../../contexts'
import { formatInterval } from '../../../../../../../../../functions'
import tabs from '../../../../../../../../../tabs'
import { getCard } from '../../../../../../../../Form/services'
import { NotificationContainer } from '../../../../../../../../Form/steps/EventsStep/Right/components/popups/CopyEvents/styles'
import type { Events } from '../../../../../../../../Form/types'
import useExclusionListManagerContext from '../../../../../../../context'

import {
  AfterItems,
  CopyWrapper,
  Header,
  ListItem,
  ListOptions,
  ListOptionsEmpty,
  MethodOptions,
} from './styles'

export const Component = () => {
  const {
    card,
    eventsList: [, setEventList],
    selected: [, setSelected],
    original,
  } = useExclusionListManagerContext()
  const {
    tab: [tab],
  } = useMainContext()

  const [search, setSearch] = useState('')
  const [pagination, setPagination] = useState<PaginationObjType>({
    page: 1,
    total: 1,
    last_page: true,
  })
  const [loading, setLoading] = useState(true)
  const [method, setMethod] = useState<'overwrite' | 'join'>('overwrite')
  const [selectedOption, setSelectedOption] = useState<UserOptions>()
  const [options, setOptions] = useState<UserOptions[]>([])

  const onScrollEnd = () => {
    setPagination((prev) =>
      prev.last_page ? prev : { ...prev, page: prev.page + 1, last_page: true },
    )
  }

  const getData = useCallback(async () => {
    if (!card.id) return
    setLoading(true)
    try {
      const { data, paginationObj } = await getUserEventOptions(
        tabs[tab].types.join(','),
        card.id,
        search,
        pagination.page,
      )
      setPagination(paginationObj)
      setOptions(pagination.page === 1 ? data : (prev) => [...prev, ...data])
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [card.id, tab, search, pagination.page])

  const copyItems = async () => {
    if (!selectedOption) return
    setLoading(true)
    const response = (await getCard(selectedOption.id, 'out', tab)) as Events[]

    if (!response) return
    const usersReduced: Events['users'] = []
    const teamsReduced: Events['teams'] = []
    for (const item of response) {
      usersReduced.push(
        ...(item.users || []).reduce<Events['users']>((users, e) => {
          const id = numberOrDefault(e.id)
          if (!id) return users

          const originalUser = (original?.users || []).find((y) => id === y.id)
          const user = {
            ...(originalUser || e),
            id,
          }

          users.push(user)
          return users
        }, []),
      )
      teamsReduced.push(
        ...(item.teams || []).reduce<Events['teams']>((teams, e) => {
          const id = numberOrDefault(e.id)
          if (!id) return teams

          const originalTeam = (original?.teams || []).find((y) => id === y.id)
          const team = {
            ...(originalTeam || e),
            id,
          }
          teams.push(team)
          return teams
        }, []),
      )
    }

    setSelected((prev) => {
      if (prev === null) return prev
      let updatedEvent = prev
      if (method === 'overwrite') {
        updatedEvent = {
          ...prev,
          users: usersReduced,
          teams: teamsReduced,
        }
      } else {
        const users = usersReduced.filter((x) => {
          return !prev.users.some((y) => x.id === y.id)
        })
        const teams = teamsReduced.filter((x) => {
          return !prev.teams.some((y) => x.id === y.id)
        })

        updatedEvent = {
          ...prev,
          users: [...prev.users, ...users],
          teams: [...prev.teams, ...teams],
        }
      }

      setEventList((prevEL) => {
        const newList = prevEL.map((el) => {
          if (el.id === prev.id) {
            return updatedEvent
          }
          return el
        })

        return newList
      })

      return updatedEvent
    })
    setLoading(false)
  }

  const dateLabel = (item: UserOptions) => {
    const date = formatInterval(item.starts_at, item.ends_at)
    return `${item.id} - ${item.name}, ${date}`
  }

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <PopupContainer style={{ width: 330, minHeight: 340 }}>
      <MwScrollContainer
        loading={loading}
        onScrollEnd={onScrollEnd}
        before={
          <Header>
            <h1>Defina um Evento para copiar a lista</h1>
            <Search
              value={[
                search,
                (v) => {
                  setSearch(v)
                  setPagination({
                    page: 1,
                    last_page: true,
                    total: 0,
                  })
                },
              ]}
            />
          </Header>
        }
        after={
          <AfterItems>
            <MethodOptions>
              Método*:
              <MwInput
                type='radio'
                label='Substituir'
                checked={method === 'overwrite'}
                onChange={() => setMethod('overwrite')}
              />
              <MwInput
                type='radio'
                label='Mesclar'
                checked={method === 'join'}
                onChange={() => setMethod('join')}
              />
              <Popup
                on='click'
                position='left center'
                content={
                  <NotificationContainer>
                    <div>
                      <b>Metodos</b>
                    </div>
                    <ul>
                      <li>
                        <b>Substituir:</b> Irá substituir a lista de exclusão
                        atual.
                      </li>
                      <li>
                        <b>Mesclar:</b> Irá somar com a lista de exclusão atual.
                      </li>
                    </ul>
                  </NotificationContainer>
                }
                trigger={
                  <MwIcon
                    type='feather'
                    icon='info'
                    width='12px'
                    height='12px'
                    color='darkBlue'
                  />
                }
                inverted
                style={{ padding: 0 }}
              />
            </MethodOptions>
            <CopyWrapper>
              <MwButton
                disabled={loading || selectedOption === undefined}
                onClick={() => copyItems()}
              >
                Copiar
              </MwButton>
            </CopyWrapper>
          </AfterItems>
        }
      >
        {options.length === 0 ? (
          <ListOptionsEmpty>
            <span>
              {search
                ? 'Não há resultados para a pesquisa'
                : 'Não há listas para copiar'}
            </span>
          </ListOptionsEmpty>
        ) : (
          <ListOptions>
            {options.map((item) => (
              <ListItem key={item.id}>
                <MwInput
                  type='radio'
                  checked={selectedOption && selectedOption.id === item.id}
                  onClick={() => setSelectedOption(item)}
                  onChange={() => {}}
                  label={
                    <MwEllipsisContainer style={{ width: '35ch' }}>
                      {dateLabel(item)}
                    </MwEllipsisContainer>
                  }
                />
              </ListItem>
            ))}
          </ListOptions>
        )}
      </MwScrollContainer>
    </PopupContainer>
  )
}
