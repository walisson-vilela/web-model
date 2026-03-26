import React, { useCallback, useEffect, useState } from 'react'

import { MwManager, SortState } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { GenericObject } from '@mw-kit/mw-ui/types'
import toast from 'react-hot-toast'

import ManagerCounter from '../../../../components/ManagerCounter'
import Modal from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'

import header from './header'
import { AssociatedUsersProps, BodyInterface, Data } from './interfaces'
import { extractData, getStores as request } from './services'

const AssociatedUsers = <By extends keyof Data>({
  close,
  data,
  by,
}: AssociatedUsersProps<By>) => {
  const auxData: GenericObject = {
    id: data.id,
    count: data.count,
    ...(by === 'region' && 'name' in data ? { name: data.name } : {}),
    ...(by === 'work-shift' && 'eletronic_point_label' in data
      ? { work_shifts: data.eletronic_point_label }
      : {}),
  }

  // estado controlador do valor do input de pesquisa
  const [search, setSearch] = useState<string>('')
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador da ordenação
  const [sort, setSort] = useState<SortState | null>(null)
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)

  const [pagination, setPagination] = useState({
    page: 1,
    count: 0,
    has_next_page: false,
  })

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados
      const {
        data: results,
        pagination: { has_next_page, count: total_registries },
      } = await request(data.id, search, by, sort)

      // setando dados sobre a paginação
      setPagination((prev) => ({
        ...prev,
        has_next_page,
        count: total_registries,
      }))

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(pagination.page === 1 ? results : (prev) => [...prev, ...results])
    } catch (error) {
      console.error(error)
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, search, sort, pagination.page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = () => {
    setPagination((prev) => {
      return prev.has_next_page ? { ...prev, page: prev.page + 1 } : prev
    })
  }

  const setPage: React.Dispatch<React.SetStateAction<number>> = (page) => {
    setPagination((prev) => ({
      ...prev,
      page: typeof page === 'function' ? page(prev.page) : page,
    }))
  }

  const onClickExtractData = useCallback(async () => {
    setLoading(true)

    try {
      await extractData(data.id, search, by, sort)
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }

    setLoading(false)
  }, [data.id, search, sort])

  return (
    <Modal.Modal open style={{ width: 1095, maxWidth: '90vw' }}>
      <Modal.Header color='blue'>Usuários Associados</Modal.Header>

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
          {by === 'region' ? (
            <React.Fragment>
              Área: <b>{auxData.name || '-'}</b> - {auxData.count || null}{' '}
              Usuários Associados
            </React.Fragment>
          ) : (
            <React.Fragment>
              ID: <b children={auxData.id} /> | Tipo:{' '}
              <b children={auxData.work_shifts} /> |{' '}
              <b children={auxData.count || '-'} /> Usuários Associados
            </React.Fragment>
          )}
        </Modal.Toolbar>

        <Modal.Toolbar.ManagerContainer>
          <MwManager
            columns={header}
            rows={body}
            sort={{ sort, setSort }}
            hasFilters={false}
            loading={loading}
            paginator={paginator}
            setPage={setPage}
            page={pagination.page}
            list
          />

          <ManagerCounter partial={body.length} total={pagination.count} />
        </Modal.Toolbar.ManagerContainer>
      </Modal.Body>

      <Modal.Footer>
        <MwButton type='button' color='blue' children='OK' onClick={close} />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default AssociatedUsers
