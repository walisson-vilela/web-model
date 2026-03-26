import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import { Dropdown, Icon, Modal } from 'semantic-ui-react'

import { createRouteTab } from '../../routes'
import * as actions from '../../store/modules/dashboard/actions'

import {
  AttendencesModal,
  DefaultModal,
  DistributionModal,
  DropdownAppliedFilters,
  DropdownFilters,
  ModalWidget,
  Widget14,
  Widget15,
  Widget16,
  Widget17,
  Widget19,
  Widget20,
  Widget21,
  Widget22,
  Widget23,
  Widget24,
  Widget25,
  Widget26,
  Widget27,
  Widget28,
  Widget29,
  Widget30,
  Widget32,
  Widget33,
  Widget34,
  Widget35,
  Widget36,
  Widget37,
  Widget38,
} from './components'
import { NewDashboardProvider } from './provider'
import {
  Container,
  Header,
  LeftContent,
  Menu,
  Section1,
  Section2,
  Section3,
  Section4,
  Section5,
  Section6,
  Section7,
  Section8,
  WidgetContent,
  WidgetContentSection5,
  Wrapper,
} from './styles'
import './styles.css'

export const NewDashboard = createRouteTab(() => {
  const dashboardRef = useRef(null)
  const dispatch = useDispatch()
  const [appliedFilters, setAppliedFilters] = useState([])
  const [firstLoading, setFirstLoading] = useState(true)
  const [segment_id, setSegmentId] = useState(undefined)

  const [widget13, setWidget13] = useState(false)
  const [widget14, setWidget14] = useState(false)
  const [widget15, setWidget15] = useState(false)
  const [widget16, setWidget16] = useState(false)
  const [widget17, setWidget17] = useState(false)
  const [widget21, setWidget21] = useState(false)
  const [widget22, setWidget22] = useState(false)
  const [widget23, setWidget23] = useState(false)
  const [widget24, setWidget24] = useState(false)
  const [widget25, setWidget25] = useState(false)
  const [widget26, setWidget26] = useState(false)
  const [widget27, setWidget27] = useState(false)
  const [widget28, setWidget28] = useState(false)
  const [widget29, setWidget29] = useState(false)
  const [widget30, setWidget30] = useState(false)
  const [widget31, setWidget31] = useState(false)
  const [widget32, setWidget32] = useState(false)
  const [widget33, setWidget33] = useState(false)
  const [widget34, setWidget34] = useState(false)
  const [widget35, setWidget35] = useState(false)
  const [modalOptions, setModalOptions] = useState({})
  const [options1, setOptions1] = useState({})
  const [obj, setObj] = useState({})
  const [options2, setOptions2] = useState({})

  let dt = new Date() // current date of week
  let currentWeekDay = dt.getDay()
  let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay
  let wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays))
  let wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6))
  const [firstDayWeek] = wkStart.toISOString().split('T')
  const [lastDayWeek] = wkEnd.toISOString().split('T')

  const filters = [
    {
      label: 'Canal',
      type: 'search',
      url: '/v1/tr/segments',
      field_search: 'name',
      field: 'id',
      option_label: (item) => item.name,
      option_value_field: 'id',
    },
  ]

  const handleSetOptions = (value: any) => {
    setModalOptions(value)
  }

  const makePDF = useReactToPrint({
    content: () => dashboardRef.current,
  })

  const loadData = useCallback(() => {
    let params = {}

    for (let appliedFilter of appliedFilters) {
      params[appliedFilter.field] = appliedFilter.selected_value
    }
    setFirstLoading(false)

    dispatch(actions.getWidget13({ segment_id: params }))
  }, [dispatch, appliedFilters])

  useEffect(() => {
    if (!firstLoading) {
      loadData()
    }
  }, [appliedFilters])

  return (
    <React.Fragment>
      <Container ref={dashboardRef} className='dashboard-container'>
        <Header>
          <LeftContent>
            <h1> Painel de Atendimento</h1>
            <span>
              Faça a gestão dos indicadores de atendimento de sua equipe
            </span>
          </LeftContent>
          <Menu>
            <DropdownAppliedFilters
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
              segment_Id={setSegmentId}
            />
            <DropdownFilters
              filters={filters}
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
            />
            <Dropdown
              className='wrapper-button'
              icon={null}
              trigger={
                <Icon name={'ellipsis vertical'} style={{ color: '#D6D6D6' }} />
              }
              floating
              direction={'left'}
            >
              <Dropdown.Menu className='button'>
                <Dropdown.Item
                  content={'Extrair PDF'}
                  onClick={makePDF}
                  className='button-pdf'
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu>
        </Header>

        <Section1>
          <h2> Panorama, Performance e TMO </h2>
          <Wrapper>
            <Widget14
              setOpen={setWidget13}
              onSetOptions1={setOptions1}
              onSetOptions2={setOptions2}
              filters={appliedFilters}
              segment_id={segment_id}
            />
            <Widget15
              setOpen={setWidget14}
              onHandleOptions={handleSetOptions}
              segment_id={segment_id}
            />
            <Widget16
              setOpen={setWidget15}
              onHandleOptions={handleSetOptions}
              segment_id={segment_id}
            />
            <Widget17
              setOpen={setWidget16}
              onHandleOptions={handleSetOptions}
              segment_id={segment_id}
            />
          </Wrapper>
        </Section1>

        <Section2 className='section2-container'>
          <WidgetContent>
            <Widget19 segment_id={segment_id} />
            <Widget20 segment_id={segment_id} />
            <Widget21 segment_id={segment_id} />
            <Widget22 segment_id={segment_id} />
          </WidgetContent>
          <Widget23
            setOpen={setWidget21}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
          <Widget24
            setOpen={setWidget22}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
        </Section2>

        <Section3 className='section3-container'>
          <Widget25
            setOpen={setWidget23}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
          <Widget26
            setOpen={setWidget24}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
        </Section3>

        <Section4 className='section4-container'>
          <Widget27
            setOpen={setWidget25}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
          <Widget28
            setOpen={setWidget26}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
          <Widget29
            setOpen={setWidget27}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
        </Section4>

        <Section5>
          <h2> Pilares do atendimento: Tempo e Deslocamento </h2>
          <WidgetContentSection5 className='pilares'>
            <Widget30 segment_id={segment_id} />
            <Widget32
              setOpen={setWidget29}
              onHandleOptions={handleSetOptions}
              segment_id={segment_id}
            />
          </WidgetContentSection5>
        </Section5>
        <Section6 className='pilares'>
          <Widget33
            segment_id={segment_id}
            setOpen={setWidget30}
            onHandleOptions={handleSetOptions}
          />
          <Widget34
            setOpen={setWidget31}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
        </Section6>
        <Section7 className='pilares'>
          <Widget35
            setOpen={setWidget32}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
          <Widget36
            setOpen={setWidget33}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
        </Section7>
        <Section8 className='pilares'>
          <Widget37 segment_id={segment_id} />
          <Widget38
            setOpen={setWidget35}
            onHandleOptions={handleSetOptions}
            segment_id={segment_id}
          />
        </Section8>
      </Container>

      <Modal open={widget13} size='large'>
        <ModalWidget
          isOpen={widget13}
          setOpen={setWidget13}
          title='Performance de Atendimento'
          options1={options1}
          options2={options2}
        />
      </Modal>

      <Modal open={widget14} size='large'>
        <DefaultModal
          isOpen={widget14}
          setOpen={setWidget14}
          title='Performance Projetado'
          options={modalOptions}
          className='modal-widget15'
          hasFooter={true}
          label1='S-1'
          label2='S0'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget15} size='large'>
        <DefaultModal
          isOpen={widget15}
          setOpen={setWidget15}
          title='% Justificativa de Atendimento'
          options={modalOptions}
          className='modal-widget15'
          hasFooter={true}
          label1='S-1'
          label2='S0'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget16} size='large'>
        <DefaultModal
          isOpen={widget16}
          setOpen={setWidget16}
          title='Raio X TMO SO'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget21} size='large'>
        <DefaultModal
          isOpen={widget21}
          setOpen={setWidget21}
          title='TMO vs Performance'
          subTitle='S-1'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget22} size='large'>
        <DefaultModal
          isOpen={widget22}
          setOpen={setWidget22}
          title='TMO vs Performance'
          subTitle='S0'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget23} size='large'>
        <DefaultModal
          isOpen={widget23}
          setOpen={setWidget23}
          title='Performance de Atendimento vs Média Móvel 21 dias'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget24} size='large'>
        <DefaultModal
          isOpen={widget24}
          setOpen={setWidget24}
          title='Top 20-Canal (SO)'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget25} size='large'>
        <DefaultModal
          isOpen={widget25}
          setOpen={setWidget25}
          title='Top 20 - Tipologia(SO)'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget26} size='large'>
        <DefaultModal
          isOpen={widget26}
          setOpen={setWidget26}
          title='Top 20 - Rede(SO)'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget27} size='large'>
        <DefaultModal
          isOpen={widget27}
          setOpen={setWidget27}
          title='Top 20 - Bandeira(SO)'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget29} size='large'>
        <AttendencesModal
          isOpen={Widget29}
          setOpen={setWidget29}
          title='Tempo de Atendimento (Desvio Padrão 2.0)'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget30} size='large'>
        <DefaultModal
          isOpen={widget30}
          setOpen={setWidget30}
          title='% Range Quality'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={true}
        />
      </Modal>

      <Modal open={widget31} size='large'>
        <DistributionModal
          isOpen={widget31}
          setOpen={setWidget31}
          title=' Tempo de Atendimento (Distribuição)'
          options={modalOptions}
          className='custom-with-buttons'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget32} size='large'>
        <DefaultModal
          isOpen={widget32}
          setOpen={setWidget32}
          title='Velocidade Média'
          subTitle='Deslocamento'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget33} size='large'>
        <DefaultModal
          isOpen={widget33}
          setOpen={setWidget33}
          title='Velocidade Média vs Média Móvel 21 dias'
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>

      <Modal open={widget35} size='large'>
        <DefaultModal
          isOpen={widget35}
          title='Velocidade Média vs Média Móvel 21 dias'
          setOpen={setWidget35}
          options={modalOptions}
          className='modal-widget15'
          hasBulletOptions={false}
        />
      </Modal>
    </React.Fragment>
  )
}, NewDashboardProvider)

export { default as Attendance } from './pages/Attendance'
export { default as AverageDistance } from './pages/AverageDistance'
export { default as AverageSpeed } from './pages/AverageSpeed'
export { default as Flag } from './pages/Flag'
export { default as JustificationDetails } from './pages/JustificationDetails'
export { default as Network } from './pages/Network'
export { default as Punctuality } from './pages/Punctuality'
export { default as RangeQuality } from './pages/RangeQuality'
export { default as Segmentation } from './pages/Segmentation'
export { default as ServicePerformance } from './pages/ServicePerformance'
export { default as Typology } from './pages/Typology'
export { default as XRayTMO } from './pages/XRayTMO'
