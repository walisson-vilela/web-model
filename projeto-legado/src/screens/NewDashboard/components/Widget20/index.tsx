import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../../../store/modules/dashboard/actions'
import { currentDate } from '../../../Dashboard/helpers/getCurrentDate'

import Loading from './components/Loading'
import { Container, Footer, Header } from './styles'

interface WidgetProps {
  segment_id: any
}

export function Widget20({ segment_id }: WidgetProps) {
  const dispatch = useDispatch()
  const { widget20 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget20

  const loadWidget20 = () => {
    dispatch(actions.getWidget20({ date: currentDate, segment_id }))
  }

  useEffect(() => {
    loadWidget20()
  }, [segment_id])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Container>
            <Header>
              <strong> {data.total_stores || 0} </strong>
              <strong> PDVs Cobertos (S0) </strong>
            </Header>
            <Footer>
              <div>
                <strong> {data.stores || 0} </strong>
                <span> PDVs </span>
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
