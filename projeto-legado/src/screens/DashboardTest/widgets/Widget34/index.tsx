import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { Modal, Pie } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget34 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setIsOpen] = useState(false)
  const loading = useSelector((state: any) => state.w34.loading)
  const data = useSelector((state: any) => state.w34.data)

  useEffect(() => {
    dispatch(
      getWidgetData(34, 'GET', '/v1/widgets/stats/34', {}, { segment_id }),
    )
  }, [dispatch])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.series = get(data, 'chart.series')
      return { ...prevState }
    })
  }, [options])
  return (
    <>
      <Pie
        header={{
          text: 'Velocidade Média',
          expand: true,
          link: '/main/dashboard/home/average-speed',
        }}
        options={options}
        loading={loading}
        onOpen={setIsOpen}
      />
      <Modal
        text='Velocidade Média'
        isOpen={isOpen}
        onClose={setIsOpen}
        options={options}
      />
    </>
  )
}
