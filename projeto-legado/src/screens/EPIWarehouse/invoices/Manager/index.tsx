import { MwManager, Toolbar } from "@mw-kit/mw-manager"
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button } from 'semantic-ui-react'
import { ModalState } from '../../../../components/MwModal'
import { TabComponent } from '../types'
import * as Modals from './components/Modals'
import MonthPicker from './components/MonthPicker'
import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { getEPIWarehouse as request } from './services'

const InvoicesManager: TabComponent = (props) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [body, setBody] = useState<BodyInterface[]>([])
  const [filteredBody, setFilteredBody] = useState<BodyInterface[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  const [modal, setModal] = useState<ModalState>(null)
  const [month, setMonth] = useState<Date>(new Date())
  const isFetchingRef = useRef(false)

const loadData = useCallback(async () => {
  if (isFetchingRef.current) return
  isFetchingRef.current = true
  setLoading(true)

  try {
    const contain = 'EpiType'
    const selectedMonth = month.getMonth()
    const selectedYear = month.getFullYear()
    const startDate = new Date(selectedYear, selectedMonth, 1).toISOString().split('T')[0]
    const endDate = new Date(selectedYear, selectedMonth + 1, 0).toISOString().split('T')[0]

    const params = { contain, date: [startDate, endDate] }

    const responseData = await request(
      appliedFilters,
      search,
      contain,
      sort,
      page,
      params
    )

    const { has_next_page = false, count: total_registries = 0 } = responseData.pagination || {}
    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    const results: BodyInterface[] = responseData.data || []

    setBody((prev) => page === 1 ? results : [...prev, ...results])
    setFilteredBody((prev) => page === 1 ? results : [...prev, ...results])

  } catch (error) {
    console.error('Erro ao carregar dados:', error)
  } finally {
    setLoading(false)
    isFetchingRef.current = false
  }
}, [appliedFilters, search, sort, page, month])

  useEffect(() => {
    loadData()
  }, [loadData])

  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  const paginator = () => {
    if (!isLastPage && !loading) {
      setPage((prev) => prev + 1)
    }
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => [
    {
      content: 'Editar',
      onClick: () =>
        setModal(
          <Modals.Create
            close={() => setModal(null)}
            reload={() => reload()}
            data={item}
          />
        ),
      rules: [],
    },
    {
      content: 'Remover',
      onClick: () =>
        setModal(
          <Modals.DeleteNote
            close={() => setModal(null)}
            reload={() => reload()}
            data={item}
          />
        ),
      rules: [],
    },
    {
      content: 'Histórico de Baixa',
      onClick: () =>
        setModal(
          <Modals.History
            close={() => setModal(null)}
            data={item}
          />
        ),
      rules: [],
    },
  ]

  return (
    <>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
        after={
          <MonthPicker
            onApply={(monthIndex, year) => {
              const selected = new Date(year, monthIndex, 1)
              setMonth(selected)
              setPage(1)
            }}
          />
        }
      >
        <Button
          primary
          size='tiny'
          content='Cadastrar'
          onClick={() =>
            setModal(
              <Modals.Create
                close={() => setModal(null)}
                reload={() => reload()}
              />
            )
          }
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={filteredBody}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        getItemMenu={getItemMenu}
      />

      {modal}
    </>
  )
}

export default InvoicesManager
