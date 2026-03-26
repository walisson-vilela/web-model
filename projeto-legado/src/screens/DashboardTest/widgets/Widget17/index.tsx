import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { getCurrentDay } from '../../../../utils/DateTime'
import { Simple } from '../../components'
import { getWidgetData } from '../../redux/action'

import './styles.css'

export const Widget17 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const params = { segment_id }
  const loading = useSelector((state: any) => state.w17.loading)
  const data = useSelector((state: any) => state.w17.data)

  useEffect(() => {
    const date = getCurrentDay()
    const params = { segment_id }
    dispatch(getWidgetData(17, 'GET', 'v1/widgets/stats/17', { date }, params))
  }, [dispatch, segment_id])

  return (
    <Simple
      header={{
        text: 'TMO - Dia Atual',
      }}
      main={{
        text: '',
        value: (data.tmo || 0).toString(),
        sufix: '%',
        textAlign: 'left',
        className: 'big',
      }}
      loading={loading}
      className='widget17'
    />
  )
}
