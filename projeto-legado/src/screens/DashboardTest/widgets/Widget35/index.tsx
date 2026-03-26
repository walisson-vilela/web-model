import React, { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'semantic-ui-react'

import { getCurrentDay } from '../../../../utils/DateTime'
import { Columns, Modal } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'

const LateralMenu = () => {
  return (
    <Button.Group>
      <Button> S0 </Button>
      <Button> S-1 </Button>
      <Button> S-2 </Button>
      <Button> S-3 </Button>
    </Button.Group>
  )
}

export const Widget35 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setIsOpen] = useState(false)
  const loading = useSelector((state: any) => state.w35.loading)
  const data = useSelector((state: any) => state.w35.data)

  useEffect(() => {
    const currentDay = getCurrentDay()
    dispatch(
      getWidgetData(
        35,
        'GET',
        '/v1/widgets/stats/35',
        {},
        { date: currentDay, segment_id },
      ),
    )
  }, [dispatch])

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
          text: 'Velocidade Média vs Média Móvel 21 dias',
          expand: true,
        }}
        options={options}
        loading={loading}
        onOpen={setIsOpen}
      />
      <Modal
        text='Velocidade Média vs Média Móvel 21 dias'
        isOpen={isOpen}
        onClose={setIsOpen}
        options={options}
      />
    </>
  )
}
