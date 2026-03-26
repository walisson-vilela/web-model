import React, { useCallback, useEffect, useState } from 'react'

import { MwManager } from '@mw-kit/mw-manager'
import { Toaster } from 'react-hot-toast'

import Modal, { ModalState } from '../../../components/MwModal'

import header from './header'
import { BodyInterface, DataInterface, ManagerProps } from './interfaces'
import parseData from './parser'
import { getSettings as request } from './services'

const Manager = (props: ManagerProps) => {
  // estado controlador do valor do input de pesquisa
  const { search } = props.search
  // estado controlador dos filtros aplicados
  const { appliedFilters } = props.appliedFilters
  // estado controlador dos dados recebidos
  const [data, setData] = useState<DataInterface[]>([])
  // estado controlador do conteudo do manager
  const [body, setBody] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado que controla qual modal está aberto
  const [modal, setModal] = useState<ModalState>(null)

  // essa função tem os filtros aplicados, o valor do input de busca e o valor da ordenação como dependencias
  const loadData = useCallback(async () => {
    setLoading(true)

    // fazendo requisição dos dados
    const response = await request(appliedFilters, search, props.tab)
    setData([...response.data])

    setLoading(false)
  }, [appliedFilters, search])

  // sempre que alguma dependencia da função loadData for alterada, chama a função
  useEffect(() => {
    loadData()
  }, [loadData])

  // sempre que os dados sao alterados, faz o parse para o formato que o manager precisa
  useEffect(() => {
    setBody(parseData(data, setModal))
  }, [data])

  return (
    <React.Fragment>
      <MwManager
        columns={header}
        rows={body}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={loading}
        list
      />

      <Modal modal={modal} />

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
