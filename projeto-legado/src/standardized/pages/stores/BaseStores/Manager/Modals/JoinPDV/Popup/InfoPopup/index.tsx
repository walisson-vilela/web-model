import { MwGrid, MwIcon } from '@mw-kit/mw-ui'

import { CheckAddress } from '../../../../../../Home/components'

import * as S from './styled'

const ContentPopup = () => {
  return (
    <S.Container>
      <div style={{ fontWeight: 'bold', paddingBottom: '7px' }}>PDVs Base</div>

      <div style={{ paddingBottom: '14px' }}>
        É aquele que receberá os dados de todos os PDVs selecionados na lista
        passando a representar a fusão de todos os PDVs da União.
      </div>

      <S.ContentHorizontal>
        Pode ser unificado ao PDV de selo
      </S.ContentHorizontal>

      <div style={{ display: 'flex' }}>
        <S.ContentVertical>PDV&apos;s Base</S.ContentVertical>
        <MwGrid
          rows={{
            borderless: true,
            horizontalAlign: 'center',
            spacing: '0',
          }}
          cols={{
            spacing: {
              top: 's1',
              left: 's1',
              bottom: 's1',
              right: 's1',
            },
            align: { content: { vertical: 'center', horizontal: 'center' } },
          }}
          spacing={{
            top: '0',
            left: 's3',
            bottom: 's4',
            right: 's1',
          }}
          borderless
          style={{ flexGrow: 1, flexShrink: 1, width: '100%' }}
        >
          <MwGrid.Row
            style={{ color: '#FFFFFF' }}
            backgroundColor='greyishBlue'
          >
            <MwGrid.Col
              width='3'
              align={{ content: { vertical: 'center', horizontal: 'left' } }}
            >
              Tipo de Selo
            </MwGrid.Col>

            <MwGrid.Col></MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='VALID' />
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='UNKNOWN' />
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status={null} />
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='INVALID' />
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='UPDATED' />
            </MwGrid.Col>
          </MwGrid.Row>

          <MwGrid.Row
            style={{ color: '#FFFFFF' }}
            backgroundColor='greyishBlue'
          >
            <MwGrid.Col
              align={{ content: { vertical: 'center', horizontal: 'left' } }}
              width='3'
            >
              Validado
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='VALID' />
            </MwGrid.Col>

            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
          </MwGrid.Row>

          <MwGrid.Row
            style={{ color: '#FFFFFF' }}
            backgroundColor='greyishBlue'
          >
            <MwGrid.Col
              width='3'
              align={{ content: { vertical: 'center', horizontal: 'left' } }}
            >
              Não Validado
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='UNKNOWN' />
            </MwGrid.Col>

            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
          </MwGrid.Row>

          <MwGrid.Row
            style={{ color: '#FFFFFF' }}
            backgroundColor='greyishBlue'
          >
            <MwGrid.Col
              align={{ content: { vertical: 'center', horizontal: 'left' } }}
              width='3'
            >
              Sem CNPJ
            </MwGrid.Col>

            <MwGrid.Col>
              <CheckAddress inverted status={null} />
            </MwGrid.Col>

            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>
              <MwIcon type='feather' icon='check' color='white' />
            </MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
          </MwGrid.Row>

          <MwGrid.Row
            style={{ color: '#FFFFFF' }}
            backgroundColor='greyishBlue'
          >
            <MwGrid.Col
              width='3'
              align={{ content: { vertical: 'center', horizontal: 'left' } }}
            >
              Inválido
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='INVALID' />
            </MwGrid.Col>

            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
          </MwGrid.Row>

          <MwGrid.Row
            style={{ color: '#FFFFFF' }}
            backgroundColor='greyishBlue'
          >
            <MwGrid.Col
              width='3'
              align={{ content: { vertical: 'center', horizontal: 'left' } }}
            >
              Atualizado na RF
            </MwGrid.Col>
            <MwGrid.Col>
              <CheckAddress inverted status='UPDATED' />
            </MwGrid.Col>

            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
            <MwGrid.Col>-</MwGrid.Col>
          </MwGrid.Row>
        </MwGrid>
      </div>
    </S.Container>
  )
}

export default ContentPopup
