import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Simple } from '../../components/Simple'
import { getWidgetData } from '../../redux/action'

export const Widget30 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w30.loading)
  const data = useSelector((state: any) => state.w30.data)

  useEffect(() => {
    dispatch(
      getWidgetData(30, 'GET', '/v1/widgets/stats/30', {}, { segment_id }),
    )
  }, [dispatch, segment_id])

  return (
    <Simple
      header={{
        text: 'Pontualidade',
        expand: false,
        link: '/main/dashboard/home/punctuality',
      }}
      main={{
        value: `${data.performed}/${data.planned} (${data.percentage}%)`,
        text: 'Atendimentos',
      }}
      loading={loading}
    />
  )
}
