import { useCallback, useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

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
      data: { tmo_x_ray: data },
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
        const parsedData: Highcharts.Options = {
          chart: {
            type: 'bar',
            width: 390,
            height: 70,
          },
          title: {
            text: '',
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: ['TMO+', 'TMO-'],
            opposite: true,
          },
          yAxis: {
            min: 0,
            max: 100,
            title: {
              text: null,
            },
            labels: {
              overflow: 'justify',
            },
          },
          legend: {
            enabled: false,
          },
          series: [
            {
              name: 'Total',
              type: 'bar',
              data: [
                {
                  color: responseData.chart.series[0].color,
                  y: responseData.chart.series[0].data[0],
                },
                {
                  color: responseData.chart.series[1].color,
                  y: responseData.chart.series[1].data[0],
                },
              ],
            },
          ],
        }

        setData((prev) => ({ ...prev, tmo_x_ray: parsedData }))
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
      half
      title='TMO Raio X (S0)'
      action={() => history.push('/main/home/control-panel/xray-tmo')}
      chart={
        !data || loading ? (
          <Placeholder.Block half />
        ) : (
          <HighchartsReact highcharts={Highcharts} options={data} />
        )
      }
      paddingless
    />
  )
}

export default TMOxPerformance
