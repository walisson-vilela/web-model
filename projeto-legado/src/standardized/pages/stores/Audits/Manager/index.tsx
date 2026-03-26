import React, { useCallback, useEffect, useState } from 'react'

import {
  AppliedFilters,
  MenuFilters,
  MwManager,
  RefreshButton,
  SearchFilter,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { Toaster } from 'react-hot-toast'

import { Header } from '../../../../../components/Header'
import Modal, { ModalState } from '../../../../../components/MwModal'
import { ManagerProps } from '../../../../../screens/interfaces'
import Popup from '../../../../components/Popup'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import * as Modals from './modals'
import { getStoreAudits } from './services'
import * as S from './styles'

const Manager = (props: ManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search, setSearch } = props.search
  // estado controlador dos filtros aplicados
  const { appliedFilters, setAppliedFilters } = props.appliedFilters
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
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState | null>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados e listagem dos PDV's
      const { data, pagination } = await getStoreAudits(
        appliedFilters,
        search,
        page,
      )

      setIsLastPage(!pagination.has_next_page)
      setTotalRegistries(pagination.count)

      // se for a primeira pagina, seta os resultados, se nao, concatena os resultados
      setBody(page === 1 ? data : (prev) => prev.concat(data))
    } catch (e) {
      console.error(e)
    }

    setLoading(false)
  }, [appliedFilters, search, page])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  const paginator = useCallback(() => {
    if (!isLastPage) setPage((prev) => (prev += 1))
  }, [isLastPage])

  const reloader = useCallback(() => {
    page === 1 ? loadData() : setPage(1)
  }, [page])

  const onStartAudit = useCallback(
    (props?: { initialIndex: number; initialPage: number }) => {
      setModal(
        <Modals.AuditGeolocation
          onClose={() => {
            setModal(null)
            reloader()
          }}
          appliedFilters={appliedFilters}
          search={search}
          {...(props || {})}
        />,
      )
    },
    [appliedFilters, search, page],
  )

  return (
    <React.Fragment>
      <Header
        description='Realize as auditorias pendentes'
        child={
          <S.FiltersContainer>
            <RefreshButton reloader={reloader} />
            <SearchFilter transparent {...{ search, setSearch }} />
            <AppliedFilters {...{ appliedFilters, setAppliedFilters }} />
            <MenuFilters {...{ filters, appliedFilters, setAppliedFilters }} />
          </S.FiltersContainer>
        }
      />

      <MwManager
        columns={header}
        rows={body}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        paginator={paginator}
        page={page}
        setPage={setPage}
        onClickRow={(row: BodyInterface) =>
          onStartAudit({
            initialIndex: row.index,
            initialPage: row.page,
          })
        }
        messages={{
          empty: 'Não há auditoria para ser realizada no momento',
        }}
        list
      />

      <S.Footer>
        <div>{totalRegistries} PDVS para auditoria</div>

        <Popup
          on='click'
          position='top right'
          inverted
          disabled={body.length > 0}
          content='Não há auditorias para serem auditadas.'
          trigger={
            <div>
              <MwButton
                type='button'
                {...(body.length > 0 && !loading
                  ? { onClick: () => onStartAudit() }
                  : { disabled: true })}
                size='large'
                children='Iniciar Auditoria'
              />
            </div>
          }
        />
      </S.Footer>

      <Modal modal={modal} />

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
