import React, { useCallback, useEffect, useState } from 'react'

import { MwScrollContainer } from '@mw-kit/mw-ui'

import { getBirthdayPeople } from '../services'
import * as T from '../types'

import * as C from './components'
import * as S from './styles'

type PopupProps = { open: boolean; start: moment.Moment; end: moment.Moment }

const Content = (props: Pick<PopupProps, 'start' | 'end'>) => {
  const [people, setPeople] = useState<T.Person[]>([])
  const [pagination, setPagination] = useState<T.Pagination>({
    page: 1,
    last: true,
    total: 0,
  })
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const { start, end } = props

  const loadPeople = useCallback(async () => {
    setLoading(true)

    try {
      const response = await getBirthdayPeople(
        pagination.page,
        search,
        start,
        end,
      )
      setPeople(
        pagination.page === 1
          ? [...response.people]
          : (prev) => [...prev, ...response.people],
      )
      setPagination({ ...response.pagination })
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [pagination.page, search])

  useEffect(() => {
    loadPeople()
  }, [loadPeople])

  const onScrollEnd = () => {
    setPagination((prev) => {
      return prev.last ? prev : { ...prev, page: prev.page + 1 }
    })
  }

  return (
    <React.Fragment>
      <S.Header>
        <div>
          <div>Aniversariantes</div>

          <div>
            Período: <b>{start.format('DD MMM')}</b> à{' '}
            <b>{end.format('DD MMM')}</b>
          </div>
        </div>

        <C.Search search={[search, setSearch]} />
      </S.Header>

      <MwScrollContainer
        loading={loading}
        onScrollEnd={onScrollEnd}
        spacing={{ left: 's1' }}
        empty={{
          empty: people.length === 0,
          content: (
            <S.EmptyMessage children='Não há mais aniversariantes neste mês' />
          ),
        }}
      >
        {people.map((person, key) => {
          return <C.Row key={key} person={person} />
        })}
      </MwScrollContainer>
    </React.Fragment>
  )
}

const Popup = (props: PopupProps) => {
  const { start, end } = props
  return (
    <S.Container
      open={props.open}
      height='270px'
      position='right bottom'
      references={{ left: '53px' }}
      content={() => <Content start={start} end={end} />}
    />
  )
}

export default Popup
