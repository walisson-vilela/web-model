import { useState } from 'react'

import { FiltersInterfaces, SortState, Toolbar } from '@mw-kit/mw-manager'

import { ModalState } from '../../../components/MwModal'
import { ManagerProps } from '../../../screens/interfaces'
import { isNumber } from '../../Validators'

type ManagerPropsFunction = (index: number) => ManagerProps

export interface ManagerPropsPersist {
  search: string[]
  sort: SortState[]
  appliedFilters: FiltersInterfaces.AppliedFilter[][]
  date: Date[]
  dateInterval: [string, string][]
}

interface UseManagerPropsReturn {
  managerProps: ManagerPropsPersist
  getManagerProps: ManagerPropsFunction
}

const useManagerProps = (
  props: ManagerPropsPersist | number,
): UseManagerPropsReturn => {
  const defaultValues: ManagerPropsPersist =
    !isNumber(props) && props
      ? props
      : {
          search: Array(props)
            .fill(1)
            .map(() => ''),
          sort: Array(props)
            .fill(1)
            .map(() => null),
          appliedFilters: Array(props)
            .fill(1)
            .map(() => []),
          date: Array(props)
            .fill(1)
            .map(() => new Date()),
          dateInterval: Array(props)
            .fill(1)
            .map(() => Toolbar.useDefaultDateIntervalState()),
        }

  // estado controlador do valor do input de pesquisa
  const [search, _setSearch] = useState<string[]>(defaultValues.search)
  // estado controlador da ordenação
  const [sort, _setSort] = useState<SortState[]>(defaultValues.sort)
  // estado controlador dos filtros aplicados
  const [appliedFilters, _setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[][]
  >(defaultValues.appliedFilters)
  // estado controlador dos filtros aplicados
  const [date, _setDate] = useState<Date[]>(defaultValues.date)
  // estado controlador dos filtros aplicados
  const [dateInterval, _setDateInterval] = useState<[string, string][]>(
    defaultValues.dateInterval,
  )
  const [modal, setModal] = useState<ModalState>(null)
  const setState =
    (index: number, state: React.SetStateAction<any>) => (prevState) => {
      const aux = [...prevState]

      aux[index] = typeof state === 'function' ? state(aux[index]) : state

      return aux
    }

  const setSearch = (index: number, state: React.SetStateAction<string>) => {
    _setSearch(setState(index, state))
  }

  const setSort = (index: number, state: React.SetStateAction<SortState>) => {
    _setSort(setState(index, state))
  }

  const setAppliedFilters = (
    index: number,
    state: React.SetStateAction<FiltersInterfaces.AppliedFilter[]>,
  ) => {
    _setAppliedFilters(setState(index, state))
  }

  const setDate = (index: number, state: React.SetStateAction<Date>) => {
    _setDate(setState(index, state))
  }

  const setDateInterval = (
    index: number,
    state: React.SetStateAction<[string, string]>,
  ) => {
    _setDateInterval(setState(index, state))
  }

  return {
    managerProps: {
      search,
      sort,
      appliedFilters,
      date,
      dateInterval,
    },
    getManagerProps: (index: number): ManagerProps => ({
      search: {
        search: search[index],
        setSearch: (arg: React.SetStateAction<string>) => setSearch(index, arg),
      },
      sort: {
        sort: sort[index],
        setSort: (arg: React.SetStateAction<SortState>) => setSort(index, arg),
      },
      appliedFilters: {
        appliedFilters: appliedFilters[index],
        setAppliedFilters: (
          arg: React.SetStateAction<FiltersInterfaces.AppliedFilter[]>,
        ) => setAppliedFilters(index, arg),
      },
      date: {
        date: date[index],
        setDate: (arg: React.SetStateAction<Date>) => setDate(index, arg),
      },
      dateInterval: {
        dateInterval: dateInterval[index],
        setDateInterval: (arg: React.SetStateAction<[string, string]>) =>
          setDateInterval(index, arg),
      },
      modal: [modal, setModal],
    }),
  }
}

export default useManagerProps
