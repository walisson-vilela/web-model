import React, { useCallback, useEffect, useState } from 'react'

import { MwButton, MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'
import { AppliedFilter, Filter } from '@mw-kit/mw-ui/types'
import toast from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import Bullet from '../../../../../../../components/Bullet'
import GridSelector from '../../../../../../../components/GridSelector'
import { Rows } from '../../../../../../../components/GridSelector/interfaces'
import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import {
  classifications,
  flags,
  teams,
  typologies,
} from '../../../../../../../services/options'
import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { Recipients } from '../../../interfaces'
import { RowProps, TableInterface } from '../interfaces'
import { getPeoples, getStores } from '../services'
import * as S from '../styles'

import { statusLabels } from './labels'

const services: {
  [key in TableInterface['recipientType']]: typeof getPeoples
} = {
  P: getPeoples,
  S: getStores,
} as const

const UsersList = (props: {
  selected: [Recipients[], React.Dispatch<React.SetStateAction<Recipients[]>>]
  recipientType: 'P' | 'S'
}) => {
  const {
    selected: [selected, setSelected],
    recipientType,
  } = props

  const [rows, setRows] = useState<Rows<RowProps>>([])
  const [checked, setChecked] = useState<RowProps[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState<number>(1)
  const [lastPage, setLastPage] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilter[]>([])

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      if (appliedFilters.length !== 0) {
        setPage(1)
      }

      const response = await services[recipientType](
        search,
        appliedFilters.length !== 0 ? 1 : page,
        appliedFilters,
      )

      setLastPage(!response.pagination.has_next_page)

      const parsedData = response.data.map((e) => {
        const data = {
          id: numberOrDefault(e.id),
          name: notEmptyStringOrDefault(e.name),
          subtitle: notEmptyStringOrDefault(e.subtitle),
          formatted_address: notEmptyStringOrDefault(e.formatted_address),
        }

        const disabled =
          selected.length !== 0 && selected.some((e) => e.id === data.id)

        return {
          data,
          disabled,
          content: (
            <S.ContentContainer>
              <MwEllipsisContainer
                children={
                  recipientType === 'P' ? (
                    <S.Row>
                      <span>{data.name}</span>
                      <small>{data.subtitle}</small>
                    </S.Row>
                  ) : (
                    <Popup
                      on='hover'
                      className='popup-field'
                      position='right center'
                      closeOnDocumentClick={false}
                      offset={[0, 0]}
                      content={data.formatted_address}
                      inverted
                      trigger={
                        <S.Row>
                          <span>{data.name}</span>
                          <small>{data.subtitle}</small>
                        </S.Row>
                      }
                    />
                  )
                }
              />
              {disabled && (
                <MwIcon
                  type='feather'
                  icon='check'
                  width='14px'
                  height='14px'
                  color='black'
                />
              )}
            </S.ContentContainer>
          ),
        }
      })

      setRows(parsedData)
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [page, search, selected, appliedFilters])

  const onSubmit = () => {
    setSelected((prev) => {
      const newState = [...prev].reduce((prev, e) => {
        return { ...prev, [e.id]: e }
      }, {} as { [key: Recipients['id']]: Recipients })

      checked.forEach((e) => {
        newState[e.id] = e
      })

      return Object.keys(newState).map((k) => newState[k])
    })
    setChecked([])
  }

  useEffect(() => {
    loadData()
  }, [loadData])

  const teamsLoader = useCallback(
    async (value: string | number | boolean, page: number) => {
      return await teams(value.toString(), page, 'mw-ui')
    },
    [],
  )

  const flagLoader = useCallback(
    async (value: string | number | boolean, page: number) => {
      return await flags(value.toString(), page, 'mw-ui')
    },
    [],
  )

  const typologiesLoader = useCallback(
    async (value: string | number | boolean, page: number) => {
      return await typologies(value.toString(), page, 'mw-ui')
    },
    [],
  )

  const classificationsLoader = useCallback(
    async (value: string | number | boolean, page: number) => {
      return await classifications(value.toString(), page, 'mw-ui')
    },
    [],
  )

  const filters: Filter[] =
    recipientType === 'P'
      ? [
          {
            name: 'hierarchy_element_id',
            label: 'Equipes',
            options: teamsLoader,
            allowEmptySearch: true,
          },
        ]
      : [
          {
            label: 'Status',
            name: 'active',
            options: Object.keys(statusLabels)
              .reverse()
              .map((key) => {
                const { name, color } = { ...statusLabels[key] }

                const option = {
                  label: {
                    text: '',
                    element: <Bullet content={name} color={color} />,
                  },
                  value: key,
                }

                return option
              }),
          },
          {
            name: 'market_flag_id',
            label: 'Bandeira',
            options: flagLoader,
            allowEmptySearch: true,
          },
          {
            name: 'typology_id',
            label: 'Tipologia',
            options: typologiesLoader,
            allowEmptySearch: true,
          },
          {
            label: 'Classificação',
            name: 'classification_id',
            options: classificationsLoader,
            allowEmptySearch: true,
          },
        ]

  return (
    <>
      <div>
        <GridSelector
          {...{
            rows,
            pagination: {
              page: [page, setPage],
              lastPage,
            },
            checked: [checked, setChecked],
            loading,
            messages: {
              empty: search.length
                ? 'Nenhum PDV encontrado para a busca realizada'
                : 'Nenhum PDV encontrado',
            },
            toolbar: {
              checkAll: true,
              search: {
                collapse: true,
                submitted: [search, setSearch],
              },
              filters: {
                items: filters,
                setAppliedFilters,
                containerProps: {
                  position: 'right bottom',
                },
              },
              appliedFilters: {
                appliedFilters: [appliedFilters, setAppliedFilters],
                containerProps: {
                  position: 'right bottom',
                },
              },
            },
          }}
        />
      </div>
      <div>
        <MwButton
          type='button'
          content='Adicionar'
          onClick={onSubmit}
          disabled={checked.length === 0}
        />
      </div>
    </>
  )
}

export default UsersList
