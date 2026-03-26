import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useContext from '../../../../context'
import * as S from '../../../../styled'

const Status = () => {
  const { form, isInvalid } = useContext()

  return (
    <MwGrid
      rows={{
        borderless: true,
        verticalAlign: 'center',
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's1',
          right: 's3',
        },
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
        <MwGrid.Col>
          <S.Title $marginBottom='0'>Status</S.Title>
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <span>Inativo</span>
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <Controller
            control={form.control}
            name='status'
            render={({ field: props }) => (
              <MwInput
                type='switch'
                invalid={isInvalid('status')}
                checked={props.value}
                onChange={({ target }) => {
                  form.setValue('status', target.checked, form.setValueOptions)
                }}
              />
            )}
          />
        </MwGrid.Col>

        <MwGrid.Col width='auto'>
          <span>Ativo</span>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Status
