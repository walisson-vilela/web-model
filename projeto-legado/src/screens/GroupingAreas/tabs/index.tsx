import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { Button } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../components/ManagerCounter'
import MWModal, { ModalState } from '../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../components/Toaster'
import * as Modals from '../Modals'
import { ExtManagerProps } from '../interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractGroupings, listGroupings } from './services'

const Comercial = (props: ExtManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
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
  // estado controlador dos itens checados
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  const [modal, setModal] = useState<ModalState | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados
      const responseData = await listGroupings({
        appliedFilters,
        search,
        sort,
        page,
        hierarchy_id: props.hierarchy_id,
      })

      // setando dados sobre a paginação
      const { has_next_page = false, count: total_registries = 0 } =
        responseData.pagination || {}

      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // pegando os resultados da requisição
      const results = responseData.data || []

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setData(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
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

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(parseData(data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickManager = (item: BodyInterface) => {
    setModal(
      <Modals.ManageGrouping
        close={() => setModal(null)}
        reload={reload}
        data={item}
      />,
    )
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => [
    {
      content: 'Editar',
      onClick: () => {
        setModal(
          <Modals.Create
            data={item}
            reload={reload}
            close={() => setModal(null)}
            hierarchy_id={props.hierarchy_id}
          />,
        )
      },
      rules: [],
    },
    {
      content: 'Gerenciar Agrupamento',
      onClick: () => onClickManager(item),
      rules: [],
      border: true,
    },
  ]

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => !checked.status)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Active
        items={toUpdate}
        reload={reload}
        close={() => setModal(null)}
      />,
    )
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.status)

    if (toUpdate.length === 0) return

    setModal(
      <Modals.Inactive
        items={toUpdate}
        reload={reload}
        close={() => setModal(null)}
      />,
    )
  }

  const onClickDelete = () => {
    if (checkeds.length === 0) return

    setModal(
      <Modals.Delete
        items={checkeds}
        reload={reload}
        close={() => setModal(null)}
      />,
    )
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      await extractGroupings({
        appliedFilters,
        search,
        sort,
        page,
        hierarchy_id: props.hierarchy_id,
      })
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.length > 0
    },
    message: 'Para realizar a ação, selecione pelo menos um agrupamento',
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.filter((checked) => !checked.status).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos um agrupamento inativo.',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => checkeds.filter((checked) => checked.status).length > 0,
          message:
            'Para realizar a ação é necessário selecionar pelo menos um agrupamento ativo.',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [noneSelectedRule],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      border: true,
      rules: [],
    },
  ]

  return (
    <React.Fragment>
      <Toolbar
        filters={{
          filters: filters(props.hierarchy_id),
          setAppliedFilters,
          appliedFilters,
        }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
        except={{
          paginator: true,
        }}
      >
        <Button
          type='button'
          color='blue'
          size='tiny'
          onClick={() => {
            setModal(
              <Modals.Create
                reload={reload}
                close={() => setModal(null)}
                hierarchy_id={props.hierarchy_id}
              />,
            )
          }}
          content='Novo Agrupamento'
        />
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
        hasFilters
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <MWModal modal={modal} />
    </React.Fragment>
  )
}

export default Comercial
