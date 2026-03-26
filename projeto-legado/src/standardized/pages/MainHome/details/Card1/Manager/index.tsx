import React, { useState } from 'react'
import styled from 'styled-components'

import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import { Table, TableBody, TableCell, TableRow } from 'semantic-ui-react'

import Bullet from '../../../../../../components/Bullet'
import ManagerColumnPopup from '../../../../../../components/ManagerColumnPopup'
import ManagerCounter from '../../../../../../components/ManagerCounter'
import { ManagerProps } from '../../../../../../screens/interfaces'
import * as PeoplePopupStyles from '../../../../../../screens/NewDashboard/components/PopupDetails/PeopleDetails/styled'
import * as PopupStyles from '../../../../../../screens/NewDashboard/components/PopupDetails/styled'
import Initials from '../../../../Home/components/Header/styles/Initials'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'
import { status as statusLabels } from './labels'

type PeoplePopupData = {
  avatar: string
  name: string
  function: string
  registration: string
  document: string
  re: string
  idc: string
  address: string
  phones: string
  journey: string
  leader_name: string
  leader_phones: string
  last_connection: string
}

const PeopleAvatar = styled(Initials)`
  width: 64px;
  height: 64px;
  font-size: 20px;
  font-weight: 600;
`

const PeopleDetailsPopup = (props: { data: PeoplePopupData }) => {
  const { data } = { ...props }

  return (
    <PopupStyles.Container>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell width={4}>
              {data.avatar ? (
                <PeoplePopupStyles.RoundedImage $src={data.avatar} />
              ) : (
                <PeopleAvatar name={data.name} />
              )}
            </TableCell>
            <TableCell width={12}>
              <PopupStyles.FlexContainer>
                <div>
                  <div>
                    <b>{data.name}</b>
                  </div>
                  <div>
                    Função: {data.function} | Matrícula: {data.registration}
                  </div>
                  <div>
                    CPF: {data.document} | RE: {data.re}
                  </div>
                </div>

                <PeoplePopupStyles.MarginXAuto>
                  <div>
                    <PeoplePopupStyles.NormalH5>IDC</PeoplePopupStyles.NormalH5>
                  </div>
                  <div>
                    <h2>
                      <b>{data.idc}</b>
                    </h2>
                  </div>
                </PeoplePopupStyles.MarginXAuto>
              </PopupStyles.FlexContainer>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4}>
              <strong>Endereço:</strong>
            </TableCell>
            <TableCell width={12}>{data.address}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4}>
              <strong>Telefone:</strong>
            </TableCell>
            <TableCell width={12}>{data.phones}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4}>
              <strong>Jornada do dia:</strong>
            </TableCell>
            <TableCell width={12}>{data.journey}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4}>
              <strong>Líder direto:</strong>
            </TableCell>
            <TableCell width={12}>
              <div>{data.leader_name}</div>
              <div>{data.leader_phones}</div>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell width={4}>
              <strong>Última Conexão:</strong>
            </TableCell>
            <TableCell width={12}>{data.last_connection}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </PopupStyles.Container>
  )
}

const NameWithPopup = (props: { name: string; data: PeoplePopupData }) => {
  const { name, data } = { ...props }

  return (
    <ManagerColumnPopup
      position='right center'
      offset={[12, 0]}
      triggerDisplay='block'
      trigger={
        <span style={{ display: 'block', width: '100%', cursor: 'pointer' }}>
          {name}
        </span>
      }
      getContent={async () => <PeopleDetailsPopup data={data} />}
    />
  )
}

const defaultPopupData = (name: string, role: string): PeoplePopupData => ({
  avatar: '',
  name,
  function: role,
  registration: '150689',
  document: '014.681.685-70',
  re: '10457845',
  idc: '53,2 %',
  address:
    'Avenida João Cesar de Oliveira 2167 - Novo Eldorado Contagem - Minas Gerais - Cep:32044-120',
  phones: '(31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050',
  journey: '08:00 as 18:00  -  Pausa Total: 01 h e 12 m',
  leader_name: 'Eder Feliciano da Silva',
  leader_phones: '(31) 2564-5971 | (31) 9 8499-1830 | (31) 9 8500-0050',
  last_connection: 'hoje (29/09/2022) as 17:30:25',
})

const MOCK_ROWS: BodyInterface[] = [
  {
    name: (
      <NameWithPopup
        name='Rachel Patel'
        data={defaultPopupData('Rachel Patel', 'Promotor')}
      />
    ),
    role: 'Promotor',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    inactivation_reason: '-',
    supervisor: 'Jeremy Ramirez',
    route_name: 'Rota SP 1011',
    operation_area: 'Minas Gerais',
    wallet: 'Sim',
    planned_route: 'Sim',
  },
  {
    name: (
      <NameWithPopup
        name='Julie Adams'
        data={defaultPopupData('Julie Adams', 'Promotor')}
      />
    ),
    role: 'Promotor',
    status: 'active',
    status_label: (
      <Bullet
        content={statusLabels.active.name}
        color={statusLabels.active.color}
      />
    ),
    inactivation_reason: '-',
    supervisor: 'George Williamson',
    route_name: 'Rota MG 001',
    operation_area: 'Belo Horizonte',
    wallet: 'Sim',
    planned_route: 'Não',
  },
  {
    name: (
      <NameWithPopup
        name='Jô Licon'
        data={defaultPopupData('Jô Licon', 'Promotor')}
      />
    ),
    role: 'Promotor',
    status: 'temporary_inactive',
    status_label: (
      <Bullet
        content={statusLabels.temporary_inactive.name}
        color={statusLabels.temporary_inactive.color}
      />
    ),
    inactivation_reason: 'Férias',
    supervisor: 'George Williamson',
    route_name: '-',
    operation_area: '-',
    wallet: '-',
    planned_route: '-',
  },
  {
    name: (
      <NameWithPopup
        name='Carlos Soares'
        data={defaultPopupData('Carlos Soares', 'Promotor')}
      />
    ),
    role: 'Promotor',
    status: 'temporary_inactive',
    status_label: (
      <Bullet
        content={statusLabels.temporary_inactive.name}
        color={statusLabels.temporary_inactive.color}
      />
    ),
    inactivation_reason: 'Férias',
    supervisor: 'George Williamson',
    route_name: 'Rota MG 15245',
    operation_area: 'Interior de Minas',
    wallet: 'Sim',
    planned_route: 'Sim',
  },
  {
    name: (
      <NameWithPopup
        name='Cristiano Sampaio'
        data={defaultPopupData('Cristiano Sampaio', 'Promotor')}
      />
    ),
    role: 'Promotor',
    status: 'temporary_inactive',
    status_label: (
      <Bullet
        content={statusLabels.temporary_inactive.name}
        color={statusLabels.temporary_inactive.color}
      />
    ),
    inactivation_reason: 'Aguardando equipamento',
    supervisor: 'George Williamson',
    route_name: 'Rota MG 541',
    operation_area: 'SP Capital',
    wallet: 'Sim',
    planned_route: 'Sim',
  },
]

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [body] = useState<BodyInterface[]>(MOCK_ROWS)
  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)
  const [totalRegistries] = useState<number>(MOCK_ROWS.length)

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
        rows={body}
        sort={{ sort, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
      />

      <ManagerCounter partial={body.length} total={totalRegistries} />
    </React.Fragment>
  )
}

export default Manager
