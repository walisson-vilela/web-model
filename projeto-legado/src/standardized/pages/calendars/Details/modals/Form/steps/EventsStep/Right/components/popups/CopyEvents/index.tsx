import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwIcon, MwInput, MwScrollContainer } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../../../../components/Toaster'
import Popup from '../../../../../../../../../../../components/Popup'
import Search from '../../../../../../../../../../../components/Search'
import { useMainContext } from '../../../../../../../../contexts'
import tabs from '../../../../../../../../tabs'
import useFormContext from '../../../../../../context'
import { sortEvents } from '../../../../../../functions'
import { getCard } from '../../../../../../services'
import type { Value } from '../../../../../../types'

import { getUserCopyEvents } from './services'
import * as S from './styles'
import type { CopyEvent } from './types'

const Content = (props: { close: () => void }) => {
  const { close } = props

  const {
    tab: [tab],
  } = useMainContext()

  const {
    card_id,
    value: [, setValue],
    loading: [, setFormLoading],
  } = useFormContext()

  const [search, setSearch] = useState<string>('')
  const [checked, setChecked] = useState<number | null>(null)
  const [data, setData] = useState<CopyEvent[]>([])
  const [pagination, setPagination] = useState<{
    page: number
    last_page: boolean
    total: number
  }>({
    page: 1,
    last_page: true,
    total: 0,
  })
  const [loading, setLoading] = useState<boolean>(true)

  const loader = useCallback(async () => {
    setLoading(true)

    try {
      const { data, paginationData } = await getUserCopyEvents(
        '',
        tabs[tab].types.join(),
        card_id,
        search,
        pagination.page,
      )

      setData(paginationData.page === 1 ? data : (prev) => [...prev, ...data])
      setPagination(paginationData)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [pagination.page, card_id, search, tab])

  useEffect(() => {
    loader()
  }, [loader])

  const onScrollEnd = () => {
    setPagination((prev) =>
      prev.last_page ? prev : { ...prev, page: prev.page + 1 },
    )
  }

  const onSubmit = useCallback(async () => {
    if (!checked) return

    setLoading(true)
    setFormLoading(true)

    try {
      const data = (await getCard(checked, 'in', tab)) as Value

      setValue((prev) => ({
        ...prev,
        events: sortEvents([
          ...prev.events.filter(
            (x) =>
              !data.events.some((y) => y.start === x.start && y.end === x.end),
          ),
          ...data.events,
        ]),
        regions: [
          ...prev.regions.filter(
            (x) => !data.regions.some((y) => y.id === x.id),
          ),
          ...data.regions,
        ],
        cities: [
          ...prev.cities.filter((x) => !data.cities.some((y) => y.id === x.id)),
          ...data.cities,
        ],
        states: [
          ...prev.states.filter((x) => !data.states.some((y) => y.id === x.id)),
          ...data.states,
        ],
        teams: [
          ...prev.teams.filter((x) => !data.teams.some((y) => y.id === x.id)),
          ...data.teams,
        ],
      }))
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
    setLoading(false)
    setFormLoading(false)
    close()
  }, [tab, checked, close, setFormLoading, setValue])

  return (
    <S.ContentContainer>
      <div>
        <div>Criar Evento por Cópia</div>

        <div>
          <Search
            disabled={loading}
            submitted={[
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
        </div>
      </div>

      <MwScrollContainer onScrollEnd={onScrollEnd} loading={loading}>
        {data.map((event) => {
          return (
            <S.RowContainer key={event.id}>
              <MwInput
                type='radio'
                label={`${event.id} - ${event.name}`}
                onChange={(e) => setChecked(e.target.checked ? event.id : null)}
                checked={checked === event.id}
              />
            </S.RowContainer>
          )
        })}
      </MwScrollContainer>

      <div>
        <MwButton
          type='button'
          size='large'
          disabled={checked === null}
          onClick={onSubmit}
        >
          Copiar
        </MwButton>
      </div>
    </S.ContentContainer>
  )
}

const CopyEvents = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <S.ButtonContainer>
      <Popup
        on='click'
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        position='bottom right'
        content={<Content close={() => setOpen(false)} />}
        trigger={<S.Link>Criar Evento por Cópia</S.Link>}
        style={{ padding: 0 }}
      />

      <Popup
        on='click'
        position='bottom right'
        content={
          <S.NotificationContainer>
            <div>Criar Eventos por Cópia </div>
            <ul>
              <li>Copia todas as datas e períodos do Card selecionado. </li>
              <li>Eventos passados ou já iniciados não serão copiados.</li>
            </ul>
          </S.NotificationContainer>
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
    </S.ButtonContainer>
  )
}

export default CopyEvents
