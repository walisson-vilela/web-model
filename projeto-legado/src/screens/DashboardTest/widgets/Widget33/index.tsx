import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'

import { getStartEndDayOfWeek } from '../../../../utils/DateTime'
import { Columns } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'
import { ButtonGroupWrapper, Content, Header, Modal, Wrapper } from './styles'

/** @deprecated */
const getData = (week, params) =>
  ((dispatch) => {
    const data = [getStartEndDayOfWeek(week)]
    dispatch(
      getWidgetData(33, 'POST', '/v1/widgets/stats/33', data, {
        segment_id: params,
      }),
    )
  }) as never
const LateralMenu = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [week, setWeek] = useState(0)

  useEffect(() => {
    dispatch(getData(week, segment_id))
  }, [week, dispatch, segment_id])

  return (
    <ButtonGroupWrapper>
      <Button.Group vertical size='mini' className='btn-wrapper'>
        <Button className='btn' active={week === 0} onClick={() => setWeek(0)}>
          S0
        </Button>
        <Button className='btn' active={week === 1} onClick={() => setWeek(1)}>
          S-1
        </Button>
        <Button className='btn' active={week === 2} onClick={() => setWeek(2)}>
          S-2
        </Button>
        <Button className='btn' active={week === 3} onClick={() => setWeek(3)}>
          S-3
        </Button>
      </Button.Group>
    </ButtonGroupWrapper>
  )
}

export const Widget33 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(mockData)
  const [isOpen, setIsOpen] = useState(false)
  const loading = useSelector((state: any) => state.w33.loading)
  const data = useSelector((state: any) => state.w33.data)
  //@ts-ignore
  let modalOptions = _.cloneDeep(options)
  modalOptions.chart.height = '80%'
  useEffect(() => {
    dispatch(getData(0, segment_id))
  }, [])

  useEffect(() => {
    setOptions((prevState) => {
      prevState.xAxis.categories = get(data, 'chart.xAxis.categories')
      prevState.series = get(data, 'chart.series')
      return { ...prevState }
    })
  }, [data])

  return (
    <>
      <Columns
        header={{
          text: 'Tempo de Atendimento (Distribuição)',
          expand: true,
          link: '/main/dashboard/home/attendance-details',
        }}
        menu={{
          textAlign: 'center',
          children: <LateralMenu segment_id={segment_id} />,
          width: 4,
        }}
        loading={loading}
        options={options}
        onOpen={setIsOpen}
      />
      <Modal open={isOpen} size='large'>
        <Header>
          <strong> Tempo de Atendimento (Distribuição)</strong>
          <Icon
            name='close'
            onClick={() => {
              setIsOpen(false)
            }}
          />
        </Header>
        <Content>
          <Wrapper>
            <Columns
              header={{
                text: '',
                expand: false,
              }}
              menu={{
                textAlign: 'center',
                children: <LateralMenu segment_id={segment_id} />,
                width: 4,
              }}
              loading={loading}
              options={modalOptions}
              onOpen={setIsOpen}
            />
          </Wrapper>
        </Content>
      </Modal>
    </>
  )
}
