import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Simple } from '../../components/Simple'
import { getWidgetData } from '../../redux/action'

import './styles.css'

export const Widget19 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w19.loading)
  const data = useSelector((state: any) => state.w19.data)

  useEffect(() => {
    const params = { segment_id }
    dispatch(getWidgetData(19, 'GET', 'v1/widgets/stats/19', {}, params))
  }, [dispatch, segment_id])

  return (
    <Simple
      loading={loading}
      main={{
        text: 'Promotor Ativos',
        value: (data.total_actives || 0).toString(),
      }}
      left={{
        text: 'Ativos',
        value: (data.actives || 0).toString(),
      }}
      right={{
        text: 'Representação',
        value: (data.percentage || 0).toString(),
        sufix: '%',
      }}
      className='widget19'
    />
  )
}
