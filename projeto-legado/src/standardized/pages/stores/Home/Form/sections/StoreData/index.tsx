import { MwGrid } from '@mw-kit/mw-ui'

import * as S from '../../styled'

import * as Inputs from './inputs'

const StoreData = () => {
  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's3',
          right: 's3',
        },
        align: { content: { vertical: 'top' } },
      }}
      spacing={{
        top: 's4',
        left: 's3',
        bottom: 's4',
        right: 's3',
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col width='auto' spacing={{ top: '0', right: 's1' }}>
          <S.Title children='Dados do PDV' $marginBottom='0' />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <Inputs.Code />

        <Inputs.Nickname />

        <Inputs.Segment />

        <MwGrid.Col />
      </MwGrid.Row>

      <MwGrid.Row>
        <Inputs.MarketFlag />

        <Inputs.Typology />

        <Inputs.Classification />

        <Inputs.Checkout />
      </MwGrid.Row>
    </MwGrid>
  )
}

export default StoreData
