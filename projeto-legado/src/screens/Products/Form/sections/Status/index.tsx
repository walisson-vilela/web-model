import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useContext from '../../context'
import * as S from '../../styles'

const Status = () => {
  const { form, isInvalid, setValueOptions } = useContext()
  const { control, setValue } = form

  return (
    <MwGrid
      borderless
      spacing='s4'
      rows={{
        spacing: '0',
        horizontalAlign: 'between',
        verticalAlign: 'center',
      }}
      cols={{ spacing: '0' }}
    >
      <MwGrid.Row>
        <MwGrid.Col width='auto'>
          <S.Title>Status</S.Title>
        </MwGrid.Col>

        <MwGrid.Col />

        <MwGrid.Col width='auto'>
          <MwGrid
            borderless
            rows={{ spacing: '0' }}
            cols={{ spacing: { top: '0', bottom: '0' } }}
          >
            <MwGrid.Row>
              <MwGrid.Col>Inativo</MwGrid.Col>

              <MwGrid.Col>
                <Controller
                  control={control}
                  name='status'
                  render={({ field: props }) => (
                    <MwInput
                      type='switch'
                      invalid={isInvalid('status')}
                      checked={props.value}
                      onChange={({ target }) => {
                        setValue('status', target.checked, setValueOptions)
                      }}
                    />
                  )}
                />
              </MwGrid.Col>

              <MwGrid.Col>Ativo</MwGrid.Col>
            </MwGrid.Row>
          </MwGrid>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Status
