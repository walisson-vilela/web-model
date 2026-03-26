import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Simple } from '../../components/Simple'
import { getWidgetData } from '../../redux/action'

export const Widget29 = ({ segment_id }) => {
  const dispatch = useDispatch()

  const loading = useSelector((state: any) => state.w29.loading)
  const data = useSelector((state: any) => state.w29.data)

  useEffect(() => {
    dispatch(
      getWidgetData(29, 'GET', '/v1/widgets/stats/29', {}, { segment_id }),
    )
  }, [dispatch, segment_id])

  return (
    <Simple
      header={{
        text: 'Atendimento',
        expand: false,
        link: '/main/dashboard/home/attendance-details',
      }}
      main={{
        text: 'Tempo Médio ',
        value: (data.avg_duration || 0).toString(),
      }}
      loading={loading}
    />
  )
}
