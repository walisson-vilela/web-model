import React, { useCallback, useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import toast from 'react-hot-toast'

import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { ChartCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'

import { getData } from './services'

const TMOxPerformance = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { tmo_x_performance: data },
      setData,
    },
  } = useControlPanelContext()

  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data: responseData } = await getData(hierarchy, regions, teams)

      if (isObject(responseData)) {
        const parsedData: Highcharts.Options = {
          chart: {
            zoomType: 'xy',
            type: 'line',
            height: 180,
            width: 390,
          },
          colors: ['#1E63A3', '#66BB6A'],
          title: {
            text: '',
          },
          credits: {
            enabled: false,
          },
          xAxis: [
            {
              categories: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
              crosshair: true,
            },
          ],
          yAxis: [
            {
              title: {
                text: 'TMO',
                style: {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
              labels: {
                format: '{value}',
                style: {
                  color: 'black',
                },
              },
              tickPixelInterval: 100,
              softMax: 200,
              max: 200,
              endOnTick: false,
            },
            {
              title: {
                text: 'Performance',
                style: {
                  color: 'black',
                  fontWeight: 'bold',
                },
              },
              labels: {
                format: '{value}',
                style: {
                  color: '#1a1a1d',
                },
              },
              tickPixelInterval: 120,
              softMax: 200,
              max: 200,
              endOnTick: false,
              opposite: true,
            },
          ],
          tooltip: {
            shared: true,
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
          },
          series: [
            {
              name: 'Performance',
              type: 'column',
              yAxis: 1,
              data: responseData.chart.series[1].data,
            },
            {
              name: 'TMO',
              type: 'spline',
              data: responseData.chart.series[0].data,
            },
          ],
        }

        setData((prev) => ({ ...prev, tmo_x_performance: parsedData }))
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [lastRefresh])

  useEffect(() => {
    if (!data || !firstRender) loadData()
  }, [loadData])

  return (
    <ChartCard
      title='TMO x Performance'
      subtitle='S0'
      chart={
        !data || loading ? (
          <Placeholder.Block />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={data} />
        )
      }
    />
  )
}

export default TMOxPerformance
