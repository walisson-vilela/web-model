import React from 'react'

import {
  Card,
  Grid,
  Header,
  Placeholder,
  SemanticTEXTALIGNMENTS,
} from 'semantic-ui-react'

import { WidgetHeader, WidgetHeaderProps } from '../WidgetHeader'

import { CustomSpan, SimpleDimmerWrapper, SimpleWrapper } from './styles'

interface SimpleProps {
  value: string
  text: string
  sufix?: string
  textAlign?: SemanticTEXTALIGNMENTS
  className?: string
  size?: 'small' | 'medium' | 'tiny' | 'large' | 'huge'
}

interface WidgetProps {
  header?: WidgetHeaderProps
  loading?: boolean
  main?: SimpleProps
  left?: SimpleProps
  right?: SimpleProps
  className?: string
}

interface SimpleDetailsProps {
  left: SimpleProps
  right: SimpleProps
}

export const Loading = () => (
  <Placeholder>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line length='medium' />
      <Placeholder.Line length='short' />
    </Placeholder.Paragraph>
  </Placeholder>
)

const SimpleDetails = ({ left, right }: SimpleDetailsProps) => (
  <Grid divided padded='vertically' className='details'>
    <Grid.Row columns='equal'>
      <Grid.Column textAlign='right'>
        <Header
          size={left.size || 'tiny'}
          textAlign={left.textAlign || 'center'}
          as='h6'
          className={left.className || ''}
        >
          {left.value}
          {left.sufix || ''}
          <CustomSpan textAlign={left.textAlign}>{left.text}</CustomSpan>
        </Header>
      </Grid.Column>
      <Grid.Column textAlign='left'>
        <Header
          size={right.size || 'tiny'}
          textAlign={right.textAlign || 'center'}
          as='h6'
          className={right.className || ''}
        >
          {right.value}
          {right.sufix || ''}
          <CustomSpan textAlign={right.textAlign}>{right.text}</CustomSpan>
        </Header>
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

export const Simple = ({
  header,
  loading,
  main,
  left,
  right,
  className,
}: WidgetProps) => (
  <SimpleDimmerWrapper.Dimmable
    as={Card}
    dimmed={loading}
    fluid
    raised
    className={className || ''}
  >
    <SimpleDimmerWrapper active={loading} content={<Loading />} />

    {header && (
      <WidgetHeader
        text={header.text}
        link={header.link}
        expand={header.expand}
        description={header.description}
        subTitle={header.subTitle}
      />
    )}

    <SimpleWrapper withHeader={!!header} fluid>
      <Header
        size='medium'
        textAlign={main.textAlign || 'center'}
        className={main.className || ''}
      >
        <span className={main.className || ''}> {main.value} </span>
        <span className={main.className}> {main.sufix || ''}</span>
      </Header>
      <Header size='small' textAlign='center'>
        {main.text}
      </Header>
      {left && right && <SimpleDetails left={left} right={right} />}
    </SimpleWrapper>
  </SimpleDimmerWrapper.Dimmable>
)
