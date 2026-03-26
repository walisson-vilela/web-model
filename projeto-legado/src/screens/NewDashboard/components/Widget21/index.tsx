import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'
import { currentDate } from '../../helpers/getCurrentDate'

import Loading from './components/Loading'
import { Container, Footer, Header } from './styles'

interface WidgetProps {
  segment_id: any
}

export function Widget21({ segment_id }: WidgetProps) {
  const dispatch = useDispatch()
  const { widget21 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget21

  const loadWidget21 = () => {
    dispatch(actions.getWidget21({ date: currentDate, segment_id }))
  }

  useEffect(() => {
    loadWidget21()
  }, [segment_id])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Header>
              <strong> {data.total_attendances || 0} </strong>
              <strong> Atend. Previsto (S0) </strong>
            </Header>
            <Footer>
              <div>
                <strong> {data.attendances || 0} </strong>
                <span> Atendimentos </span>
              </div>
              <div>
                <strong> {data.percentage || 0}% </strong>
                <span> Representação </span>
              </div>
            </Footer>
          </Container>
        </>
      )}
    </>
  )
}
