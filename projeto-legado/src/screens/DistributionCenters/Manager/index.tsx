import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import toast, { Toaster } from 'react-hot-toast'
import { Button, Modal } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { download } from '../../../utils/DownloadFile'
import { isNumber } from '../../../utils/Validators'
import { ManagerProps } from '../../interfaces'
import CategoriesHistory from '../CategoriesHistory'
import CategoriesManager from '../CategoriesManager'
import { Create } from '../Create'
import StoresManager from '../StoresManager'
import { isOppenedModal } from '../functions'
import { OpenedModal } from '../interfaces'
import * as S from '../styled'

import filters from './filters'
import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import {
  deleteMultiple,
  extractData,
  getDistributionCenters as request,
  toggleStatus,
} from './services'

const Manager = (props: ManagerProps) => {
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
  // estado controlador do modal
  const [modal, setModal] = useState<OpenedModal | JSX.Element | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
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
    setBody(parseData(data, setModal))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickCreate = () => {
    setModal(
      <Modal open>
        <Create
          setOpen={() => setModal(null)}
          editData={null}
          loadData={reload}
        />
      </Modal>,
    )
  }

  const onClickEdit = (item: BodyInterface) => {
    setModal(
      <Modal open>
        <Create
          setOpen={() => setModal(null)}
          editData={{
            id: item.id,
            name: item.name,
            store_id: item.store_id,
            apportionment: item.apportionment,
            active: item.active,
          }}
          loadData={reload}
        />
      </Modal>,
    )
  }

  const onClickManagePDVs = (item: BodyInterface) => {
    setModal(
      <StoresManager
        distribution_center_id={item.id}
        title={
          <React.Fragment>
            Central: <b>{item.name || '-'}</b> - Bandeira:{' '}
            <b>{item.flag_name || '-'}</b> | Cidade/UF:{' '}
            <b>
              {item.city_name || '-'}/{item.state_name || '-'}
            </b>
          </React.Fragment>
        }
        closeModal={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const onClickManageCategories = (item: BodyInterface) => {
    setModal(
      <CategoriesManager
        distribution_center_id={item.id}
        title={
          <React.Fragment>
            Central: <b>{item.name || '-'}</b> - Bandeira:{' '}
            <b>{item.flag_name || '-'}</b> | Cidade/UF:{' '}
            <b>
              {item.city_name || '-'}/{item.state_name || '-'}
            </b>
          </React.Fragment>
        }
        closeModal={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const onClickCategoriesHistory = (item: BodyInterface) => {
    setModal(
      <CategoriesHistory
        distribution_center_id={item.id}
        title={
          <React.Fragment>
            Central: <b>{item.name || '-'}</b> - Bandeira:{' '}
            <b>{item.flag_name || '-'}</b> | Cidade/UF:{' '}
            <b>
              {item.city_name || '-'}/{item.state_name || '-'}
            </b>
          </React.Fragment>
        }
        closeModal={() => setModal(null)}
      />,
    )
  }

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Editar',
        onClick: () => onClickEdit(item),
        rules: [],
      },
      {
        content: 'Gerenciar PDVS',
        onClick: () => onClickManagePDVs(item),
        border: true,
        rules: [
          {
            rule: () => {
              return item.active
            },
            message:
              'Para realizar a ação é necessário a Central estar com o status ativo',
          },
        ],
      },
      {
        content: 'Rateio de Linha de Produto',
        onClick: () => onClickManageCategories(item),
        rules: [],
      },
      {
        content: 'Regras Rateio (Histórico)',
        onClick: () => onClickCategoriesHistory(item),
        rules: [],
      },
    ]
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma central',
  }

  const onClickActivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.active === false)

    if (toUpdate.length === 0) return

    setModal({
      title: 'Ativar Central',
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Você deseja ativar a central <b>{toUpdate[0].name}</b>?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja ativar as <b>{toUpdate.length} centrais</b>{' '}
            selecionadas?
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Ativar',
          color: 'blue',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            const success = await toggleStatus(
              true,
              toUpdate.map((checked) => checked.id),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickInactivate = () => {
    const toUpdate = checkeds.filter((checked) => checked.active === true)

    if (toUpdate.length === 0) return

    setModal({
      title: 'Inativar Central',
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Você deseja realmente inativar a central <b>({toUpdate[0].name})</b>
            ?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja realmente inativar as <b>{toUpdate.length} centrais</b>{' '}
            selecionadas?
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Inativar',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            const success = await toggleStatus(
              false,
              toUpdate.map((checked) => checked.id),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickDelete = () => {
    const toUpdate = [...checkeds]

    if (toUpdate.length === 0) return

    setModal({
      title: 'Deletar Central',
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Você deseja realmente deletar a central <b>({toUpdate[0].name})</b>?
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você deseja realmente deletar as <b>{toUpdate.length} centrais</b>{' '}
            selecionadas?
          </React.Fragment>
        ),
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Deletar',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            const success = await deleteMultiple(
              toUpdate.map((checked) => checked.id),
            )

            if (success) toast(<ToasterContent color='normal' />, SuccessStyle)
            else toast(<ToasterContent color='error' />, ErrorStyle)

            reload()
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      const { data, success } = await extractData(
        appliedFilters,
        search,
        sort,
        checkeds,
      )

      if (!success || !data.url) throw new Error('Reposta inválida do endpoint')
      download(data.url)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const dropdownItems = [
    {
      content: 'Ativar',
      onClick: onClickActivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return (
              checkeds.filter((checked) => checked.active === false).length > 0
            )
          },
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma central inativa',
        },
      ],
    },
    {
      content: 'Inativar',
      onClick: onClickInactivate,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return (
              checkeds.filter((checked) => checked.active === true).length > 0
            )
          },
          message:
            'Para realizar a ação é necessário selecionar pelo menos uma central ativa',
        },
      ],
    },
    {
      content: 'Deletar',
      onClick: onClickDelete,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return (
              checkeds.filter((checked) => checked.category_count > 0)
                .length === 0
            )
          },
          message:
            'Para realizar a ação não é permitido selecionar centrais que possuam particularidades',
        },
        {
          rule: () => {
            return (
              checkeds.filter((checked) => checked.store_count > 0).length === 0
            )
          },
          message:
            'Para realizar a ação não é permitido selecionar centrais que possuam vinculos com PDV',
        },
      ],
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
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <Button
          primary
          size='tiny'
          content='Criar Central'
          onClick={() => onClickCreate()}
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
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        checkeds={{ checkeds, setCheckeds }}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      {!isOppenedModal(modal) ? (
        modal
      ) : (
        <Modal size={modal.size || 'tiny'} open>
          <S.ModalHeader content={modal.title} color={modal.titleColor} />

          <Modal.Content>{modal.content}</Modal.Content>

          <Modal.Actions>
            {modal.actions.map((action, index) => (
              <Button key={index} {...action} />
            ))}
          </Modal.Actions>
        </Modal>
      )}

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
