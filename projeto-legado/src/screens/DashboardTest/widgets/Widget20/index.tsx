import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Simple } from '../../components/Simple'
import { getWidgetData } from '../../redux/action'

import './styles.css'

export const Widget20 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w20.loading)
  const data = useSelector((state: any) => state.w20.data)

  useEffect(() => {
    const params = { segment_id }
    dispatch(getWidgetData(20, 'GET', 'v1/widgets/stats/20', {}, params))
  }, [dispatch, segment_id])

  return (
    <Simple
      loading={loading}
      main={{
        text: 'PDVs Cobertos (S0)',
        value: (data.total_stores || 0).toString(),
      }}
      left={{
        text: 'PDVs',
        value: (data.stores || 0).toString(),
      }}
      right={{
        text: 'Representação',
        value: (data.percentage || 0).toString(),
        sufix: '%',
      }}
      className='widget20'
    />
  )
}
