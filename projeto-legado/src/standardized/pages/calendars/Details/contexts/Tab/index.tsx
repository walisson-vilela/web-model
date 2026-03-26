import React, { useCallback, useEffect, useState } from 'react'

import { toast } from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../components/Toaster'
import type { Data } from '../../components/types'
import { getEvents } from '../../services'
import tabs, { type TabKey } from '../../tabs'
import type { HighlightDate, ReactState } from '../../types'
import useMainContext from '../Main'

import { eventParser } from './parsers'

type Context = {
  data: ReactState<Data[]>
  checked: ReactState<Data[]>
  reload: () => Promise<void>
}

const Context = React.createContext<Context>({} as Context)

const useContext = () => React.useContext(Context)

export const Provider: React.FunctionComponent<React.PropsWithChildren<{}>> = (
  props,
) => {
  const {
    tab: [tab],
    appliedFilters: [appliedFilters],
    search: [search],
    year: [year],
    loading: [, setLoading],
    highlightDates: [, setHighlightDates],
  } = useMainContext()

  const { types } = tabs[tab as TabKey]

  const [data, setData] = useState<Data[]>([])
  const [checked, setChecked] = useState<Data[]>([])

  const loader = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getEvents({
        types,
        year,
        appliedFilters,
        search,
      })

      const parsed = eventParser(data)
      setChecked(parsed.map((month) => ({ ...month, cards: [] })))
      setData(parsed)
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [types, appliedFilters, search, year, setLoading])

  useEffect(() => {
    loader()
  }, [loader])

  useEffect(() => {
    const highlightDates = checked.reduce<HighlightDate[]>(
      (highlightDatesAcc, month) => {
        const monthCards = month.cards.reduce<HighlightDate[]>(
          (highlightDates, card) => {
            // main event
            highlightDates.push(
              ...[card.starts_at, card.ends_at].map<HighlightDate>((date) => ({
                date: new Date(date),
              })),
            )

            // children events
            for (const child of card.children) {
              highlightDates.push(
                ...[child.starts_at, child.ends_at].map<HighlightDate>(
                  (date) => ({
                    date: new Date(date),
                  }),
                ),
              )
            }

            return highlightDates
          },
          [],
        )

        highlightDatesAcc.push(...monthCards)
        return highlightDatesAcc
      },
      [],
    )
    setHighlightDates(highlightDates)
  }, [checked, setHighlightDates])

  return (
    <Context.Provider
      value={{
        data: [data, setData],
        checked: [checked, setChecked],
        reload: loader,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default useContext
