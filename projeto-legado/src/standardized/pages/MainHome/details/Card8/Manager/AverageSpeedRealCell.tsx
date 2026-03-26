import React, { useMemo } from 'react'

import { Popup } from 'semantic-ui-react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import * as S from './AverageSpeedTooltipStyles'

type AverageSpeedRealCellProps = {
  value: string
}

const buildSeriesFill = (baseColor: string): Highcharts.GradientColorObject => {
  return {
    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
    stops: [
      [0, Highcharts.color(baseColor).setOpacity(0.95).get('rgba') as string],
      [1, Highcharts.color(baseColor).setOpacity(0.05).get('rgba') as string],
    ],
  }
}

const buildChartOptions = (): Highcharts.Options => {
  return {
    chart: {
      type: 'areaspline',
      backgroundColor: 'transparent',
      height: 85,
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 22, 0],
    },
    title: { text: undefined },
    credits: { enabled: false },
    xAxis: {
      visible: false,
    },
    yAxis: {
      visible: false,
    },
    tooltip: { enabled: false },
    legend: {
      align: 'left',
      verticalAlign: 'bottom',
      x: 8,
      y: 4,
      itemStyle: {
        color: '#ffffff',
        fontSize: '11px',
        fontWeight: '400',
      },
      symbolHeight: 10,
      symbolWidth: 10,
      symbolRadius: 2,
    },
    plotOptions: {
      series: {
        animation: false,
        marker: { enabled: false },
        lineWidth: 0,
        states: { hover: { enabled: false } },
      },
      area: {
        fillOpacity: 0.9,
      },
      areaspline: {
        fillOpacity: 0.9,
      },
    },
    series: [
      {
        type: 'areaspline',
        name: 'Ideal',
        color: '#1E73BE',
        fillColor: buildSeriesFill('#1E73BE'),
        data: [2, 3, 2.5, 3.5, 2.8, 3.2, 2.6, 3.1, 2.9, 3.4],
      },
      {
        type: 'areaspline',
        name: 'Real',
        color: '#C8627D',
        fillColor: buildSeriesFill('#C8627D'),
        data: [1.2, 1.6, 1.4, 2.1, 1.7, 1.9, 1.3, 1.8, 1.5, 1.7],
      },
    ],
  }
}

const TooltipContent = () => {
  const options = useMemo(() => buildChartOptions(), [])

  return (
    <S.TooltipContainer>
      <S.TooltipHeader>
        <S.TooltipTitle>Velocidade Média Real</S.TooltipTitle>
      </S.TooltipHeader>

      <S.TooltipMeta>
        <div>Perda acumulada:</div>
        <S.TooltipMetaValue>0h e 25 m</S.TooltipMetaValue>
      </S.TooltipMeta>

      <S.ChartArea>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { width: '100%' } }}
        />
      </S.ChartArea>
    </S.TooltipContainer>
  )
}

const AverageSpeedRealCell = ({ value }: AverageSpeedRealCellProps) => {
  return (
    <React.Fragment>
      <S.TooltipGlobalStyles />
      <Popup
        on='hover'
        hoverable
        position='left center'
        offset={[0, -10]}
        className='average-speed-tooltip'
        content={<TooltipContent />}
        trigger={<span style={{ display: 'inline-block', width: '100%' }}>{value}</span>}
      />
    </React.Fragment>
  )
}

export default AverageSpeedRealCell
