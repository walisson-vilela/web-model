import { useCallback, useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useHistory } from 'react-router-dom'

import { notEmptyStringOrDefault } from '../../../../../utils/Formatters'
import { isArray, isObject } from '../../../../../utils/Validators'
import { ChartCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'
import { HighchartsOptionsModified } from '../../interfaces'

import defaultChart from './defaultChart'
import { getData } from './services'

const AverageSpeed = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { average_speed: data },
      setData,
    },
  } = useControlPanelContext()

  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data: responseData } = await getData(hierarchy, regions, teams)

      if (isObject(responseData)) {
        const parsedData: HighchartsOptionsModified = {
          chart: {
            alignTicks: false,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'gauge',
            height: 180,
            width: 180,
          },
          credits: {
            enabled: false,
          },
          title: {
            text: '',
          },
          pane: {
            startAngle: -150,
            endAngle: 150,
          },
          yAxis: {
            min: 0,
            max: 60,
            tickPixelInterval: 120,
            tickPosition: 'inside',
            tickColor: '#263046',
            tickLength: 10,
            tickInterval: 5,
            minorTickLength: 5,
            minorTickInterval: 1,
            minorTickColor: '#263046',
            labels: {
              rotation: 'auto',
              distance: -23,
              style: {
                fontSize: '12px',
              },
            },
            plotBands: [
              {
                from: 0,
                to: 5,
                color: '#DF5353',
                thickness: 10,
              },
              {
                from: 5,
                to: 10,
                color: '#DF6F45',
                thickness: 10,
              },
              {
                from: 10,
                to: 15,
                color: '#DE8B37',
                thickness: 10,
              },
              {
                from: 15,
                to: 20,
                color: '#DEA729',
                thickness: 10,
              },
              {
                from: 20,
                to: 25,
                color: '#DDC31B',
                thickness: 10,
              },
              {
                from: 25,
                to: 30,
                color: '#DDDF0D',
                thickness: 10,
              },
              {
                from: 30,
                to: 35,
                color: '#C6DA15',
                thickness: 10,
              },
              {
                from: 35,
                to: 40,
                color: '#B0D41C',
                thickness: 10,
              },
              {
                from: 40,
                to: 45,
                color: '#99CF24',
                thickness: 10,
              },
              {
                from: 45,
                to: 50,
                color: '#82CA2C',
                thickness: 10,
              },
              {
                from: 50,
                to: 55,
                color: '#6CC433',
                thickness: 10,
              },
              {
                from: 55,
                to: 60,
                color: '#55BF3B',
                thickness: 10,
              },
            ],
          },
          series:
            isObject(responseData.chart) &&
            isArray(responseData.chart.series) &&
            responseData.chart.series.map((serie) => ({
              name: notEmptyStringOrDefault(serie.name),
              type: 'gauge',
              dataLabels: {
                format: '{y} km/h',
                borderWidth: 0,
                color:
                  (Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color) ||
                  '#333333',
                style: {
                  fontSize: '16px',
                },
              },
              tooltip: {
                valueSuffix:
                  isObject(serie.tooltip) &&
                  notEmptyStringOrDefault(serie.tooltip.valueSuffix, ''),
              },
              data: isArray(serie.data) ? serie.data : [],
            })),
        }

        setData((prev) => ({ ...prev, average_speed: parsedData }))
      }
    } catch (error) {
      setData((prev) => ({ ...prev, average_speed: defaultChart }))
    } finally {
      setLoading(false)
    }
  }, [lastRefresh])

  useEffect(() => {
    if (!data || !firstRender) loadData()
  }, [loadData])

  return (
    <ChartCard
      title='Velocidade Média'
      subtitle='Deslocamento (km/h)'
      action={() => history.push('/main/home/control-panel/average-speed')}
      chart={
        !data || loading ? (
          <Placeholder.Circle />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={data} />
        )
      }
    />
  )
}

export default AverageSpeed
