import { useEffect } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../../../store/modules/dashboard/actions'
import logo from '../../assets/img/Icones_Expandir.svg'
import { currentDate } from '../../helpers/getCurrentDate'

import Loading from './Loading'
import { Container, Footer, Header } from './styles'
import './styles.css'

export function Widget37({ segment_id }) {
  const dispatch = useDispatch()
  const { widget37 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget37
  console.log('Widget37', data)

  const loadWidget37 = () => {
    dispatch(actions.getWidget37({ date: currentDate, segment_id }))
  }

  const categories = get(data, 'chart.xAxis[0].categories')
  const avg = get(data, 'chart.series[0].data')

  useEffect(() => {
    loadWidget37()
  }, [segment_id])
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container className='avg-distance'>
          <section>
            <strong className='title'> Distância Média (KM)</strong>

            <Link
              className='hide-on-print'
              to='/main/dashboard/home/average-distance'
            >
              <img src={logo} alt='logo' />
            </Link>
          </section>
          <Header>
            <strong>
              {' '}
              {data.distance_travel_avg
                ? data.distance_travel_avg.toFixed(2)
                : 0}{' '}
            </strong>
            <strong> Distância Média </strong>
          </Header>
          <Footer>
            <div>
              <strong>
                {' '}
                {data.distance_travel_max
                  ? data.distance_travel_max.toFixed(2)
                  : 0}{' '}
              </strong>
              <span className='title-content'> Maior Distância </span>
            </div>
            <div>
              <strong>
                {' '}
                {data.distance_travel_min
                  ? data.distance_travel_min.toFixed(2)
                  : 0}{' '}
              </strong>
              <span> Menor Distância </span>
            </div>
          </Footer>
        </Container>
      )}
    </>
  )
}
