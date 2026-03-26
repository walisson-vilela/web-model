import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getStartAndEndDayOfWeek } from '../../../../utils/DateTime'
import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'
import './styles.css'

export const Widget18 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const loading = useSelector((state: any) => state.w18.loading)
  const data = useSelector((state: any) => state.w18.data)
  const [start, end] = getStartAndEndDayOfWeek()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    const params = { segment_id }
    dispatch(
      getWidgetData(18, 'GET', '/v1/widgets/stats/18', { start, end }, params),
    )
  }, [dispatch, segment_id])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.series = get(data, 'series') || []
      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <Columns
        header={{
          text: 'Raio X TMO S0',
          expand: true,
          link: '/main/dashboard/home/xray-tmo',
        }}
        loading={loading}
        options={options}
        onOpen={setOpen}
        className='widget18'
      />
      <Modal
        text='Raio X TMO S0'
        options={options}
        isOpen={isOpen}
        onClose={setOpen}
      />
    </>
  )
}
