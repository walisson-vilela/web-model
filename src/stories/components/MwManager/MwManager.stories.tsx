import React from 'react'
import { useMemo, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import Button from '../../../components/Button'
import MwManager, {
  type ColumnInterface,
  Frame,
  type Row,
  type SortState,
} from '../../../components/MwManager/index'
import Toolbar from '../../../components/Toolbar'
import type {
  AppliedFilter,
  Filter,
} from '../../../components/MwManager/components/Toolbar/interfaces'

type PersonRow = {
  name: string
  height: number
  films: number
  vehicles: number
  starships: number
}

const toolbarFilters: Filter[] = [
  {
    label: 'Status',
    name: 'status',
    options: [
      { label: 'Ativo', value: 'ativo' },
      { label: 'Inativo', value: 'inativo' },
      { label: 'Pendente', value: 'pendente' },
    ],
  },
  {
    label: 'Categoria',
    name: 'categoria',
    options: [
      { label: 'Financeiro', value: 'financeiro' },
      { label: 'Operacional', value: 'operacional' },
      { label: 'Comercial', value: 'comercial' },
    ],
  },
]

const columns: ColumnInterface[] = [
  { content: 'Nome', key: 'name', width: 5, sortKey: 'name' },
  {
    content: 'Altura',
    key: 'height',
    width: 3,
    sortKey: 'height',
    textAlign: 'center',
    type: 'numeric',
  },
  {
    content: 'Filmes',
    key: 'films',
    width: 2,
    sortKey: 'films',
    textAlign: 'center',
    type: 'numeric',
  },
  {
    content: 'Veiculos',
    key: 'vehicles',
    width: 3,
    sortKey: 'vehicles',
    textAlign: 'center',
    type: 'numeric',
  },
  {
    content: 'Naves',
    key: 'starships',
    width: 3,
    sortKey: 'starships',
    textAlign: 'center',
    type: 'numeric',
  },
]

const allRows: PersonRow[] = [
  { name: 'Luke Skywalker', height: 172, films: 5, vehicles: 2, starships: 2 },
  { name: 'C-3PO', height: 167, films: 6, vehicles: 0, starships: 0 },
  { name: 'R2-D2', height: 96, films: 7, vehicles: 0, starships: 0 },
  { name: 'Darth Vader', height: 202, films: 4, vehicles: 0, starships: 1 },
  { name: 'Leia Organa', height: 150, films: 5, vehicles: 1, starships: 0 },
  { name: 'Owen Lars', height: 178, films: 3, vehicles: 0, starships: 0 },
  {
    name: 'Beru Whitesun lars',
    height: 165,
    films: 3,
    vehicles: 0,
    starships: 0,
  },
  { name: 'R5-D4', height: 97, films: 1, vehicles: 0, starships: 0 },
  { name: 'Biggs Darklighter', height: 183, films: 1, vehicles: 0, starships: 1 },
  { name: 'Obi-Wan Kenobi', height: 182, films: 6, vehicles: 1, starships: 5 },
]

const menuItems = (row: PersonRow) => {
  void row

  return [
    {
      content: 'Editar',
      onClick: () => undefined,
      rules: [],
      closeOnClick: true,
    },
    {
      content: 'Excluir',
      onClick: () => undefined,
      rules: [],
      closeOnClick: true,
    },
  ]
}

const MwManagerExample = () => {
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortState | null>(null)
  const [checkeds, setCheckeds] = useState<Row[]>([])
  const [search, setSearch] = useState('')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const defaultDateInterval = Toolbar.useDefaultDateIntervalState()
  const [dateInterval, setDateInterval] = useState(defaultDateInterval)
  const [appliedFiltersList, setAppliedFiltersList] = useState<AppliedFilter[]>(
    [],
  )

  const rows = allRows
  const checkedsState = useMemo(
    () => ({ checkeds, setCheckeds }),
    [checkeds, setCheckeds],
  )

  return (
    <Frame>
      <Toolbar
        filters={{
          filters: toolbarFilters,
          appliedFilters: appliedFiltersList,
          setAppliedFilters: setAppliedFiltersList,
        }}
        search={{
          search,
          setSearch,
        }}
        loading={false}
        reloader={() => undefined}
        pagination={{
          setPage,
          isLastPage: true,
        }}
        calendar={{
          date,
          setDate,
        }}
        calendarInterval={{
          dateInterval,
          setDateInterval,
        }}
        except={{
          paginator: true,
          calendar: false,
          calendarInterval: false,
        }}
        children={[
          <React.Fragment key='left-1'>Elemento 1</React.Fragment>,
          <React.Fragment key='left-2'>
            <Button appearance='bordered' size='tiny' content='Botão 1' />
          </React.Fragment>,
        ]}
        before={[
          <React.Fragment key='before-1'>Elemento 3</React.Fragment>,
        ]}
        after={[<React.Fragment key='after-1'>Elemento 4</React.Fragment>]}
      />
      <MwManager
        columns={columns}
        rows={rows}
        hasFilters={false}
        loading={false}
        page={page}
        setPage={setPage}
        sort={{ sort, setSort }}
        paginator={() => undefined}
        checkeds={checkedsState}
        getItemMenu={menuItems}
        itemMenuVerticalAlign='center'
        borderless={false}
      />
    </Frame>
  )
}

const meta = {
  id: 'MwManager',
  title: 'Components/MwManager',
  component: MwManager,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} as Meta<typeof MwManager>

type Story = StoryObj<typeof meta>

export const Example: Story = {
  render: () => <MwManagerExample />,
}

export default meta
