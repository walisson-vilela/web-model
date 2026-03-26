import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'
import { currentDate } from '../../helpers/getCurrentDate'

import Loading from './components/Loading'
import { Container, Footer, Header } from './styles'

interface WidgetProps {
  segment_id: any
}

export function Widget22({ segment_id }: WidgetProps) {
  const dispatch = useDispatch()
  const { widget22 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget22

  const loadWidget22 = () => {
    dispatch(actions.getWidget22({ date: currentDate, segment_id }))
  }

  useEffect(() => {
    loadWidget22()
  }, [segment_id])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Header>
              <strong> {data.total_routes || 0} </strong>
              <strong> Qtd. Roteiro (S0) </strong>
            </Header>
            <Footer>
              <div>
                <strong> {data.routes || 0} </strong>
                <span> Rotas </span>
              </div>
              <div>
                <strong> {data.percentage || 0} % </strong>
                <span> Representação </span>
              </div>
            </Footer>
          </Container>
        </>
      )}
    </>
  )
}
