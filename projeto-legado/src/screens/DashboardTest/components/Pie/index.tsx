import React from 'react'

import HighchartsReact from 'highcharts-react-official'
import { Card, Placeholder } from 'semantic-ui-react'

import { WidgetHeader, WidgetHeaderProps } from '../WidgetHeader'

import { PieDimmerWrapper, PieWrapper } from './styles'

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

export const Pie = ({ loading, header, options, onOpen }: TreeMapProps) => {
  if (!options.chart.height) {
    options.chart.height = '64%'
  }

  options.chart.width = null
  return (
    <PieDimmerWrapper.Dimmable as={Card} dimmed={loading} fluid raised>
      <PieDimmerWrapper active={loading} content={<Loading />} />

      <WidgetHeader
        text={header.text}
        link={header.link}
        expand={header.expand}
        onOpen={onOpen}
        description={header.description}
        details={header.details}
      />

      <PieWrapper.Description>
        <HighchartsReact options={options} />
      </PieWrapper.Description>
    </PieDimmerWrapper.Dimmable>
  )
}
