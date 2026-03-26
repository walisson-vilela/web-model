import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styles'

import * as Inputs from './inputs'

const ComplementaryData = () => {
  return (
    <>
      <MwGrid
        borderless
        spacing={{ left: 's4', top: 's4', right: 's4' }}
        rows={{
          spacing: { left: '0', right: '0' },
          verticalAlign: 'center',
          borderless: true,
        }}
        cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
      >
        <MwGrid.Row>
          <MwGrid.Col width='auto'>
            <S.Title>Dados Complementares</S.Title>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row
          spacing={{ left: '0', right: '0', bottom: 's3', top: 's3' }}
          verticalAlign='top'
        >
          <Inputs.EAN13 />

          <MwGrid.Col width='3'>
            <Inputs.Classification />
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>

      <MwGrid
        borderless
        spacing='s4'
        rows={{
          spacing: { left: '0', right: '0' },
          verticalAlign: 'center',
          borderless: true,
        }}
        cols={{ spacing: { top: '0', bottom: '0', left: 's3', right: 's4' } }}
      >
        <MwGrid.Row
          spacing={{ left: '0', right: '0', bottom: 's1', top: 's1' }}
        >
          <Inputs.NotifyPrice />
          <Inputs.Price typePrice='min' />
          <Inputs.Price typePrice='max' />
          <MwGrid.Col />
        </MwGrid.Row>

        <MwGrid.Row
          spacing={{ left: '0', right: '0', bottom: 's1', top: 's1' }}
        >
          <Inputs.MeansurementUnit />
          <Inputs.Meansurement />

          <MwGrid.Col />
        </MwGrid.Row>
      </MwGrid>
    </>
  )
}

export default ComplementaryData
