import React, { useCallback, useEffect, useState } from 'react'

import {
  Dropdown,
  DropdownInterfaces,
  MwManager,
  Toolbar,
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'
import { Modal as SModal } from 'semantic-ui-react'

import ManagerCounter from '../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../components/Toaster'
import { isNumber } from '../../../utils/Validators'
import { useWebSocket } from '../../../utils/hooks'
import { ManagerProps } from '../../interfaces'

import Edit from './components/modals/Edit'
import filters from './filters'
import header from './header'
// import { Button, Popup } from "semantic-ui-react";
import { BodyInterface, DataInterface } from './interfaces'
import parseData, { updateData } from './parser'
import {
  deleteMultiple,
  extractData,
  getContractors as request,
  toggleStatus,
} from './services'
import * as S from './style'

const CHANNEL_ID = 'file_processes.$account.$contractor'

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
  // estado controlador do conteudo do manager
  const [checkeds, setCheckeds] = useState<BodyInterface[]>([])
  // estado controlador do loading
  const [loading, setLoading] = useState<boolean>(false)
  // estado controlador da paginação
  const [page, setPage] = useState<number>(1)
  // estado controlador do limite da paginação
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  // estado que salva o total de registros da api
  const [totalRegistries, setTotalRegistries] = useState<number>(0)
  // estado controlador do modal
  const [modal, setModal] = useState<ModalState>(null)

  const [notificationModal, setNotificationModal] = useState<ModalState>(null)
  // const history = useHistory();

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

  const { subscribe, unsubscribe, addEvents } = useWebSocket()

  useEffect(() => {
    subscribe(CHANNEL_ID, {})

    return () => unsubscribe(CHANNEL_ID)
  }, [])

  useEffect(() => {
    updateData(body, setData, addEvents, CHANNEL_ID)
  }, [body])

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

  // função que retorna os itens do menu lateral
  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Renomear arquivo',
        onClick: () => {
          setModal(
            <Edit
              file_process_id={item.id}
              closeModal={() => setModal(null)}
              reload={reload}
            />,
          )
        },
        rules: [],
      },
      // {
      //   content: (
      //     <Popup
      //       on="click"
      //       trigger={<div>Copiar Link</div>}
      //       content="Link Copiado com Sucesso!"
      //       position="left center"
      //       inverted
      //     />
      //   ),
      //   onClick: () => {
      //     if (!item.file || !item.file.url) return;
      //     navigator.clipboard.writeText(item.file.url);
      //   },
      //   rules: [
      //     {
      //       rule: () => {
      //         return !!(item.file && item.file.url);
      //       },
      //       message:
      //         "Para realizar a ação é necessário ter finalizado o download",
      //     },
      //   ],
      //   closeOnClick: false,
      // },
    ]
  }

  const onClickClearList = async (): Promise<any> => {
    const ids = checkeds
      .filter((checked) => checked.status !== 'P')
      .map((e) => e.id)

    setNotificationModal(
      <SModal open size='tiny'>
        <SModal.Header>
          <S.ModalHeaderText>Deletar</S.ModalHeaderText>
        </SModal.Header>
        <SModal.Content>
          <SModal.Description>
            <S.ModalDescriptionText>
              <span>
                Você deseja realmente deletar{' '}
                <b>
                  {ids.length} Arquivo{ids.length > 1 && 's'}
                </b>{' '}
                selecionado{ids.length > 1 && 's'}? A ação não pode ser
                revertida. Deseja Confirmar?
              </span>
            </S.ModalDescriptionText>
          </SModal.Description>
        </SModal.Content>
        <SModal.Actions>
          <MwButton
            content='Cancelar'
            appearance='borderless'
            className='tertiary'
            onClick={() => setNotificationModal(<></>)}
          />
          <MwButton
            content='Confirmar'
            appearance='solid'
            color='red'
            style={{ width: '110px', height: '44px' }}
            onClick={async () => {
              try {
                await deleteMultiple(ids)
                toast(<ToasterContent color='normal' />, SuccessStyle)
              } catch (error) {
                toast(<ToasterContent />, ErrorStyle)
              } finally {
                reload()
                setNotificationModal(<></>)
              }
            }}
          />
        </SModal.Actions>
      </SModal>,
    )
  }

  const onClickCancelDownloads = async (): Promise<any> => {
    const ids = checkeds
      .filter((checked) => checked.status === 'P')
      .map((e) => e.id)

    setNotificationModal(
      <SModal open size='tiny'>
        <SModal.Header>
          <S.ModalHeaderText>Cancelar Downloads</S.ModalHeaderText>
        </SModal.Header>
        <SModal.Content>
          <SModal.Description>
            <S.ModalDescriptionText>
              <span>
                Você deseja realmente cancelar o <b>download?</b> Esta ação irá
                interromper e não poderá ser revertida.
              </span>
            </S.ModalDescriptionText>
          </SModal.Description>
        </SModal.Content>
        <SModal.Actions>
          <MwButton
            content='Cancelar'
            appearance='borderless'
            className='tertiary'
            onClick={() => setNotificationModal(<></>)}
          />
          <MwButton
            content='Confirmar'
            appearance='solid'
            color='red'
            style={{ width: '110px', height: '44px' }}
            onClick={async () => {
              try {
                await toggleStatus(ids, 'C')
                toast(<ToasterContent color='normal' />, SuccessStyle)
              } catch (error) {
                toast(<ToasterContent />, ErrorStyle)
              } finally {
                reload()
                setNotificationModal(<></>)
              }
            }}
          />
        </SModal.Actions>
      </SModal>,
    )
  }

  const noneSelectedRule = {
    rule: () => {
      return checkeds.filter((checked) => isNumber(checked.id)).length > 0
    },
    message:
      'Para realizar a ação é necessário selecionar pelo menos um arquivo',
  }

  const onClickExtractData = async (): Promise<any> => {
    setLoading(true)

    try {
      await extractData(
        appliedFilters,
        search,
        sort,
        page,
        checkeds.map((e) => e.id),
      )
    } catch (error) {
      alert('Erro ao extrair dados')
      console.log(error)
    }

    setLoading(false)
  }

  const dropdownItems = [
    {
      content: 'Deletar',
      onClick: onClickClearList,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.some((checked) => checked.status !== 'P')
          },
          message:
            'Para realizar a ação não é permitido selecionar downloads em progresso',
        },
      ],
    },
    {
      content: 'Cancelar Downloads',
      onClick: onClickCancelDownloads,
      rules: [
        noneSelectedRule,
        {
          rule: () => {
            return checkeds.some((checked) => checked.status === 'P')
          },
          message:
            'Para realizar a ação é necessário selecionar downloads em progresso',
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
        getItemMenu={getItemMenu}
        checkeds={{
          checkeds,
          setCheckeds,
        }}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />

      <Modal modal={modal} />
      <Modal modal={notificationModal} />

      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default Manager
