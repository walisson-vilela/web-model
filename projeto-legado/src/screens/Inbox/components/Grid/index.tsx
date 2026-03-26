import React, { useCallback, useEffect, useState } from 'react'

import { Dropdown, SearchFilter, Toolbar } from '@mw-kit/mw-manager'
import { MwEllipsisContainer, MwIcon, MwInput, MwLoader } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'

import Modal, { ModalState } from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { clearHTMLFromString } from '../../../../utils/Formatters'
import { isNumber, isOneOf } from '../../../../utils/Validators'
import { TabComponent } from '../../types'
import { deleteMultiple, toggleVisualized } from '../View/services'

import { BodyInterface, Filter, Pagination } from './interfaces'
import { types } from './labels'
import parser from './parser'
import { getMessages, toggleImportant } from './services'
import * as S from './styles'

const Grid: TabComponent = (props) => {
  if (!(props.tab in types)) return null

  const config = types[props.tab]

  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<BodyInterface[]>([])
  const [modal, setModal] = useState<ModalState>(null)
  const [checkeds, setCheckeds] = useState<any[]>([])
  const [filter, setFilter] = useState<Filter>('')
  const [search, setSearch] = useState<string>('')
  const [page, setPage] = useState<number>(1)
  const [pagination, setPagination] = useState<Pagination>({
    has_next_page: false,
    count: 0,
    start: 0,
    end: 0,
  })

  useEffect(() => {
    if (props.tab !== 'sent' || !isOneOf(filter, ['read', 'unread'])) return
    setFilter('')
  }, [filter, props.tab])

  const loadData = useCallback(async () => {
    setLoading(true)

    const { data, pagination, unread } = await getMessages(
      config.mode,
      filter,
      search,
      page,
    )

    setPagination(pagination)
    setData(parser(data))

    setLoading(false)
  }, [config.mode, search, filter, page])

  const reload = () => (page === 1 ? loadData() : setPage(1))

  useEffect(() => {
    setCheckeds([])
    loadData()
  }, [loadData])

  const onToggleImportant = async (is_important: boolean, id: number) => {
    setLoading(true)

    try {
      const success = await toggleImportant(is_important, [id])

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        reload()
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const selectItems = (item?: BodyInterface) => {
    setCheckeds((prev) => {
      let aux = [...prev]

      if (item) {
        const index = aux.findIndex((e) => e.id === item.id)

        index > -1 ? aux.splice(index, 1) : aux.push(item)

        return aux
      }

      return checkeds.length === data.length ? [] : data
    })
  }

  const viewMessage = (id: number) => {
    props.changeTab({ tab: 'view', id })
  }

  const noneSelectedRule = {
    rule: () => checkeds.filter((checked) => isNumber(checked.id)).length > 0,
    message:
      'Para realizar a ação é necessário selecionar pelo menos uma mensagem.',
  }

  const deleteSelected = () => {
    setModal({
      title: `Excluir Mensage${checkeds.length > 1 ? 'ns' : 'm'}`,
      content: `Você tem certeza que deseja excluir definitivamente esta${
        checkeds.length > 1 ? 's' : ''
      } mensage${checkeds.length > 1 ? 'ns' : 'm'}?`,
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          size: 'large',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Excluir',
          color: 'red',
          size: 'large',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            try {
              const success = await deleteMultiple(checkeds.map((e) => e.id))

              if (success) {
                toast(<ToasterContent color='normal' />, SuccessStyle)
                setCheckeds([])
                reload()
              }
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const markAsReaded = () => {
    setModal({
      title: `Marcar como Lida${checkeds.length > 1 ? 's' : ''}`,
      content: `Deseja realmente marcar a${
        checkeds.length > 1 ? 's' : ''
      } mensage${checkeds.length > 1 ? 'ns' : 'm'} como lida${
        checkeds.length > 1 ? 's' : ''
      }?`,
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
          content: 'Confirmar',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            try {
              const success = await toggleVisualized(
                true,
                checkeds.map((e) => e.id),
              )

              if (success) {
                toast(<ToasterContent color='normal' />, SuccessStyle)
                setCheckeds([])
                reload()
              }
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const dropdownItems = [
    {
      content: 'Excluir selecionados',
      onClick: deleteSelected,
      rules: [noneSelectedRule],
    },
    ...(config.title === 'Enviados'
      ? []
      : [
          {
            content: 'Marcar como lida',
            onClick: markAsReaded,
            rules: [noneSelectedRule],
            border: true,
          },
        ]),
  ]

  return (
    <S.Container>
      <S.Title>
        <h2 children={config.title} />

        <SearchFilter setSearch={setSearch} width='310px' />
      </S.Title>

      <S.Content>
        <S.ContentHeader>
          <div>
            <MwInput
              type='checkbox'
              checked={checkeds.length && checkeds.length === data.length}
              label='Selecionar Todos'
              onChange={() => selectItems()}
            />

            <Toolbar>
              <Dropdown items={dropdownItems} loading={loading} axis='y' />
            </Toolbar>

            <MwIcon
              type='semantic'
              color='#999999'
              icon='refresh'
              width={14}
              onClick={() => reload()}
            />
          </div>

          <div>
            <span>
              {pagination.start} - {pagination.end} de {pagination.count}
            </span>

            <MwIcon
              type='semantic'
              color='#999999'
              icon='chevron left'
              width={14}
              onClick={
                page > 1
                  ? () => {
                      setPage((prev) => (prev > 1 ? prev - 1 : prev))
                    }
                  : undefined
              }
            />

            <MwIcon
              type='semantic'
              color='#999999'
              icon='chevron right'
              width={14}
              onClick={
                pagination.has_next_page
                  ? () => {
                      if (pagination.has_next_page) setPage((prev) => prev + 1)
                    }
                  : undefined
              }
            />

            <MwInput
              type='select'
              placeholder='Todas as Mensagens'
              borderless
              value={filter}
              setValue={(value) => setFilter(value as Filter)}
              style={{ borderLeft: '1px solid #D3D3D3' }}
              loader={async () => {
                const options = [
                  ...(props.tab === 'sent'
                    ? []
                    : [
                        {
                          label: 'Mensagens lidas',
                          value: 'read',
                          data: {},
                        },
                        {
                          label: 'Mensagens não lidas',
                          value: 'unread',
                          data: {},
                        },
                      ]),
                  {
                    label: 'Somente posts',
                    value: 'only_post',
                    data: {},
                  },
                  {
                    label: 'Somente mensagens',
                    value: 'only_messages',
                    data: {},
                  },
                ]

                return options
              }}
              center={{ x: 50, y: 100 }}
            />
          </div>
        </S.ContentHeader>

        <S.ContentBody>
          {loading ? (
            <MwLoader />
          ) : data.length < 1 ? (
            <S.EmptyMessageContainer children='Nenhuma mensagem encontrada' />
          ) : (
            data.map((item, index) => (
              <S.ContentItem
                key={index}
                readed={item.readed}
                onClick={() => viewMessage(item.id)}
              >
                <div onClick={(e) => e.stopPropagation()}>
                  <MwInput
                    type='checkbox'
                    checked={checkeds.find((e) => e.id === item.id)}
                    onChange={() => selectItems(item)}
                  />
                </div>

                <S.Important onClick={(e) => e.stopPropagation()}>
                  <input
                    type='checkbox'
                    checked={item.important}
                    onChange={(e) =>
                      onToggleImportant(e.target.checked, item.id)
                    }
                  />

                  <svg
                    viewBox='108.14 97.359 78.178 62.711'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                  >
                    <path
                      d='M 111.557 99.231 L 163.474 99.381 L 183.856 126.677 L 164.872 158.101 L 111.124 157.859 L 130.015 128.865 L 111.557 99.231 Z'
                      transform='matrix(0.999987, -0.00503, 0.00503, 0.999987, -0.6449, 0.741182)'
                    />
                  </svg>
                </S.Important>

                <MwEllipsisContainer style={{ width: 35 }}>
                  {item.type}
                </MwEllipsisContainer>

                <MwEllipsisContainer style={{ width: 140 }}>
                  {props.tab === 'sent'
                    ? item.recipients.join(', ')
                    : item.sender}
                </MwEllipsisContainer>

                <S.Subject>
                  <MwEllipsisContainer
                    style={{ flex: 1 }}
                    children={item.subject}
                  />
                  {item.file_count > 0 && (
                    <MwIcon type='semantic' icon='paperclip' width={16} />
                  )}
                </S.Subject>

                <S.EllipsisContainer style={{ flex: 1 }}>
                  {clearHTMLFromString(item.body).split('\n')[0]}
                </S.EllipsisContainer>

                <MwEllipsisContainer style={{ width: 114, textAlign: 'right' }}>
                  {item.date_formatted}
                </MwEllipsisContainer>
              </S.ContentItem>
            ))
          )}
        </S.ContentBody>
      </S.Content>

      <Toaster position='bottom-right' />
      <Modal modal={modal} />
    </S.Container>
  )
}

export default Grid
