import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getCurrentDay } from '../../../../utils/DateTime'
import { Simple } from '../../components/Simple'
import { getWidgetData } from '../../redux/action'

export const Widget36 = ({ segment_id }) => {
  const currentDay = getCurrentDay()
  const loading = useSelector((state: any) => state.w36.loading)
  const data = useSelector((state: any) => state.w36.data)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getWidgetData(
        36,
        'GET',
        '/v1/widgets/stats/36',
        {},
        { date: currentDay, segment_id },
      ),
    )
  }, [dispatch, segment_id])

  return (
    <Simple
      className='last-card'
      header={{
        text: 'Distância Média (KM)',
        link: '/main/dashboard/home/average-distance',
        expand: false,
      }}
      main={{
        text: 'Distância Média',
        value: (data.distance_travel_avg || 0).toString(),
      }}
      right={{
        text: 'Maior Distância',
        value: (data.distance_travel_max || 0).toString(),
      }}
      left={{
        text: 'Menor Distânca',
        value: (data.distance_travel_min || 0).toString(),
      }}
    />
  )
}
