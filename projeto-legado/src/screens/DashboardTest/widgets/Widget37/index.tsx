import React, { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getCurrentDay } from '../../../../utils/DateTime'
import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget37 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setIsOpen] = useState(false)
  const loading = useSelector((state: any) => state.w37.loading)
  const data = useSelector((state: any) => state.w37.data)

  useEffect(() => {
    const currentDay = getCurrentDay()
    dispatch(
      getWidgetData(
        37,
        'GET',
        '/v1/widgets/stats/37',
        {},
        { date: currentDay, segment_id },
      ),
    )
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
          text: 'Distância Média vs Média Móvel 21 dias',
          expand: true,
        }}
        options={options}
        loading={loading}
        onOpen={setIsOpen}
      />
      <Modal
        text='Distância Média vs Média Móvel 21 dias'
        isOpen={isOpen}
        onClose={setIsOpen}
        options={options}
      />
    </>
  )
}
