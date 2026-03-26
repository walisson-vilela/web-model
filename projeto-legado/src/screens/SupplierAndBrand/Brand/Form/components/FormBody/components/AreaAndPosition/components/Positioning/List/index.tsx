import { MwGrid, MwScrollContainer } from '@mw-kit/mw-ui'

import * as S from '../../../styled'
import { IOccupationPosition } from '../../types'

interface IList extends IOccupationPosition {
  field: 'segments' | 'market_flags'
}

const label: { [K in IList['field']]: string } = {
  market_flags: 'Bandeira',
  segments: 'Canal',
}

const List = (props: IList) => {
  const {
    country: [country, setCountry],
    field,
  } = props

  const onRemove = (foreign_id: number) => {
    setCountry((prev) => ({
      ...prev,
      [field]: prev[field].filter((e) => e.foreign_id !== foreign_id),
    }))
  }

  const values = country[field]

  return (
    <MwGrid
      style={{
        borderRadius: 4,
      }}
    >
      <MwScrollContainer
        height='82px'
        before={{
          background: 'ghostWhite',
          children: (
            <MwGrid.Row
              backgroundColor='ghostWhite'
              cols={{
                spacing: 's3',
                spacingAround: true,
              }}
              style={{ fontWeight: 'bold' }}
            >
              <MwGrid.Col width='5' children={label[field]} />

              <MwGrid.Col children='Tipo de Ação' />
              <MwGrid.Col
                width='1'
                align={{ content: { horizontal: 'center' } }}
                children='Ação'
              />
            </MwGrid.Row>
          ),
        }}
        spacing={{ top: 's1', bottom: 's1' }}
        empty={{
          empty: values.length === 0,
          content: <S.EmptyMessage>Nenhuma ação definida</S.EmptyMessage>,
        }}
      >
        {(values as (typeof values)[number][]).map((e, index) => (
          <MwGrid.Row
            key={index}
            cols={{
              spacing: {
                top: 's1',
                right: 's3',
                bottom: 's1',
                left: 's3',
              },
              spacingAround: true,
            }}
            borderless
          >
            <MwGrid.Col width='5'>{e.name}</MwGrid.Col>

            <MwGrid.Col>
              {country[`${field}_rule`] === 'EXCEPT' ? 'Excluir' : 'Restringir'}
            </MwGrid.Col>

            <MwGrid.Col width='1' align={{ content: { horizontal: 'center' } }}>
              <S.Link
                children='Remover'
                onClick={() => onRemove(e.foreign_id)}
              />
            </MwGrid.Col>
          </MwGrid.Row>
        ))}
      </MwScrollContainer>
    </MwGrid>
  )
}

export default List
