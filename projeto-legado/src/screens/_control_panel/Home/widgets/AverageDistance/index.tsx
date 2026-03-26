import { useCallback, useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import { useHistory } from 'react-router-dom'

import { ErrorStyle, ToasterContent } from '../../../../../components/Toaster'
import { isObject } from '../../../../../utils/Validators'
import { ChartCard, Placeholder } from '../../components'
import { useControlPanelContext } from '../../context'

import { getData } from './services'
import { Content } from './styles'

const AverageDistance = () => {
  const {
    filters: {
      filters: { hierarchy, regions, teams },
    },
    lastRefresh: { lastRefresh },
    firstRender,
    data: {
      data: { average_distance: data },
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
        setData((prev) => ({ ...prev, average_distance: responseData }))
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
      title='Distância Média'
      subtitle='Em km'
      paddingless
      action={() => history.push('/main/home/control-panel/average-distance')}
      chart={
        <Content>
          <div>
            {!data || loading ? (
              <Placeholder.Footer size={20} />
            ) : (
              <p>{data.distance_travel_planned}</p>
            )}
            <p>Planejado</p>
          </div>

          <div>
            {!data || loading ? (
              <Placeholder.Footer size={20} />
            ) : (
              <p>{data.distance_travel}</p>
            )}
            <p>Real</p>
          </div>
        </Content>
      }
    />
  )
}

export default AverageDistance
