import { useCallback, useEffect, useState } from 'react'

import { FiltersInterfaces } from '@mw-kit/mw-manager'
import { MwLoader } from '@mw-kit/mw-ui'
import { isAxiosError } from 'axios'

import Modal, { ModalState } from '../../../../../../../components/MwModal'
import { BodyInterface } from '../../interfaces'
import { getStoreAudits } from '../../services'

import * as Components from './components'
import * as S from './styles'
import { Values } from './types'

const fakeSelected: BodyInterface = {
  /** ID da auditoria */
  id: 0,

  /** ID do PDV */
  store_id: 0,

  /** PDV */
  nickname_jsx: null,

  /** Bairro */
  sublocality_name: '',

  /** Cidade */
  city_name: '',

  /** Estado */
  state_code: '',

  /** Auditado Por */
  created_by_jsx: '',

  /** Função */
  created_by_role_jsx: '',

  /** Data da Auditoria */
  created_at_jsx: '',

  /** Endereço da auditoria */
  address: {
    formatted: '',
    postal_code: '',
    street_type: '',
    street_name: '',
    street_number: '',
    state_code: '',
    city_name: '',
    sublocality_name: '',
  },

  /** Coordenada da auditoria */
  coordinate: {
    lat: 0,
    lng: 0,
    radius: 0,
  },

  /** Dados do PDV */
  store: {
    id: 0,
    nickname: '',
    source_radius: 0,

    /** Endereço do PDV */
    address: {
      formatted: '',
      postal_code: '',
      street_type: '',
      street_name: '',
      street_number: '',
      state_code: '',
      city_name: '',
      sublocality_name: '',
      lat: 0,
      lng: 0,
    },

    /** Coordenada do PDV */
    coordinate: {
      lat: 0,
      lng: 0,
      radius: 50,
      tolerance: 200,
    },
  },

  /** Dados do auditor */
  creator: {
    name: '',
  },

  created_at: new Date(),
  page: 1,
  index: 0,
}

type AuditGeolocationProps = {
  /** Função para fechar o modal e recarregar o grid */
  onClose: () => void

  /** Valor do filtro de busca */
  search: string

  /** Valor dos filtros aplicados */
  appliedFilters: FiltersInterfaces.AppliedFilter[]
} & (
  | {
      /** Página inicial (enviar apenas ao clicar sobre um item da listagem) */
      initialPage: number

      /** Índice inicial (enviar apenas ao clicar sobre um item da listagem) */
      initialIndex: number
    }
  | {}
)

const AuditGeolocation = (props: AuditGeolocationProps) => {
  const { onClose, appliedFilters, search } = props

  const [modal, setModal] = useState<ModalState>(null)

  const [audits, setAudits] = useState<BodyInterface[]>([])
  const [page, setPage] = useState(
    'initialPage' in props ? props.initialPage : 1,
  )
  const [index, setIndex] = useState(
    'initialIndex' in props ? props.initialIndex : 0,
  )
  const [total, setTotal] = useState(0)
  const [lastPage, setLastPage] = useState(true)
  const [loading, setLoading] = useState(true)
  const [values, setValues] = useState<Values>({
    lat: fakeSelected.store.coordinate.lat,
    lng: fakeSelected.store.coordinate.lng,
    radius: fakeSelected.store.coordinate.radius,
  })

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      // fazendo requisição dos dados e listagem dos PDV's
      const { data, pagination } = await getStoreAudits(
        appliedFilters,
        search,
        page,
      )

      if (page < 2 && data.length < 1) {
        onClose()
        return
      }

      // check if index is still valid
      setIndex((prev) =>
        prev >= 0 && prev < data.length ? prev : data.length - 1,
      )

      setLastPage(!pagination.has_next_page)
      setTotal(pagination.count)
      setAudits(data)
      setLoading(false)
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 404 && page > 1) {
        setPage(page - 1)
      } else {
        console.error(e)
        onClose()
      }
    }
  }, [appliedFilters, search, page])

  useEffect(() => {
    loadData()
  }, [loadData])

  const selected = audits[index] || fakeSelected

  useEffect(() => {
    setValues({
      lat: selected.store.coordinate.lat,
      lng: selected.store.coordinate.lng,
      radius: selected.store.coordinate.radius,
    })
  }, [selected])

  return (
    <Modal.Modal open size='large'>
      <S.Header color='blue'>
        <div children='Geolocalização' />

        <div onClick={onClose}>&times;</div>
      </S.Header>

      <Modal.Body
        $paddingLeft='0'
        $paddingRight='0'
        $paddingTop='0'
        $paddingBottom='s3'
        style={{ position: 'relative' }}
      >
        {loading && <MwLoader filled zIndex={4} />}

        <S.Body>
          <div>
            <div>
              <Components.AuditData data={selected} />

              <Components.Radius
                radius={[
                  values.radius,
                  (v) => {
                    setValues((prev) => {
                      const radius =
                        typeof v === 'function' ? v(prev.radius) : v
                      return prev.radius === radius ? prev : { ...prev, radius }
                    })
                  },
                ]}
              />
            </div>

            <div>
              <Components.Map values={[values, setValues]} audit={selected} />
            </div>
          </div>

          <div>
            <div>
              <S.Pending>
                Pendente: <b>{total}</b>
              </S.Pending>
            </div>

            <div>
              <Components.Footer
                loadData={loadData}
                index={[index, setIndex]}
                page={[page, setPage]}
                lastPage={lastPage}
                length={audits.length}
                loading={[loading, setLoading]}
                audit={selected}
                values={values}
                setModal={setModal}
              />
            </div>
          </div>
        </S.Body>
      </Modal.Body>
      <Modal modal={modal} />
    </Modal.Modal>
  )
}

export default AuditGeolocation
