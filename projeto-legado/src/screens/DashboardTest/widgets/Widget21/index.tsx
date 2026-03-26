import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Simple } from '../../components/Simple'
import { getWidgetData } from '../../redux/action'

import './styles.css'

export const Widget21 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w21.loading)
  const data = useSelector((state: any) => state.w21.data)

  useEffect(() => {
    const params = { segment_id }
    dispatch(getWidgetData(21, 'GET', 'v1/widgets/stats/21', {}, params))
  }, [dispatch, segment_id])

  return (
    <Simple
      loading={loading}
      main={{
        text: 'Atend. Previsto (S0)',
        value: (data.total_attendances || 0).toString(),
      }}
      left={{
        text: 'Atendimentos',
        value: (data.attendances || 0).toString(),
      }}
      right={{
        text: 'Representação',
        value: (data.percentage || 0).toString(),
        sufix: '%',
      }}
      className='widget21'
    />
  )
}
