import React, { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getStartEndDayOfWeek } from '../../../../utils/DateTime'
import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget23 = ({ week, segment_id }) => {
  const dispatch = useDispatch()
  const id = `23S${week}`
  const key = `w${id}`
  const [options, setOptions] = useState(mockData)
  const [isOpen, setOpen] = useState(false)
  const loading = useSelector((state: any) => state[key]['loading'])
  const data = useSelector((state: any) => state[key]['data'])

  useEffect(() => {
    const { start, end } = getStartEndDayOfWeek(week)
    const params = { start, end, segment_id }
    dispatch(getWidgetData(id, 'GET', 'v1/widgets/stats/23', {}, params))
  }, [dispatch, week, segment_id])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.title.text = 'S' + (week === '0' ? '0' : '-' + week)
      prevState.series = get(data, 'chart.series') || []

      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <Columns
        loading={loading}
        header={{
          text: 'TMO vs Performance',
          expand: true,
        }}
        options={options}
        onOpen={setOpen}
      />
      <Modal
        text='TMO vs Peformance'
        options={options}
        onClose={setOpen}
        isOpen={isOpen}
      />
    </>
  )
}
