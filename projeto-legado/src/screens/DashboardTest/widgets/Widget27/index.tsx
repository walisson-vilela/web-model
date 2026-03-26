import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getStartAndEndDayOfWeek } from '../../../../utils/DateTime'
import { Modal, TreeMap } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget27 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w27.loading)
  const data = useSelector((state: any) => state.w27.data)
  const [options, setOptions] = useState(mockData)
  const [start, end] = getStartAndEndDayOfWeek()
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    dispatch(
      getWidgetData(
        27,
        'GET',
        '/v1/widgets/stats/27',
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
          text: 'Top 20 - Rede (S0)',
          expand: true,
          link: '/main/dashboard/home/top-network',
        }}
        loading={loading}
        options={options}
        onOpen={setOpen}
      />
      <Modal
        text='Top 20 - Rede (S0)'
        options={options}
        onClose={setOpen}
        isOpen={isOpen}
      />
    </>
  )
}
