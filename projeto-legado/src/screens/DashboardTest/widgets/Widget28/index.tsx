import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getStartAndEndDayOfWeek } from '../../../../utils/DateTime'
import { Modal, TreeMap } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget28 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w28.loading)
  const data = useSelector((state: any) => state.w28.data)
  const [options, setOptions] = useState(mockData)
  const [start, end] = getStartAndEndDayOfWeek()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    dispatch(
      getWidgetData(
        28,
        'GET',
        '/v1/widgets/stats/28',
        {},
        { start, end, segment_id },
      ),
    )
  }, [dispatch, segment_id])

  useEffect(() => {
    //setData
    setOptions((prevState) => {
      prevState.series[0].data = get(data, 'chart.series[0].data')
      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <TreeMap
        header={{
          text: 'Top 20 - Bandeira (S0)',
          expand: true,
          link: '/main/dashboard/home/top-flag',
        }}
        loading={loading}
        options={options}
        onOpen={setOpen}
      />
      <Modal
        text='Top 20 - Bandeira (S0)'
        options={options}
        onClose={setOpen}
        isOpen={isOpen}
      />
    </>
  )
}
