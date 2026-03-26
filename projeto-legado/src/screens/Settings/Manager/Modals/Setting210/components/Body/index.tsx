import React from 'react'

import { MwGrid, MwLoader } from '@mw-kit/mw-ui'

import { keys } from '../../../../../../../utils/Formatters'
import useContext from '../../context'

import * as Inputs from './inputs'
import * as Styles from './styles'

const Body = () => {
  const {
    hierarchies: [hierarchies],
    loading,
  } = useContext()

  return (
    <Styles.Container>
      {loading && <MwLoader filled zIndex={99} />}

      <MwGrid
        spacing={{
          top: 's3',
          right: 's4',
          bottom: 's3',
          left: 's4',
        }}
        borderless
      >
        <MwGrid.Row
          spacing={{
            top: '0',
            right: '0',
            bottom: 's3',
            left: '0',
          }}
          borderless
        >
          <MwGrid.Col>
            <Styles.Title children='ID: 210 - Criar Área de Atuação Automática por Pilar' />

            <div children='Utilize os campos para estabelecer as configurações e criar automaticamente as áreas por pilar' />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row
          cols={{
            spacing: {
              top: 's1',
              right: 's3',
              bottom: '0',
              left: 's3',
            },
            align: { content: { vertical: 'center' } },
          }}
          borderless
        >
          <MwGrid.Col width='2' children='Pilar' />

          <MwGrid.Col width='4' children='Defina a Área de Atuação por' />

          <MwGrid.Col width='4' children='Defina os Estados de Atuação' />
        </MwGrid.Row>

        {keys(hierarchies).map((key) => {
          const hierarchy = hierarchies[key]

          return (
            <MwGrid.Row
              key={key}
              cols={{
                spacing: {
                  top: 's4',
                  right: 's3',
                  bottom: 's4',
                  left: 's3',
                },
                align: { content: { vertical: 'center' } },
              }}
            >
              <MwGrid.Col width='2' children={hierarchy.name || '-'} />

              <MwGrid.Col width='4'>
                <Inputs.Regions id={hierarchy.id} />
              </MwGrid.Col>

              <MwGrid.Col width='4'>
                <Inputs.States id={hierarchy.id} />
              </MwGrid.Col>
            </MwGrid.Row>
          )
        })}
      </MwGrid>
    </Styles.Container>
  )
}

export default Body
