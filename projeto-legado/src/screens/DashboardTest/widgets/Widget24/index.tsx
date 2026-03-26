import React, { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget24 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setOpen] = useState(false)
  const loading = useSelector((state: any) => state.w24.loading)
  const data = useSelector((state: any) => state.w24.data)

  useEffect(() => {
    const params = { segment_id }
    dispatch(getWidgetData(24, 'GET', '/v1/widgets/stats/24', {}, params))
  }, [dispatch, segment_id])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.series = get(data, 'chart.series')
      prevState.xAxis = get(data, 'chart.xAxis')
      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <Columns
        header={{
          text: 'Performance de Atendimento vs Média Móvel 21 dias',
          expand: true,
        }}
        loading={loading}
        options={options}
        onOpen={setOpen}
      />
      <Modal
        text='Performance de Atendimento vs Média Móvel 21 dias'
        options={options}
        onClose={setOpen}
        isOpen={isOpen}
      />
    </>
  )
}
