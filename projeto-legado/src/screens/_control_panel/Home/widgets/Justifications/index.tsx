import { useCallback, useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../utils/Formatters'
import { isArray, isObject } from '../../../../../utils/Validators'
import { ChartCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'

import { getData } from './services'

const Justifications = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { justifications: data },
      setData,
    },
  } = useControlPanelContext()

  const history = useHistory()

  const [details, setDetails] = useState<1 | 0>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const { data: responseData } = await getData(
        hierarchy,
        regions,
        teams,
        details,
      )

      if (isObject(responseData)) {
        const parsedData: Highcharts.Options = {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 180,
            width: 280,
          },
          credits: {
            enabled: false,
          },
          accessibility: {
            point: {
              valueSuffix: '%',
            },
          },
          title: {
            text: '',
          },
          plotOptions: {
            pie: {
              colors: ['#309FDB', '#0F487F', '#1A485E', '#3CC37B', '#E23851'],
              cursor: 'pointer',
              showInLegend: !details,
              dataLabels: {
                enabled: false,
              },
            },
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            margin: 0,
            padding: 0,
          },
          series:
            isObject(responseData.chart) &&
            isArray(responseData.chart.series) &&
            responseData.chart.series.map((serie) => ({
              name: notEmptyStringOrDefault(serie.name),
              colorByPoint: booleanOrDefault(serie.colorByPoint),
              type: 'pie',
              data: isArray(serie.data)
                ? serie.data.map(
                    (item): Highcharts.PointOptionsObject => ({
                      name: notEmptyStringOrDefault(item.name, ''),
                      y: numberOrDefault(item.y, 0),
                      /* TODO: Solicitar ao back-end um endpoint para a exibição detalhada */
                      // events: {
                      //   click: !details
                      //     ? (event) => {
                      //         setDetails(
                      //           event.point.name === 'Justificado' ? 1 : 0
                      //         )
                      //       }
                      //     : undefined,
                      // },
                    }),
                  )
                : [],
            })),
        }

        setData((prev) => ({ ...prev, justifications: parsedData }))
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }, [lastRefresh, details])

  useEffect(() => {
    if (!data || !firstRender) loadData()
  }, [loadData])

  return (
    <ChartCard
      title='Justificativa de Atendimento (S0)'
      subtitle={details === null ? 'Percentual' : 'Motivos das Justificativas'}
      back={{
        condition: details !== null,
        action: () => setDetails(null),
      }}
      action={() =>
        history.push('/main/home/control-panel/justification-details')
      }
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

export default Justifications
