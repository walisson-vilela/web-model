import { useCallback, useEffect, useState } from 'react'

import { MwManager, SortState } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../../components/ManagerCounter'
import Modal from '../../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'

import header from './header'
import { BodyInterface } from './interfaces'
import { extractData, getStores as request } from './services'
import * as S from './styles'

interface AssociatedPDVProps {
  close: () => void
  data: {
    id: number
    name: string
    count: number
  }
}

const AssociatedPDV = ({ close, data }: AssociatedPDVProps) => {
  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
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

    try {
      // fazendo requisição dos dados
      const {
        data: results,
        pagination: { has_next_page, count: total_registries },
      } = await request(data.id, search, sort)

      // setando dados sobre a paginação
      setIsLastPage(!has_next_page)
      setTotalRegistries(total_registries)

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? results : (prev) => prev.concat(results))
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, search, sort, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = () => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }

  const onClickExtractData = useCallback(async () => {
    setLoading(true)

    try {
      await extractData(data.id, search, sort)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, search, sort])

  return (
    <Modal.Modal open style={{ width: 1095, maxWidth: '90vw' }}>
      <Modal.Header color='blue'>PDVs Associados</Modal.Header>

      <Modal.Body
        $paddingBottom='0'
        $paddingLeft='s3'
        $paddingTop='s3'
        $paddingRight='s3'
      >
        <Modal.Toolbar
          search={{ submitted: [search, setSearch] }}
          dropdown={{
            loading,
            items: [
              {
                content: 'Extrair dados',
                onClick: onClickExtractData,
                rules: [],
              },
            ],
          }}
        >
          Área: <b>{data.name || '-'}</b> - {data.count || null} PDVs Associados
        </Modal.Toolbar>

        <Modal.Toolbar.ManagerContainer>
          <MwManager
            columns={header}
            rows={body}
            sort={{ sort, setSort }}
            hasFilters={false}
            loading={loading}
            paginator={paginator}
            page={page}
            setPage={setPage}
            list
          />

          <ManagerCounter partial={body.length} total={totalRegistries} />
        </Modal.Toolbar.ManagerContainer>
      </Modal.Body>

      <Modal.Footer>
        <S.FooterMessage>
          * Os PDVs são associados à área de atuação de forma automática com
          base no endereço cadastral
        </S.FooterMessage>

        <MwButton type='button' color='blue' children='OK' onClick={close} />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AssociatedPDV
