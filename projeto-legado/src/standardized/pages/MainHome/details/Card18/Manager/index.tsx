import React, { useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import type { DropdownInterfaces, FiltersInterfaces } from '@mw-kit/mw-manager'
import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton, MwInput, MwTextArea } from '@mw-kit/mw-ui'
import { Icon } from 'semantic-ui-react'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import type { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import type { BodyInterface, DataInterface } from './interfaces'
import * as S from './styles'

type InteractionData = {
  id: string
  occurrence_type: string
  occurrence_date_time: string
}

const MOCK_ROWS: DataInterface[] = [
  {
    id: '102035',
    store: 'Verdemar - Savassi',
    route_name: 'Rota SP 1011',
    area: 'Minas Gerais...',
    executor: 'Rachel Patel',
    occurrence_date: '01/10/2020',
    occurrence_type: 'Ruptura',
    supervisor: 'Jeremy Ramirez',
    group: 'Grupo A',
    network: 'Rede 1',
    flag: 'Supermercado',
    has_observation: true,
    has_image: false,
  },
  {
    id: '102035',
    store: 'Hipermercado Extra C...',
    route_name: 'Rota MG 001',
    area: 'Belo Horizonte',
    executor: 'Julie Adams',
    occurrence_date: '01/10/2020',
    occurrence_type: 'Ruptura',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Hipermercado',
    has_observation: true,
    has_image: false,
  },
  {
    id: '102035',
    store: 'Supermercados BH Eld...',
    route_name: 'Rota 104562',
    area: 'Venda Nova',
    executor: 'Jô Licon',
    occurrence_date: '30/09/2020',
    occurrence_type: 'Produtos vencendo',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Supermercado',
    has_observation: true,
    has_image: true,
  },
  {
    id: '102035',
    store: 'Extra Contagem',
    route_name: 'Rota MG 15245',
    area: 'Interior de Minas',
    executor: 'Carlos Soares',
    occurrence_date: '01/10/2020',
    occurrence_type: 'Produtos com avaria',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Hipermercado',
    has_observation: true,
    has_image: true,
  },
  {
    id: '102035',
    store: 'Supernosso - Belo Ho...',
    route_name: 'Rota MG 541',
    area: 'SP Capital',
    executor: 'Marina Silva',
    occurrence_date: '01/10/2020',
    occurrence_type: 'Ruptura',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Supernosso Gourmet',
    has_observation: true,
    has_image: true,
  },
  {
    id: '102035',
    store: 'Supermercado Bh C...',
    route_name: 'Rota 104562',
    area: 'Rio de Janeiro',
    executor: 'Cristiano Sampaio',
    occurrence_date: '01/10/2020',
    occurrence_type: 'Aguardando equipagem',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Supermercado',
    has_observation: true,
    has_image: true,
  },
  {
    id: '102035',
    store: 'Apoio Castelo',
    route_name: 'Rota 104562',
    area: 'Rio de Janeiro',
    executor: 'Carme Adams',
    occurrence_date: '01/10/2020',
    occurrence_type: 'Ruptura',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Supermercado',
    has_observation: true,
    has_image: false,
  },
  {
    id: '102035',
    store: 'Assai Contagem',
    route_name: 'Rota 104562',
    area: 'Venda Nova',
    executor: 'Carlos Soares...',
    occurrence_date: '30/09/2020',
    occurrence_type: 'Aguardando equipagem',
    supervisor: 'George Williamson',
    group: 'Grupo B',
    network: 'Rede 2',
    flag: 'Hipermercado',
    has_observation: true,
    has_image: true,
  },
]

const applyClientFilters = (
  rows: DataInterface[],
  appliedFilters: FiltersInterfaces.AppliedFilter[],
) => {
  let result = [...rows]

  for (let i = 0; i < appliedFilters.length; i++) {
    const { name, value } = { ...appliedFilters[i] }

    if (name === 'supervisor') result = result.filter((r) => r.supervisor === value)
    if (name === 'group') result = result.filter((r) => r.group === value)
    if (name === 'network') result = result.filter((r) => r.network === value)
    if (name === 'flag') result = result.filter((r) => r.flag === value)
    if (name === 'occurrence_type') {
      result = result.filter((r) => r.occurrence_type === value)
    }
  }

  return result
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [selectedInteraction, setSelectedInteraction] = useState<InteractionData | null>(null)

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const closeDrawer = () => {
    setDrawerOpen(false)
  }

  const onOpenInteraction = (row: DataInterface) => {
    setSelectedInteraction({
      id: row.id,
      occurrence_type: row.occurrence_type,
      occurrence_date_time: `${row.occurrence_date} | 08:00`,
    })
    setSubject(`Assunto: ${row.occurrence_type}`)
    setMessage('')
    setDrawerOpen(true)
  }

  const onSend = () => {
    // Mock: apenas limpa os campos.
    setSubject('')
    setMessage('')
  }

  const data = useMemo(() => {
    let rows = [...MOCK_ROWS]

    if (search.trim().length > 0) {
      const q = search.trim().toLowerCase()
      rows = rows.filter((r) => {
        return [
          r.id,
          r.store,
          r.route_name,
          r.area,
          r.executor,
          r.occurrence_date,
          r.occurrence_type,
        ]
          .join(' ')
          .toLowerCase()
          .includes(q)
      })
    }

    rows = applyClientFilters(rows, appliedFilters)

    return rows
  }, [appliedFilters, search])

  const body: BodyInterface[] = useMemo(
    () =>
      data.map((row) => {
        const observationNode = row.has_observation ? (
          <Icon name='file outline' />
        ) : (
          ''
        )

        const imageNode = row.has_image ? <Icon name='image outline' /> : ''

        return {
          _original: row,
          id: row.id,
          store: row.store,
          route_name: row.route_name,
          area: row.area,
          executor: row.executor,
          occurrence_date: row.occurrence_date,
          occurrence_type: row.occurrence_type,
          observation: observationNode,
          image: imageNode,
        }
      }),
    [data],
  )

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Interagir',
        onClick: () => onOpenInteraction(item._original),
        rules: [],
      },
    ]
  }

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  return (
    <React.Fragment>
      <Toolbar
        filters={{ filters, setAppliedFilters, appliedFilters }}
        search={{ search, setSearch }}
        loading={false}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      >
        <MwButton size='small' content='Extrair Dados' onClick={onClickExtractData} />
      </Toolbar>

      <MwManager
        columns={header}
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        getItemMenu={getItemMenu}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={body.length} total={MOCK_ROWS.length} />

      {drawerOpen && (
        (typeof document !== 'undefined'
          ? createPortal(
            <S.InteractionOverlay>
              <S.InteractionPanel>
                <S.PanelHeader>
                  <S.PanelTitle>Comunicado Interno</S.PanelTitle>
                  <S.ActionIconButton type='button' aria-label='Fechar' onClick={closeDrawer}>
                    <Icon name='close' />
                  </S.ActionIconButton>
                </S.PanelHeader>

                <S.PanelBody>
                  <S.MetaBox>
                    <S.MetaLines>
                      <div>
                        <strong>ID:</strong> {selectedInteraction?.id}
                      </div>
                      <div>
                        <strong>Tipo:</strong> {selectedInteraction?.occurrence_type}
                      </div>
                      <div>
                        <strong>Data:</strong> {selectedInteraction?.occurrence_date_time}
                      </div>
                    </S.MetaLines>
                  </S.MetaBox>

                  <S.NoteRow>
                    <S.NoteBubble>
                      Mensagens com mais de 45 dias poderão estar disponíveis apenas no dispositivo.
                    </S.NoteBubble>
                    <S.Avatar src='/assets/images/profile.png' alt='Avatar' />
                  </S.NoteRow>

                  <S.Divider />

                  <S.MessageRow>
                    <S.MessageCard>
                      <S.MessageHeaderRow>
                        <S.MessageAvatar src='/assets/images/profile.png' alt='Avatar' />
                        <div style={{ flex: 1 }}>
                          <MwInput
                            placeholder='Assunto: Produtos vencidos'
                            value={subject}
                            maxLength={100}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                              setSubject(e.target.value)
                            }
                            style={{ width: '100%' }}
                          />
                        </div>
                      </S.MessageHeaderRow>

                      <S.MessageDivider />

                      <S.TextAreaWrapper>
                        <MwTextArea
                          placeholder='Já está sendo resolvido.'
                          value={message}
                          width='100%'
                          height='100%'
                          maxLength={100}
                          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                            setMessage(e.target.value)
                          }
                        />
                        <S.Counter>{message.length}/100</S.Counter>
                      </S.TextAreaWrapper>
                    </S.MessageCard>
                  </S.MessageRow>
                </S.PanelBody>

                <S.PanelFooter>
                  <MwButton size='small' content='Enviar' color='blue' onClick={onSend} />
                </S.PanelFooter>
              </S.InteractionPanel>
            </S.InteractionOverlay>,
            document.body,
          )
          : null)
      )}
    </React.Fragment>
  )
}

export default Manager
