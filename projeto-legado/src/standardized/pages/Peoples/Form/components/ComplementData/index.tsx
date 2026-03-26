import { MwGrid, MwTextArea } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../context'
import { labels } from '../../labels'
import * as S from '../../styled'

const ComplementData = () => {
  const { form } = useFormContext()
  const { control } = form

  const { required, placeholder, label } = labels.note

  return (
    <MwGrid
      borderless
      spacing={{ left: 's4', top: 's4', right: 's4', bottom: 's4' }}
      rows={{
        verticalAlign: 'center',
        horizontalAlign: 'left',
        borderless: true,
        spacingAround: true,
      }}
    >
      <MwGrid.Row>
        <S.Title>Dados Complementares</S.Title>
      </MwGrid.Row>

      <MwGrid.Row>
        <MwGrid.Col width='12'>
          <label style={{ width: '100%' }}>
            <p children={label} />
            <Controller
              control={control}
              name='note'
              render={({ field: { ref, ...props } }) => {
                return (
                  <MwTextArea
                    {...props}
                    width='100%'
                    height='100px'
                    placeholder={placeholder}
                    required={required}
                    value={props.value || ''}
                  />
                )
              }}
            />
          </label>
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default ComplementData
