import React from 'react'

import { Grid } from 'semantic-ui-react'

import { Card } from '../../../../interfaces'

import { Container, Item } from './styles'

interface CardProps {
  data: Card
}

export const Details = ({ data }: CardProps): JSX.Element => {
  return (
    <Container>
      <Grid>
        <Grid.Row columns='equal'>
          <Grid.Column>
            <Item>
              <strong>
                {' '}
                - Obrigatóriedade: <span>
                  {' '}
                  {data.required ? 'Sim' : 'Não'}
                </span>{' '}
              </strong>
            </Item>
            <Item>
              <strong>
                - Comportamento: <span>{data.behavior || ''}</span>
              </strong>
            </Item>
            <Item>
              <strong>
                {' '}
                - Qtd Formulário: <span>{data.form_count || 0}</span>
              </strong>
            </Item>
          </Grid.Column>
          <Grid.Column>
            <Item active={data.active}>
              <strong>
                {' '}
                - Status: <div />
                <span> {data.active ? 'Ativa' : 'Inativa'} </span>
              </strong>
            </Item>
            <Item>
              <strong>
                {' '}
                - Frequencia: <span>{data.frequency}</span>
              </strong>
            </Item>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}
