import { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  FiltersInterfaces,
  MwManager,
  SortState,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { cloneDeep } from 'lodash'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../../../../components/ManagerCounter'
import Modal from '../../../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../components/Toaster'
import { BodyInterface } from '../../interfaces'

import filters from './filters'
import header from './header'
import { extractUsers, onActivate, getUsers as request } from './services'

const ScheduledActivation = (props: {
  search: string
  sort: SortState | null
  appliedFilters: FiltersInterfaces.AppliedFilter[]
  onClose: () => void
  onReload: () => void
}) => {
  const { onClose, onReload } = props
  const [checked, setChecked] = useState<BodyInterface[]>([])
  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState(props.search)
  // estado controlador da ordenação
  const [sort, setSort] = useState(cloneDeep(props.sort))
  // estado controlador dos filtros aplicados
  const [appliedFilters, setAppliedFilters] = useState(
    cloneDeep(props.appliedFilters).filter((e) => e.name !== 'status'),
  )

  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      // fazendo requisição dos dados
      const responseData = await request(appliedFilters, search, sort, page)

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? results : (prev) => [...prev, ...results])
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [appliedFilters, search, sort, page])

  // essa função sera executada quando clicar no botao refresh da barra de ferramentas
  const reload = () => {
    page === 1 ? loadData() : setPage(1)
  }

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickExtractData = async () => {
    setLoading(true)
    try {
      await extractUsers(
        appliedFilters,
        search,
        sort,
        page,
        body.map((item) => item.id),
      )
      toast(<ToasterContent color='normal' />, SuccessStyle)
    } catch {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Extrair Dados',
      onClick: onClickExtractData,
      rules: [],
    },
  ]

  return (
    <Modal.Modal open style={{ width: '1095px', height: '607px' }}>
      <Modal.Header color='blue'>Ativação em Massa do Usuário</Modal.Header>
      <Modal.Body>
        <Toolbar
          filters={{ filters, setAppliedFilters, appliedFilters }}
          search={{ search, setSearch }}
          loading={loading}
          reloader={reload}
          pagination={{ setPage, isLastPage, paginator }}
        >
          <Dropdown
            items={dropdownItems}
            loading={loading}
            axis='y'
            centerCoodinates={{ y: 100 }}
          />
        </Toolbar>

        <MwManager
          columns={header}
          rows={body}
          sort={{ sort, setSort }}
          checkeds={{ checkeds: checked, setCheckeds: setChecked }}
          hasFilters={appliedFilters.length > 0 || search.length > 0}
          loading={loading}
          paginator={paginator}
          page={page}
          setPage={setPage}
        />

        <ManagerCounter partial={body.length} total={totalRegistries} />
      </Modal.Body>
      <Modal.Footer>
        <MwButton appearance='borderless' onClick={onClose}>
          Cancelar
        </MwButton>

        <MwButton
          disabled={checked.length === 0}
          loading={loading}
          onClick={async () => {
            setLoading(true)
            try {
              await onActivate(checked.map((item) => item.id))
              onReload()
              onClose()
            } catch (e) {
              console.error(e)
              toast(<ToasterContent color='error' message={ErrorStyle} />)
              setLoading(false)
            }
          }}
        >
          Ativar
        </MwButton>
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default ScheduledActivation
