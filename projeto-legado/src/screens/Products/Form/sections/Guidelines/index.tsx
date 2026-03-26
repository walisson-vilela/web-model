import { MwGrid } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import TextEditor from '../../../../../components/TextEditor'
import useContext from '../../context'

import * as S from './styles'

const Guidelines = () => {
  const {
    form: { control },
  } = useContext()

  return (
    <>
      <MwGrid
        borderless
        spacing='s4'
        rows={{ spacing: '0', borderless: true }}
        cols={{ spacing: '0' }}
      >
        <MwGrid.Row>
          <MwGrid.Col width='auto'>
            <S.Title>Orientações Gerais</S.Title>
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col width='auto'>
            <S.Subtitle>
              Descreva mais sobre o posicionamento do produto na gôndola, entre
              outros
            </S.Subtitle>
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>

      <div style={{ height: 300, display: 'flex' }}>
        <Controller
          control={control}
          name='description'
          render={({ field: props }) => (
            <TextEditor state={[props.value, props.onChange]} borderless />
          )}
        />
      </div>
    </>
  )
}

export default Guidelines
