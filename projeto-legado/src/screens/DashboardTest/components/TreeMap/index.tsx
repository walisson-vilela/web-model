import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsModules from 'highcharts/highcharts-more'
import treemap from 'highcharts/modules/treemap'
import { Card, Placeholder } from 'semantic-ui-react'

import { WidgetHeader, WidgetHeaderProps } from '../WidgetHeader'

import { TreeMapDimmerWrapper, TreeMapWrapper } from './styles'

HighchartsModules(Highcharts)
treemap(Highcharts)

interface TreeMapProps {
  loading: boolean
  header: WidgetHeaderProps
  options: any
  onOpen?: any
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

export const TreeMap = ({ loading, header, options, onOpen }: TreeMapProps) => {
  if (!options.chart.height) {
    options.chart.height = '64%'
  }

  options.chart.width = null

  return (
    <TreeMapDimmerWrapper.Dimmable as={Card} dimmed={loading} fluid raised>
      <TreeMapDimmerWrapper active={loading} content={<Loading />} />

      <WidgetHeader
        text={header.text}
        link={header.link}
        expand={header.expand}
        onOpen={onOpen}
      />

      <TreeMapWrapper.Description>
        <HighchartsReact options={options} />
      </TreeMapWrapper.Description>
    </TreeMapDimmerWrapper.Dimmable>
  )
}
