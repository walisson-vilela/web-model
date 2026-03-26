import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  MwManager,
  SearchFilter,
  SortState,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal from '../../../../../components/MwModal'

import header from './header'
import { BodyInterface, DataBasics, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getStores as request } from './services'
import * as S from './styles'

interface IAssociatedPDV {
  setOpen: Function
  dataBasics: DataBasics
}

const AssociatedPDVModal = (props: IAssociatedPDV) => {
  const { dataBasics, setOpen } = props

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    // fazendo requisição dos dados
    const responseData = await request(
      dataBasics.id,
      dataBasics.default_id,
      search,
      sort,
    )

    // setando dados sobre a paginação
    const { has_next_page = false, count: total_registries = 0 } =
      responseData.pagination || {}

    setIsLastPage(!has_next_page)
    setTotalRegistries(total_registries)

    // pegando os resultados da requisição
    const results = responseData.data || []

    // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
    setData(page === 1 ? results : (prev) => prev.concat(results))

    setLoading(false)
  }, [search, sort, page])
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

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      await extractData(dataBasics.id, dataBasics.default_id, search, sort)
    } catch (error) {
      alert('Erro ao extrair dados')
    }

    setLoading(false)
  }

  const dropdownItems = [
    {
      content: 'Extrair dados',
      onClick: onClickExtractData,
      border: false,
      rules: [],
    },
  ]

  return (
    <Modal.Modal
      open
      size='large'
      style={{
        height: '600px',
        width: '1095px',
        maxHeight: '90vh',
        maxWidth: '90vw',
      }}
    >
      <Modal.Header color='blue'>PDVs Associados</Modal.Header>

      <Modal.Body $gap='s4' style={{ paddingBottom: '0' }}>
        <S.Toolbar>
          <div>
            <div>
              Tipologia: <b>{dataBasics.name || '-'}</b> -{' '}
              {dataBasics.count || null} PDVs Associados
            </div>
          </div>

          <SearchFilter setSearch={setSearch} />

          <Dropdown
            items={dropdownItems}
            loading={loading}
            axis='y'
            centerCoodinates={{ y: 100 }}
          />
        </S.Toolbar>

        <S.Container>
          <MwManager
            columns={header}
            rows={body}
            list
            sort={{ sort, setSort }}
            hasFilters={false}
            loading={loading}
            paginator={paginator}
            page={page}
            setPage={setPage}
          />

          <ManagerCounter partial={body.length} total={totalRegistries} />
        </S.Container>
      </Modal.Body>

      <Modal.Footer>
        <MwButton
          type='button'
          content='OK'
          onClick={() => setOpen(<React.Fragment />)}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AssociatedPDVModal
