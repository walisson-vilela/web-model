import { useCallback, useEffect, useState } from 'react'

import { MwManager, SearchFilter, SortState } from '@mw-kit/mw-manager'
import { Dropdown, MwButton } from '@mw-kit/mw-ui'

import Elipse from '../../../../../assets/img/svgs/elipse.svg?react'
import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal from '../../../../../components/MwModal'

import header from './header'
import { BodyInterface, DataBasics, DataInterface } from './interfaces'
import parseData from './parser'
import { extractData, getLicenses as request } from './services'
import * as S from './styles'

interface LicenseDistributionProps {
  setOpen: Function
  dataBasics: DataBasics
}

const LicenseDistribution = ({
  setOpen,
  dataBasics,
}: LicenseDistributionProps) => {
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
    const responseData = await request(dataBasics.type, page, search, sort)

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
      await extractData(dataBasics.type, page, search, sort)
    } catch (error) {
      alert('Erro ao extrair dados')
      console.error(error)
    }

    setLoading(false)
  }

  return (
    <Modal
      modal={{
        size: 'large',
        title: 'Distribuição de Licenças',
        titleColor: 'blue',
        contentPadding: '21px 21px 0 21px',
        content: (
          <S.Container>
            <S.Subheader>
              <div>
                <p>
                  Tipo de Acesso: <b>{dataBasics.type_text || '-'}</b>
                </p>
                <p>
                  Total Distribuído: <b>{dataBasics.reserved}</b> | Total
                  Utilizado: <b>{dataBasics.consumed}</b>
                </p>
              </div>

              <div>
                <SearchFilter search={search} setSearch={setSearch} />

                <Dropdown
                  floating
                  icon={null}
                  direction='left'
                  trigger={<Elipse />}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      content='Extrair dados'
                      onClick={onClickExtractData}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </S.Subheader>

            <S.Content>
              <MwManager
                columns={header}
                rows={body}
                sort={{ sort, setSort }}
                hasFilters={false}
                loading={loading}
                paginator={paginator}
                page={page}
                setPage={setPage}
              />

              <ManagerCounter partial={body.length} total={totalRegistries} />
            </S.Content>
          </S.Container>
        ),
        actions: [<MwButton content='OK' onClick={() => setOpen(null)} />],
      }}
    />
  )
}

export default LicenseDistribution
