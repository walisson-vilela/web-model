import React, { useState } from 'react'

import {
  FiltersInterfaces,
  MwManager,
  Toolbar,
  type ColumnInterface,
  type SortState
} from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../../components/MwModal'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'

const ClickableValue = (props: {
  color: string
  value: string
  onClick: () => void
}) => {
  const { color, value, onClick } = props

  return (
    <button
      type='button'
      onClick={onClick}
      style={{
        all: 'unset',
        color,
        fontWeight: 500,
        cursor: 'pointer',
      }}
    >
      {value}
    </button>
  )
}

type BelowProgrammedRow = {
  id: string
  pdvs: string
  scheduled_time: string
  realized_time: string
  performance: string
}

type AboveProgrammedRow = {
  id: string
  pdvs: string
  scheduled_time: string
  realized_time: string
  performance: string
}

const BELOW_PROGRAMMED_COLUMNS: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: "PDV's",
    key: 'pdvs',
    textAlign: 'left',
    width: 6,
    sortKey: 'pdvs',
  },
  {
    content: 'Tempo Programado',
    key: 'scheduled_time',
    textAlign: 'center',
    width: 3,
    sortKey: 'scheduled_time',
  },
  {
    content: 'Tempo Realizado',
    key: 'realized_time',
    textAlign: 'center',
    width: 3,
    sortKey: 'realized_time',
  },
  {
    content: 'Performance',
    key: 'performance',
    textAlign: 'center',
    width: 2,
    sortKey: 'performance',
  },
]

const BELOW_PROGRAMMED_ROWS: BelowProgrammedRow[] = [
  {
    id: '0001',
    pdvs: 'Verdemar - Savassi',
    scheduled_time: '01h:00min',
    realized_time: '00h:30min',
    performance: '88%',
  },
  {
    id: '0005',
    pdvs: 'Hipermercado Extra C...',
    scheduled_time: '01h:00min',
    realized_time: '00h:30min',
    performance: '90%',
  },
]

const ABOVE_PROGRAMMED_COLUMNS: ColumnInterface[] = [
  {
    content: 'ID',
    key: 'id',
    textAlign: 'left',
    width: 2,
    sortKey: 'id',
  },
  {
    content: "PDV's",
    key: 'pdvs',
    textAlign: 'left',
    width: 6,
    sortKey: 'pdvs',
  },
  {
    content: 'Tempo Programado',
    key: 'scheduled_time',
    textAlign: 'center',
    width: 3,
    sortKey: 'scheduled_time',
  },
  {
    content: 'Tempo Realizado',
    key: 'realized_time',
    textAlign: 'center',
    width: 3,
    sortKey: 'realized_time',
  },
  {
    content: 'Performance',
    key: 'performance',
    textAlign: 'center',
    width: 2,
    sortKey: 'performance',
  },
]

const ABOVE_PROGRAMMED_ROWS: AboveProgrammedRow[] = [
  {
    id: '0001',
    pdvs: 'Verdemar - Savassi',
    scheduled_time: '01h:00min',
    realized_time: '01h:40min',
    performance: '88%',
  },
  {
    id: '0002',
    pdvs: 'Hipermercado Extra C...',
    scheduled_time: '01h:00min',
    realized_time: '01h:32min',
    performance: '90%',
  },
  {
    id: '0003',
    pdvs: 'Carrefour - Contagem',
    scheduled_time: '00h:45min',
    realized_time: '01h:12min',
    performance: '86%',
  },
  {
    id: '0004',
    pdvs: 'Super Nosso - Belvedere',
    scheduled_time: '00h:50min',
    realized_time: '01h:15min',
    performance: '83%',
  },
  {
    id: '0005',
    pdvs: 'EPA - Centro',
    scheduled_time: '00h:40min',
    realized_time: '01h:05min',
    performance: '81%',
  },
  {
    id: '0006',
    pdvs: 'BH - Anchieta',
    scheduled_time: '00h:35min',
    realized_time: '00h:58min',
    performance: '84%',
  },
]

const BelowProgrammedContent = () => {
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortState | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        Selecione o colaborador para visualizar sua performance.
      </div>

      <Toolbar
        filters={{
          filters: [],
          setAppliedFilters,
          appliedFilters,
        }}
        search={{ search, setSearch }}
        loading={false}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      />

      <MwManager
        columns={BELOW_PROGRAMMED_COLUMNS}
        rows={BELOW_PROGRAMMED_ROWS}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

const AboveProgrammedContent = () => {
  const [search, setSearch] = useState<string>('')
  const [sort, setSort] = useState<SortState | null>(null)
  const [appliedFilters, setAppliedFilters] = useState<
    FiltersInterfaces.AppliedFilter[]
  >([])
  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        Selecione o colaborador para visualizar sua performance.
      </div>

      <Toolbar
        filters={{
          filters: [],
          setAppliedFilters,
          appliedFilters,
        }}
        search={{ search, setSearch }}
        loading={false}
        reloader={reload}
        pagination={{ setPage, isLastPage, paginator }}
      />

      <MwManager
        columns={ABOVE_PROGRAMMED_COLUMNS}
        rows={ABOVE_PROGRAMMED_ROWS}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [modal, setModal] = useState<ModalState>(null)

  const openBelowProgrammedModal = () => {
    setModal({
      title: 'Tempo Abaixo do Programado',
      titleColor: 'blue',
      size: 'large',
      content: <BelowProgrammedContent />,
      buttonType: 'MwButton',
      actions: [
        {
          content: 'OK',
          onClick: () => setModal(null),
        },
      ],
    })
  }

  const openAboveProgrammedModal = () => {
    setModal({
      title: 'Tempo Acima do Programado',
      titleColor: 'blue',
      size: 'large',
      content: <AboveProgrammedContent />,
      buttonType: 'MwButton',
      actions: [
        {
          content: 'OK',
          onClick: () => setModal(null),
        },
      ],
    })
  }

  const rows: BodyInterface[] = [
    {
      name: 'Rachel Patel',
      supervisor: 'Jeremy Ramirez',
      route_name: 'Rota SP 1011',
      pdvs_day: 8,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#19C172'
          value='2 (2,5%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#E23851'
          value='6 (35,0%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '6 (50%)',
    },
    {
      name: 'Julie Adams',
      supervisor: 'George Williamson',
      route_name: 'Rota MG 001',
      pdvs_day: 10,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#19C172'
          value='0 (0,0%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#E23851'
          value='8 (75,0%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '8 (20%)',
    },
    {
      name: 'Jô Licon',
      supervisor: 'George Williamson',
      route_name: 'Rota 104562',
      pdvs_day: 7,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#19C172'
          value='1 (2,0%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#19C172'
          value='0 (0,0%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '0 (0,0%)',
    },
    {
      name: 'Carlos Soares',
      supervisor: 'George Williamson',
      route_name: 'Rota MG 15245',
      pdvs_day: 12,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#19C172'
          value='2 (2,5%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#19C172'
          value='0 (0,0%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '0 (0,0%)',
    },
    {
      name: 'Marina Silva',
      supervisor: 'George Williamson',
      route_name: 'Rota MG 541',
      pdvs_day: 7,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#E23851'
          value='3 (5,8%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#E23851'
          value='4 (17,1%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '7 (30%)',
    },
    {
      name: 'Cristiano Sampaio',
      supervisor: 'George Williamson',
      route_name: 'Rota 104562',
      pdvs_day: 5,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#19C172'
          value='1 (3,3%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#E23851'
          value='4 (70,0%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '4 (70%)',
    },
    {
      name: 'Carme Adams',
      supervisor: 'George Williamson',
      route_name: 'Rota 104562',
      pdvs_day: 10,
      variation_goal: '5%',
      below_label: (
        <ClickableValue
          color='#19C172'
          value='1 (2,0%)'
          onClick={openBelowProgrammedModal}
        />
      ),
      above_label: (
        <ClickableValue
          color='#E23851'
          value='9 (30,0%)'
          onClick={openAboveProgrammedModal}
        />
      ),
      out_of_route: '9 (20%)',
    },
  ]

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)
  const [totalRegistries] = useState<number>(rows.length)

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
        <MwButton
          size='small'
          content='Extrair Dados'
          onClick={onClickExtractData}
        />
      </Toolbar>

      <MwManager
        columns={header}
        rows={rows}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={rows.length} total={totalRegistries} />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
