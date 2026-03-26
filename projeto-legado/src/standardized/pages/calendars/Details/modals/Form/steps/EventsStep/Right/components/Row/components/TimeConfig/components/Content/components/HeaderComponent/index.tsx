import { MwGrid } from '@mw-kit/mw-ui'

export const HeaderComponent = () => {
  return (
    <MwGrid cols={{ spacing: 's3', spacingAround: true }} borderless>
      <MwGrid.Row>
        <MwGrid.Col
          width='4'
          align={{
            content: {
              horizontal: 'left',
              vertical: 'center',
            },
          }}
        >
          Datas
        </MwGrid.Col>
        <MwGrid.Col
          align={{
            content: {
              horizontal: 'center',
              vertical: 'center',
            },
          }}
        >
          Dia Inteiro
        </MwGrid.Col>
        <MwGrid.Col
          align={{
            content: {
              horizontal: 'center',
              vertical: 'center',
            },
          }}
        >
          Hora Início
        </MwGrid.Col>
        <MwGrid.Col
          align={{
            content: {
              horizontal: 'center',
              vertical: 'center',
            },
          }}
        >
          Hora Fim
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}
