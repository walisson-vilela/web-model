import { useEffect, useState } from 'react'

import { get } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Icon, Placeholder } from 'semantic-ui-react'

import { getStartAndEndDayOfWeek } from '../../../../utils/DateTime'
import { Donut, WidgetHeader } from '../../components'
import { getWidgetData } from '../../redux/action'

import mockData from './mock.json'
import { Content, Header, Modal, WidgetDimmerWrapper, Wrapper } from './styles'

const Loading = () => (
  <Placeholder fluid>
    <Placeholder.Header image>
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
      <Placeholder.Line length='full' />
    </Placeholder.Paragraph>
  </Placeholder>
)

export const Widget14 = ({ segment_id }) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: any) => state.w13.loading)
  const data = useSelector((state: any) => state.w13.data)
  const loading1 = useSelector((state: any) => state.w14.loading)
  const data2 = useSelector((state: any) => state.w14.data)
  const [options, setOptions] = useState(mockData)
  const [options1, setOptions1] = useState(mockData)
  const [isOpen, setOpen] = useState(false)
  //@ts-ignore
  let modalOptions1 = _.cloneDeep(options)
  //@ts-ignore
  let modalOptions2 = _.cloneDeep(options1)

  modalOptions1.chart.height = '54%'
  modalOptions1.title.y = 80
  modalOptions1.title.style.fontSize = 18
  modalOptions2.chart.height = '54%'
  modalOptions2.title.y = 80
  modalOptions2.title.style.fontSize = 18

  useEffect(() => {
    const [start, end] = getStartAndEndDayOfWeek()
    dispatch(
      getWidgetData(13, 'GET', 'v1/widgets/stats/14', {}, { segment_id }),
    )
    dispatch(
      getWidgetData(
        14,
        'GET',
        'v1/widgets/stats/14',
        {},
        { start, end, segment_id },
      ),
    )
  }, [dispatch, segment_id])

  useEffect(() => {
    setOptions((prevState) => {
      const percentage = get(data, 'chart.series[0].data[0]')
      prevState.series[0].data = percentage || []
      prevState.title.text = `${percentage}%`

      return { ...prevState }
    })
  }, [data])

  useEffect(() => {
    setOptions1((prevState) => {
      const percentage = get(data2, 'chart.series[0].data[0]') || 0
      prevState.series[0].data = percentage || []
      prevState.title.text = `${percentage || 0}%`
      return { ...prevState }
    })
  }, [data2])

  return (
    <>
      <WidgetDimmerWrapper.Dimmable
        as={Card}
        dimmed={loading || loading1}
        fluid
        raised
      >
        <WidgetDimmerWrapper
          active={loading || loading1}
          content={<Loading />}
        />

        <WidgetHeader
          text='Performance Atendimento'
          expand={true}
          link='/main/dashboard/home/service-performance'
          className='performance-title'
          onOpen={setOpen}
        />
        <Wrapper itemsPerRow={2}>
          <Donut text='Dia Atual' options={options} isDay={true} data={data} />
          <Donut
            text='Semana Atual (S0)'
            options={options1}
            isDay={false}
            data={data2}
          />
        </Wrapper>
      </WidgetDimmerWrapper.Dimmable>

      <Modal open={isOpen} size='large'>
        <Header>
          <strong> Performance Atendimento </strong>
          <Icon
            name='close'
            onClick={() => {
              setOpen(false)
            }}
          />
        </Header>
        <Content>
          <Wrapper
            itemsPerRow={2}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
            }}
          >
            <Donut
              text='Dia Atual'
              options={modalOptions1}
              isDay={true}
              data={data}
            />
            <Donut
              text='Semana Atual (S0)'
              options={modalOptions2}
              isDay={false}
              data={data2}
            />
          </Wrapper>
        </Content>
      </Modal>
    </>
  )
}
