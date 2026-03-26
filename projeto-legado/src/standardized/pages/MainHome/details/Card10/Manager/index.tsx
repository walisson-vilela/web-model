import React, { useMemo, useState } from 'react'

import type { DropdownInterfaces, SortState } from '@mw-kit/mw-manager'
import { MwManager, Toolbar } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import ManagerCounter from '../../../../../../components/ManagerCounter'
import Modal, { ModalState } from '../../../../../../components/MwModal'
import { ManagerProps } from '../../../../../../screens/interfaces'

import filters from './filters'
import header from './header'
import { BodyInterface } from './interfaces'

type MetricCellProps = {
  value: string
  subtitle?: string
}

const MetricCell = (props: MetricCellProps) => {
  const { value, subtitle } = props

  return (
    <div style={{ lineHeight: 1.2 }}>
      <div style={{ fontWeight: 500 }}>{value}</div>
      {subtitle && (
        <div style={{ marginTop: 2, fontSize: 12, color: '#9AA0A6' }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}

type DotProps = {
  color: string
}

const Dot = (props: DotProps) => {
  const { color } = props

  return (
    <span
      style={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: 999,
        backgroundColor: color,
      }}
    />
  )
}

const IdcCell = (props: { value: string; color: string }) => {
  const { value, color } = props

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <span>{value}</span>
      <Dot color={color} />
    </span>
  )
}

const ProductivityEvolutionContent = (props: {
  name: string
  idc: string
  supervisor: string
}) => {
  const { name, idc, supervisor } = props

  const options = useMemo<Highcharts.Options>(() => {
    return {
      chart: {
        type: 'spline',
        backgroundColor: 'transparent',
        height: 260,
        spacing: [10, 10, 10, 10],
      },
      title: { text: undefined },
      xAxis: {
        categories: ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN'],
        lineColor: '#E5E7EB',
        tickColor: '#E5E7EB',
        labels: {
          style: { color: '#9AA0A6', fontSize: '12px' },
        },
      },
      yAxis: {
        min: 0,
        max: 100,
        tickPositions: [0, 25, 50, 75, 100],
        title: { text: undefined },
        gridLineColor: '#E5E7EB',
        labels: {
          style: { color: '#9AA0A6', fontSize: '12px' },
        },
      },
      legend: { enabled: false },
      tooltip: {
        valueSuffix: '%',
      },
      plotOptions: {
        series: {
          marker: { enabled: false },
          lineWidth: 2,
          states: { hover: { lineWidth: 2 } },
        },
      },
      series: [
        {
          type: 'spline',
          color: '#E23851',
          data: [55, 100, 25, 50, 75, 10],
        },
      ],
      credits: { enabled: false },
    }
  }, [])

  return (
    <div>
      <div style={{ fontSize: 18, fontWeight: 500, marginBottom: 4 }}>
        {name} &nbsp; IDC: {idc}
      </div>
      <div style={{ marginBottom: 16 }}>Supervisor: {supervisor}</div>

      <div
        style={{
          borderTop: '1px solid #E5E7EB',
          paddingTop: 16,
          marginTop: 8,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
          Evolução da Produtividade
        </div>
        <div style={{ color: '#9AA0A6', marginBottom: 12 }}>
          Dados apurados no ultimo dia de cada mês
        </div>

        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  )
}

const Manager = (props: ManagerProps) => {
  const { search, setSearch } = props.search
  const { sort, setSort } = props.sort
  const { appliedFilters, setAppliedFilters } = props.appliedFilters

  const [modal, setModal] = useState<ModalState>(null)

  const [page, setPage] = useState<number>(1)
  const [isLastPage] = useState<boolean>(true)

  const paginator = () => {
    // Mantemos apenas uma página por enquanto.
  }

  const reload = () => {
    // Quando a API for definida, este método será responsável por recarregar os dados.
  }

  const onClickExtractData = () => {
    // A integração da extração de dados será implementada quando o contrato da API estiver definido.
  }

  const rows: BodyInterface[] = useMemo(
    () => [
      {
        name: 'Rachel Patel',
        supervisor: 'Jeremy Ramirez',
        start_use: 'Menos de 1 mês',
        visit: <MetricCell value='35%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='25%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='57%' subtitle='(230/500)' />,
        model_store: <MetricCell value='43%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='80%' subtitle='(275/365)' />,
        productivity: '25%',
        idc_value: '2.3',
        idc_color: '#E23851',
        idc: <IdcCell value='2.3' color='#E23851' />,
      },
      {
        name: 'Julie Adams',
        supervisor: 'George Williamson',
        start_use: '1 mês',
        visit: <MetricCell value='80%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='50%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='73%' subtitle='(230/500)' />,
        model_store: <MetricCell value='60%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='15%' subtitle='(275/365)' />,
        productivity: '80%',
        idc_value: '8.8',
        idc_color: '#62C462',
        idc: <IdcCell value='8.8' color='#62C462' />,
      },
      {
        name: 'Jô Licon',
        supervisor: 'George Williamson',
        start_use: '2 meses',
        visit: <MetricCell value='57%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='35%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='55%' subtitle='(230/500)' />,
        model_store: <MetricCell value='57%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='35%' subtitle='(275/365)' />,
        productivity: '70%',
        idc_value: '7.1',
        idc_color: '#F1C40F',
        idc: <IdcCell value='7.1' color='#F1C40F' />,
      },
      {
        name: 'Carlos Soares',
        supervisor: 'George Williamson',
        start_use: '3 meses',
        visit: <MetricCell value='80%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='25%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='57%' subtitle='(230/500)' />,
        model_store: <MetricCell value='35%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='25%' subtitle='(275/365)' />,
        productivity: '70%',
        idc_value: '7.0',
        idc_color: '#F1C40F',
        idc: <IdcCell value='7.0' color='#F1C40F' />,
      },
      {
        name: 'Marina Silva',
        supervisor: 'George Williamson',
        start_use: '4 meses',
        visit: <MetricCell value='80%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='35%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='43%' subtitle='(230/500)' />,
        model_store: <MetricCell value='35%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='70%' subtitle='(275/365)' />,
        productivity: '30%',
        idc_value: '3.0',
        idc_color: '#E23851',
        idc: <IdcCell value='3.0' color='#E23851' />,
      },
      {
        name: 'Cristiano Sampaio',
        supervisor: 'George Williamson',
        start_use: '5 meses',
        visit: <MetricCell value='57%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='35%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='55%' subtitle='(230/500)' />,
        model_store: <MetricCell value='57%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='35%' subtitle='(275/365)' />,
        productivity: '70%',
        idc_value: '7.1',
        idc_color: '#F1C40F',
        idc: <IdcCell value='7.1' color='#F1C40F' />,
      },
      {
        name: 'Carme Adams',
        supervisor: 'George Williamson',
        start_use: '6 meses',
        visit: <MetricCell value='80%' subtitle='(1.000/1.500)' />,
        service_time: <MetricCell value='50%' subtitle='(1.500/3.000)' />,
        survey: <MetricCell value='73%' subtitle='(230/500)' />,
        model_store: <MetricCell value='60%' subtitle='(200/300)' />,
        absenteeism: <MetricCell value='80%' subtitle='(275/365)' />,
        productivity: '80%',
        idc_value: '8.8',
        idc_color: '#62C462',
        idc: <IdcCell value='8.8' color='#62C462' />,
      },
    ],
    [],
  )

  const getItemMenu = (item: BodyInterface): DropdownInterfaces.Item[] => {
    return [
      {
        content: 'Evolução de Produtividade',
        onClick: () => {
          setModal({
            title: 'Dados de validação do Check',
            titleColor: 'blue',
            size: 'large',
            content: (
              <ProductivityEvolutionContent
                name={item.name}
                idc={item.idc_value}
                supervisor={item.supervisor}
              />
            ),
            buttonType: 'MwButton',
            actions: [
              {
                content: 'OK',
                onClick: () => setModal(null),
              },
            ],
          })
        },
        rules: [],
      },
    ]
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
        sort={{ sort: sort as SortState | null, setSort }}
        hasFilters={appliedFilters.length > 0 || search.length > 0}
        loading={false}
        paginator={paginator}
        page={page}
        setPage={setPage}
        getItemMenu={getItemMenu}
      />

      <ManagerCounter partial={rows.length} total={rows.length} />

      <Modal modal={modal} />
    </React.Fragment>
  )
}

export default Manager
