import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'

import { getPreviousandCurrentWeek } from '../../../../utils/DateTime'
import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

export const Widget16 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setOpen] = useState(false)
  const loading = useSelector((state: any) => state.w16.loading)
  const data = useSelector((state: any) => state.w16.data)

  useEffect(() => {
    const data = getPreviousandCurrentWeek()
    const params = { segment_id }
    dispatch(getWidgetData(16, 'POST', 'v1/widgets/stats/16', data, params))
  }, [dispatch, segment_id])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.series[0].data = get(data, 'chart.series[1].data') || []
      prevState.series[1].data = get(data, 'chart.series[0].data') || []
      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <Columns
        header={{
          text: '% Justicativa Atendimento',
          expand: true,
          link: '/main/dashboard/home/justification-details',
        }}
        loading={loading}
        options={options}
        onOpen={setOpen}
      />
      <Modal
        text='% Justicativa Atendimento'
        options={options}
        isOpen={isOpen}
        onClose={setOpen}
      />
    </>
  )
}
