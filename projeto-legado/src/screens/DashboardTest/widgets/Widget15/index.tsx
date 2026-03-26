import React, { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getPreviousandCurrentWeek } from '../../../../utils/DateTime'
import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget15 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setOpen] = useState(false)

  const loading = useSelector((state: any) => state.w15.loading)
  const data = useSelector((state: any) => state.w15.data)

  useEffect(() => {
    const data = getPreviousandCurrentWeek()
    const params = { segment_id }
    dispatch(getWidgetData(15, 'POST', 'v1/widgets/stats/15', data, params))
  }, [dispatch, segment_id])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.series = get(data, 'chart.series.data') || []
      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <Columns
        header={{
          text: 'Performance Projetado',
          expand: true,
        }}
        loading={loading}
        options={options}
        onOpen={setOpen}
      />

      <Modal
        text='Performance Projetado'
        options={options}
        isOpen={isOpen}
        onClose={setOpen}
      />
    </>
  )
}
