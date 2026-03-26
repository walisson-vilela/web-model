import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import lodash from 'lodash'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { isNumber } from '../../../../../utils/Validators'
import {
  DownloadIMG,
  DownloadPPT,
  FavoriteForm,
  FavoriteShare,
} from '../../../Modals'
import { filters } from '../filters'
import { TabComponent } from '../types'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import {
  clearMultiple,
  deleteMultiple,
  extractFavorites,
  listFavorites,
} from './services'

const Manager: TabComponent = (props) => {
  const { history } = props.route

  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador da ordenação
  const { sort, setSort } = props.sort
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
  // estado controlador dos filtro de intervalo de data
  const { dateInterval, setDateInterval } = props.dateInterval
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
  const [modal, setModal] = useState<ModalState>(null)
  // estado para armazenar os ids que serão enviados para o tour
  const [tourIds, setTourIds] = useState<number[]>([])

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados
      const responseData = await listFavorites({
        appliedFilters,
        search,
        sort,
        dateInterval,
        page,
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
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [appliedFilters, search, sort, dateInterval, page])

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
    setBody(parseData({ data, setModal }))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickDownloadIMG = () => {
    setModal(
      <DownloadIMG
        ids={checkeds.map((e) => e.file_ids).flat(1)}
        setModal={setModal}
        reload={reload}
        numberOfImages={lodash.sum(checkeds.map((e) => e.image_count))}
      />,
    )
  }

  const onClickDownloadPPT = () => {
    setModal(
      <DownloadPPT
        ids={checkeds.map((e) => e.file_ids).flat(1)}
        setModal={setModal}
        reload={reload}
        numberOfImages={lodash.sum(checkeds.map((e) => e.image_count))}
      />,
    )
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    const ids = checkeds.map((e) => e.favorite_id)

    try {
      await extractFavorites({
        appliedFilters,
        search,
        sort,
        dateInterval,
        page,
        ids,
      })
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const onClickTour = () => {
    const pathname = `gallery/${checkeds.map((e) => e.favorite_id)}`

    const params = {
      name: 'favorites',
      initialDate: dateInterval[0].trim(),
      finalDate: dateInterval[1].trim(),
      ids: tourIds.join(','),
      appliedFilters:
        appliedFilters.length > 0
          ? appliedFilters
              .filter((item) => item.name !== 'favorite_id')
              .map((props) => props)
          : [],
    }
    history.push({
      pathname,
    })
    localStorage.setItem(pathname, JSON.stringify(params))
  }

  const onClickDelete = () => {
    const toUpdate = checkeds.filter(
      (checked) => !['viewer', 'liker'].includes(checked.share_type),
    )

    if (toUpdate.length === 0) return

    setModal({
      title: 'Deletar',
      titleColor: 'white',
      content:
        toUpdate.length === 1 ? (
          <React.Fragment>
            Você deseja deletar o favorito <b>{toUpdate[0].favorite_name}</b>?{' '}
            <br />
            {toUpdate[0].share_type !== 'owner-none' &&
              'Ele possui compartilhamento. '}
            Uma vez apagado, será deletado permanentemente, porém, as imagens
            serão mantidas no sistema.
          </React.Fragment>
        ) : (
          <React.Fragment>
            Você confirma a ação? Sua pasta será permanentemente deletada,
            porém, as imagens serão mantidas no sistema.
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
          style: { marginRight: 0 },
          onClick: async () => {
            setLoading(true)
            setModal(null)

            try {
              const success = await deleteMultiple(
                toUpdate.map((checked) => checked.favorite_id),
              )

              toast(<ToasterContent color={'normal'} />, SuccessStyle)

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
        },
      ],
    })
  }

  const onClickClear = () => {
    const toUpdate = checkeds.filter(
      (checked) => !['viewer', 'liker'].includes(checked.share_type),
    )

    if (toUpdate.length === 0) return

    setModal({
      title: 'Limpar Favoritos',
      titleColor: 'white',
      content:
        toUpdate.length === 1 ? (
          <p>
            Você deseja realmente limpar os favoritos{' '}
            <b>{toUpdate[0].favorite_name}</b>? A ação tira as imagens da lista
            de favoritos.
          </p>
        ) : (
          <p>
            Você deseja realmente limpar os <b>{toUpdate.length}</b> favoritos
            selecionados? A ação tira as imagens da lista de favoritos.
          </p>
        ),
      buttonType: 'MwButton',
      actions: [
        {
          appearance: 'borderless',
          style: { width: '110px', height: '44px' },
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          appearance: 'solid',
          content: 'Limpar',
          color: 'red',
          style: { marginLeft: '7px', width: '110px', height: '44px' },
          onClick: async () => {
            setLoading(true)
            setModal(null)

            try {
              const success = await clearMultiple(
                toUpdate.map((checked) => checked.favorite_id),
              )

              toast(<ToasterContent color={'normal'} />, SuccessStyle)

              reload()
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
        },
      ],
    })
  }

  const noneSelectedRule = {
    rule: () => {
      return (
        checkeds.filter((checked) => isNumber(checked.favorite_id)).length > 0
      )
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos um Favorito',
  }

  const permissionDeniedRule = {
    rule: () =>
      checkeds.filter(
        (checked) => !['viewer', 'liker'].includes(checked.share_type),
      ).length > 0,
    message: 'Você não tem permissão para realizar essa ação.',
  }

  const dropdownItems: DropdownInterfaces.Item[] = [
    {
      content: 'Ver Imagens',
      onClick: onClickTour,
      rules: [noneSelectedRule],
    },
    {
      content: 'Deletar Favoritos',
      onClick: onClickDelete,
      rules: [noneSelectedRule, permissionDeniedRule],
    },
    {
      content: 'Limpar Favoritos',
      onClick: onClickClear,
      rules: [noneSelectedRule, permissionDeniedRule],
    },
    {
      content: 'Baixar Imagens',
      onClick: onClickDownloadIMG,
      rules: [noneSelectedRule],
      border: true,
    },
    {
      content: 'Baixar PPT',
      onClick: onClickDownloadPPT,
      rules: [noneSelectedRule],
    },
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      border: true,
      rules: [],
    },
  ]

  const onClickCreate = () => {
    setModal(<FavoriteForm close={() => setModal(null)} reload={reload} />)
  }

  const onClickTourItem = (item: BodyInterface) => {
    history.push({
      pathname: `gallery/${item.favorite_id}`,
      search: `files&created_at[]=${dateInterval[0].trim()}&created_at[]=${dateInterval[1].trim()}&id=${tourIds.join(
        ',',
      )}${
        appliedFilters.length > 0
          ? appliedFilters
              .filter((item) => item.name !== 'id')
              .map((props) => {
                let params = {
                  name: props.name,
                  value: props.value,
                }
                return `&${params.name}=${params.value}`
              })
          : ''
      }`,
      state: {
        teamData: `${dateInterval}`,
      },
    })
  }

  const onClickEdit = (item: BodyInterface) => {
    setModal(
      <FavoriteForm
        id={item.favorite_id}
        close={() => setModal(null)}
        reload={reload}
      />,
    )
  }

  const onClickShare = (item: BodyInterface) => {
    setModal(<FavoriteShare setModal={setModal} reload={reload} item={item} />)
  }

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => [
    {
      content: 'Ver Imagens',
      onClick: () => onClickTourItem(item),
      rules: [],
    },
    {
      content: 'Editar',
      onClick: () => onClickEdit(item),
      rules: [
        {
          rule: () => item.share_type.startsWith('owner'),
          message: 'Não é possível editar favoritos compartilhados com você.',
        },
      ],
      border: true,
    },
    {
      content: 'Compartilhar',
      onClick: () => onClickShare(item),
      rules: [
        {
          rule: () => item.share_type.startsWith('owner'),
          message:
            'Não é possível compartilhar favoritos compartilhados com você.',
        },
      ],
    },
  ]

  useEffect(() => {
    checkeds.map((item) => {
      if (!tourIds.includes(item.favorite_id)) {
        setTourIds((prev) => [...prev, item.favorite_id])
      }
    })
  }, [checkeds])

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={loading}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
        calendarInterval={{ dateInterval, setDateInterval }}
        except={{
          paginator: true,
        }}
      >
        <MwButton
          appearance='solid'
          size='mini'
          style={{ width: '110px', height: '33px' }}
          onClick={onClickCreate}
          content='Criar Favoritos'
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

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
