import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'
import { currentDate } from '../../../Dashboard/helpers/getCurrentDate'

import Loading from './components/Loading'
import { Container, Footer, Header } from './styles'

interface WidgetProps {
  segment_id: any
}

export function Widget19({ segment_id }: WidgetProps) {
  const dispatch = useDispatch()
  const { widget19 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget19

  const loadWidget19 = () => {
    dispatch(actions.loadgetWidget19({ date: currentDate, segment_id }))
  }

  useEffect(() => {
    loadWidget19()
  }, [segment_id])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Header>
              <h4> {data.total_actives || 0} </h4>
              <strong> Promotor Ativos </strong>
            </Header>
            <Footer>
              <div>
                <strong> {data.actives || 0} </strong>
                <span> Ativos </span>
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
