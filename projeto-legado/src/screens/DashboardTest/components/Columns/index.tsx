import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Card, Grid, GridColumnProps, Placeholder } from 'semantic-ui-react'

import { WidgetHeader, WidgetHeaderProps } from '../WidgetHeader'

import { ColumnsDimmerWrapper, ColumnsWrapper } from './styles'

interface ColumnsProps {
  loading: boolean
  header: WidgetHeaderProps
  options: any
  menu?: GridColumnProps
  onOpen?: any
  onClose?: any
  className?: string
}

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

export const Columns = ({
  loading,
  header,
  options,
  menu,
  onOpen,
  className,
}: ColumnsProps) => {
  if (!options.chart.height) {
    options.chart.height = '80%'
  }

  options.chart.width = null

  return (
    <ColumnsDimmerWrapper.Dimmable
      as={Card}
      dimmed={loading}
      fluid
      raised
      className={className || ''}
    >
      <ColumnsDimmerWrapper active={loading} content={<Loading />} />
      <WidgetHeader
        text={header.text}
        link={header.link}
        expand={header.expand}
        onOpen={onOpen}
      />
      <ColumnsWrapper.Description>
        <Grid>
          <Grid.Row
            columns='equal'
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            stretched
          >
            <Grid.Column>
              <HighchartsReact Highcharts={Highcharts} options={options} />
            </Grid.Column>
            {menu && menu.children && <Grid.Column {...menu} str />}
          </Grid.Row>
        </Grid>
      </ColumnsWrapper.Description>
    </ColumnsDimmerWrapper.Dimmable>
  )
}
