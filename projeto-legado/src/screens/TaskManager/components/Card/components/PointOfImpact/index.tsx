import React from 'react'

import { Grid, Header } from 'semantic-ui-react'

import { Card } from '../../../../interfaces'

import { Item, PointOfImpactContainer } from './styles'

interface CardProps {
  data: Card
}

export const PointOfImpact = ({ data }: CardProps): JSX.Element => {
  return (
    <PointOfImpactContainer>
      <Header size='medium'> Ponto de Atendimento </Header>
      <Grid divided padded='vertically' className='details'>
        <Grid.Row columns='equal'>
          <Grid.Column textAlign='center'>
            <Item>
              <strong> {data.impact.stores} </strong>
              <span> PDVs</span>
            </Item>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Item>
              <strong> {data.impact.regions} </strong>
              <span> Area</span>
            </Item>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Item>
              <strong> {data.impact.users} </strong>
              <span> Usuários</span>
            </Item>
          </Grid.Column>
          <Grid.Column
            textAlign='center'
            style={{
              padding: 0,
              margin: 0,
            }}
          >
            <Item>
              <strong> {data.impact.categories}</strong>
              <span> Linha Prod.</span>
            </Item>
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Item>
              <strong> {data.impact.skus}</strong>
              <span> SKUS</span>
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PointOfImpactContainer>
  )
}
