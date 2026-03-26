import { useEffect, useRef, useState } from 'react'

import {
  AppliedFilters,
  FiltersInterfaces,
  MenuFilters,
} from '@mw-kit/mw-manager'
import { Provider } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import {
  CardGroup,
  Dropdown,
  Grid,
  Header as SemanticHeader,
} from 'semantic-ui-react'

import Elipse from '../../assets/img/svgs/elipse.svg?react'
import { createRouteTab } from '../../routes'

import filters from './filters'
import store from './redux/reducer'
import {
  ApplyFilterItem,
  Container,
  FilterArea,
  FilterItem,
  Header,
  LeftContent,
  Menu,
} from './styles'
import './styles.css'
import {
  Widget14,
  Widget15,
  Widget16,
  Widget17,
  Widget18,
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
  Widget31,
  Widget32,
  Widget33,
  Widget34,
  Widget35,
  Widget36,
  Widget37,
} from './widgets'

const DashboardTest = createRouteTab(
  () => {
    const dashboardRef = useRef(null)
    const [appliedFilters, setAppliedFilters] = useState<
      FiltersInterfaces.AppliedFilter[]
    >([])
    const [segment_id, setSegmentId] = useState(undefined)

    useEffect(() => {
      if (appliedFilters && appliedFilters.length > 0) {
        setSegmentId(appliedFilters[0].value)
      }
    }, [appliedFilters])

    const makePDF = useReactToPrint({
      content: () => dashboardRef.current,
    })

    return (
      <Provider store={store()}>
        <Container ref={dashboardRef} className='page-wrapper'>
          <Header>
            <LeftContent>
              <h1> Painel de Atendimento</h1>
              <span>
                Faça a gestão dos indicadores de atendimento de sua equipe
              </span>
            </LeftContent>
            <Menu>
              {/*
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
                      */}
              <FilterArea>
                <ApplyFilterItem>
                  <AppliedFilters
                    appliedFilters={appliedFilters}
                    setAppliedFilters={setAppliedFilters}
                  />
                </ApplyFilterItem>
                <FilterItem>
                  <MenuFilters
                    filters={filters}
                    setAppliedFilters={setAppliedFilters}
                    appliedFilters={appliedFilters}
                  />
                </FilterItem>
              </FilterArea>
              <Dropdown
                className='wrapper-button'
                icon={null}
                trigger={<Elipse />}
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
          <Grid stackable stretched={false} className={'dashboard'}>
            <Grid.Row>
              <Grid.Column width={16}>
                <SemanticHeader size='medium'>
                  {' '}
                  Panorama, Performance e TMO{' '}
                </SemanticHeader>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={7} stretched>
                <Widget14 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column width={3} stretched>
                <Widget15 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column width={3} stretched>
                <Widget16 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column width={3} stretched fluid>
                <Widget17 segment_id={segment_id} />
                <Widget18 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='section2' stretched columns='equal'>
              <Grid.Column width={7} fluid streched>
                <CardGroup
                  stackable={true}
                  fluid
                  streched
                  itemsPerRow={2}
                  className='grid-group'
                >
                  <Widget19 segment_id={segment_id} />
                  <Widget20 segment_id={segment_id} />
                  <Widget21 segment_id={segment_id} />
                  <Widget22 segment_id={segment_id} />
                </CardGroup>
              </Grid.Column>
              <Grid.Column widths='equal' fluid>
                <Widget23 week='0' segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column widths='equal' fluid>
                <Widget23 week='1' segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns='equal'>
              <Grid.Column width={11}>
                <Widget24 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column widths='equal'>
                <Widget25 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row columns='equal'>
              <Grid.Column>
                <Widget26 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column>
                <Widget27 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column>
                <Widget28 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <SemanticHeader size='medium'>
                  Pilares do atendimento: Tempo e Deslocamento
                </SemanticHeader>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={4}>
                <Widget29 segment_id={segment_id} />
                <Widget30 segment_id={segment_id} />
              </Grid.Column>

              <Grid.Column width={12}>
                <Widget31 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='section3'>
              <Grid.Column width={4} className='pie'>
                <Widget32 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column width={12}>
                <Widget33 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='row4'>
              <Grid.Column width={4}>
                <Widget34 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column width={12}>
                <Widget35 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>

            <Grid.Row className='last-row'>
              <Grid.Column width={4} stretched>
                <Widget36 segment_id={segment_id} />
              </Grid.Column>
              <Grid.Column width={12}>
                <Widget37 segment_id={segment_id} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Provider>
    )
  },
  (props) => <>{props.children}</>,
)

export default DashboardTest
