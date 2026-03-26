import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Pie } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export function Widget32({ segment_id }) {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w32.loading)
  const data = useSelector((state: any) => state.w32.data)
  const [options, setOptions] = useState(mockData)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    dispatch(
      getWidgetData(32, 'GET', '/v1/widgets/stats/32', {}, { segment_id }),
    )
  }, [dispatch])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.series = get(data, 'chart.series')
      return { ...prevState }
    })
  }, [data, segment_id])

  return (
    <>
      <Pie
        header={{
          text: '% Range Quality',
          expand: true,
          link: '/main/dashboard/home/range-quality',
        }}
        options={options}
        loading={loading}
        onOpen={setOpen}
      />
      <Modal
        text='% Range Quality'
        options={options}
        onClose={setOpen}
        isOpen={isOpen}
      />
    </>
  )
}
