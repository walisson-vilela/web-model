import React, { useCallback, useEffect, useState } from 'react'

import { Dropdown, MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import lodash from 'lodash'
import toast from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isNumber } from '../../../../../utils/Validators'
import { DownloadIMG, DownloadPPT } from '../../../Modals'
import filters from '../filters'
import { TabComponent } from '../types'

import header from './header'
import { BodyInterface, DataInterface } from './interfaces'
import parseData from './parser'
import { extractCategories, listCategories } from './services'

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
      const responseData = await listCategories({
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
    setBody(parseData(data))
  }, [data])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const noneSelectedRule = {
    rule: () => {
      return (
        checkeds.filter((checked) => isNumber(checked.category_id)).length > 0
      )
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma Categoria',
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

    const ids = checkeds.map((e) => e.category_id)
    try {
      await extractCategories({
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

  const dropdownItems = [
    {
      content: 'Baixar Imagens',
      onClick: onClickDownloadIMG,
      rules: [noneSelectedRule],
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

  useEffect(() => {
    checkeds.map((item) => {
      if (!tourIds.includes(item.category_id)) {
        setTourIds((prev) => [...prev, item.category_id])
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
        <Popup
          on='click'
          inverted
          disabled={checkeds.length > 0}
          className='popup-field'
          position='right center'
          content={
            <div style={{ width: '264px' }}>
              <span>
                Para realizar à ação é necessário selecionar pelo menos uma
                Categoria.
              </span>
            </div>
          }
          trigger={
            <div>
              <MwButton
                appearance='solid'
                size='small'
                style={{ width: '110px' }}
                onClick={() => {
                  const pathname = `gallery/${checkeds.map(
                    (e) => e.category_id,
                  )}`

                  const params = {
                    name: 'categories',
                    initialDate: dateInterval[0].trim(),
                    finalDate: dateInterval[1].trim(),
                    ids: tourIds.join(','),
                    appliedFilters:
                      appliedFilters.length > 0
                        ? appliedFilters
                            .filter((item) => item.name !== 'category_id')
                            .map((props) => props)
                        : [],
                  }
                  history.push({
                    pathname,
                  })
                  localStorage.setItem(pathname, JSON.stringify(params))
                }}
                disabled={checkeds.length < 1}
                content='Ver Imagens'
              />
            </div>
          }
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
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
