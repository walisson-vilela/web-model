import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import * as actions from '../../../../store/modules/dashboard/actions'
import logo from '../../assets/img/Icones_Expandir.svg'

import Loading1 from './components/Loading1'
import Loading2 from './components/Loading2'
import { Atendences, Container, Pontuality } from './styles'
import './styles.css'

export function Widget30({ segment_id }) {
  const dispatch = useDispatch()
  const { widget30, widget31 } = useSelector((state: any) => state.dashboard)
  const { loading, data } = widget30
  const { loading: loading1, data: data1 } = widget31

  const loadWidget30 = () => {
    dispatch(actions.getWidget30({ segment_id }))
  }

  const loadWidget31 = () => {
    dispatch(actions.getWidget31({ segment_id }))
  }
  useEffect(() => {
    loadWidget30()
  }, [segment_id])

  useEffect(() => {
    loadWidget31()
  }, [segment_id])
  return (
    <Container className='container-attendences'>
      {loading ? (
        <Loading1 />
      ) : (
        <Atendences className='attendences1'>
          <header>
            <div className='content'>
              <strong> Atendimento </strong>
              <Link to='/main/dashboard/home/attendance-details'>
                <img src={logo} alt='logo' />
              </Link>
            </div>
          </header>
          <div>
            <strong> {data.avg_duration || '00:00'} </strong>
            <strong> Tempo Médio </strong>
          </div>
        </Atendences>
      )}
      {loading1 ? (
        <Loading2 />
      ) : (
        <Pontuality className='attendences2'>
          <header>
            <div className='content'>
              <strong> Pontualidade </strong>

              <Link
                className='hide-on-print'
                to='/main/dashboard/home/punctuality'
              >
                <img src={logo} alt='logo' />
              </Link>
            </div>
          </header>
          <div>
            <strong>
              {' '}
              {data1.performed || 0}/{data1.planned || 0} (
              {data1.percentage || 0}%){' '}
            </strong>
            <strong> Atendimentos </strong>
          </div>
        </Pontuality>
      )}
    </Container>
  )
}
