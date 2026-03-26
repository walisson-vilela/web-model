import React, { useCallback, useEffect, useState } from 'react'

import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Dropdown, Table as ReactTable } from 'semantic-ui-react'

import { Manager, Moment } from '../../components'
import {
  exportAuthorizations,
  fetchAuthorizations
} from '../../redux/actions/AuthorizationsActions'

import { createRouteTab } from '../../routes'
import { Wrapper } from './style'

const now = moment()
const TYPES = {
  C: 'Novo Usuário',
  U: 'Alterar Plano',
}

const isAutomatic = (automatic) => {
  return automatic ? 'Autmático' : 'Manual'
}

const MonthFilter = ({ options, setOptions }) => {
  const [months, setMonths] = useState([])
  const [text, setText] = useState('Mês')

  useEffect(() => {
    const start = moment().startOf('month')
    let m = []

    for (let i = 0; i < 6; i++) {
      // get label
      const label = start.format('MMM/YYYY')

      // check first label
      if (start.format('YYYY-MM-DD') === options.date[0]) {
        setText(label)
      }

      // push month
      m.push({
        date: [
          start.startOf('month').format('YYYY-MM-DD'),
          start.endOf('month').format('YYYY-MM-DD'),
        ],
        label,
      })

      // come back a month
      start.subtract(1, 'month')
    }

    // set months
    setMonths(m)
  }, [])

  return (
    <Dropdown item text={text}>
      <Dropdown.Menu>
        <Dropdown.Header>Últimos 6 meses</Dropdown.Header>
        {months.map((month, index) => (
          <Dropdown.Item
            key={`month-${index}`}
            selected={month.date[0] === options.date[0]}
            content={month.label}
            onClick={() => {
              setText(month.label)
              setOptions((prevState) => ({ ...prevState, date: month.date }))
            }}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const HistoricAuthorizations = createRouteTab(
  () => {
    const dispatch = useDispatch()
    const authorizations = useSelector((state) => state.Authorizations.results)
    const [loadingExport, setLoadingExport] = useState(false)
    const [options, setOptions] = useState({
      status: 2,
      sort: 'id',
      direction: 'desc',
      date: [
        now.startOf('month').format('YYYY-MM-DD'),
        now.endOf('month').format('YYYY-MM-DD'),
      ],
    })

    const fetchAll = useCallback(() => {
      dispatch(fetchAuthorizations(options))
    }, [dispatch, options])

    const exportData = useCallback(async () => {
      setLoadingExport(true)
      try {
        const res = await dispatch(exportAuthorizations(options))
        if (res.success) {
          window.open(res.data.url)
        }
      } catch (e) {
        alert('Ocorreu um erro ao exportar os dados.')
      } finally {
        setLoadingExport(false)
      }
    }, [dispatch, options])

    useEffect(() => {
      fetchAll()
    }, [fetchAll])

    return (
      <Wrapper>
        <Manager
          table={'HistoricAuthorizations'}
          header={'Histórico de Aprovação'}
          subheader={
            'Abaixo visualize os dados históricos das autorizações concedidas'
          }
          result={authorizations}
          celled={false}
          onlyView={true}
          haveSearch={true}
          isLoading={authorizations.isLoading}
          onPageChange={(params) => setOptions({ ...options, ...params })}
          headerRow={
            <React.Fragment>
              <ReactTable.HeaderCell content={'Data'} />
              <ReactTable.HeaderCell content={'Autorização'} />
              <ReactTable.HeaderCell content={'Autorizado Por'} />
              <ReactTable.HeaderCell content={'Evento'} />
              <ReactTable.HeaderCell content={'Usuário'} />
              <ReactTable.HeaderCell content={'Função'} />
              <ReactTable.HeaderCell content={'Conta/Grupo'} />
              <ReactTable.HeaderCell content={'Plano'} />
              <ReactTable.HeaderCell content={'Solicitante'} />
            </React.Fragment>
          }
          renderBodyRow={(row) => {
            const role = row.people.role || {}
            const contractor = row.contractor || {}
            const people = row.people || {}
            const executed_by_people = row.executed_by_people || {}
            const created_by = row.created_by_people || {}

            return (
              <React.Fragment>
                <ReactTable.Cell
                  content={
                    <Moment date={row.date || ''} format={'DD/MM/YYYY'} />
                  }
                />
                <ReactTable.Cell content={isAutomatic(row.automatic)} />
                <ReactTable.Cell content={executed_by_people.name || ''} />
                <ReactTable.Cell content={TYPES[row.type]} />
                <ReactTable.Cell content={people.name || ''} />
                <ReactTable.Cell content={role.name || ''} />
                <ReactTable.Cell content={contractor.name || ''} />
                <ReactTable.Cell content={row.level_text} />
                <ReactTable.Cell content={created_by.name || ''} />
              </React.Fragment>
            )
          }}
          onFiltersToolbar={
            <MonthFilter options={options} setOptions={setOptions} />
          }
          crud={{
            add: (
              <Button
                loading={loadingExport}
                content={'Extrair dados'}
                onClick={exportData}
                primary
                size={'tiny'}
              />
            ),
            refresh: fetchAll,
          }}
          onGetFilters={[]}
          // filterTags={<ReproveAll checked={checked} cb={() => handleConfirmDelete(selected)}/>}
          // complement={<ApproveAll checked={checked} totals={totals} cb={handleConfirmApprove}/>}
        />
      </Wrapper>
    )
  },
  (props) => <>{props.children}</>
)

export default HistoricAuthorizations
