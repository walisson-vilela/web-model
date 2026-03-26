import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import useFormContext from '../../context'

import * as S from './styled'

const Status = () => {
  const {
    form: { control, setValue },
  } = useFormContext()

  return (
    <S.SubSection>
      <S.Container>
        <S.Title>Status do PDV</S.Title>

        <div>
          <Controller
            control={control}
            name='status'
            render={({ field: { value, ...props } }) => {
              return (
                <MwInput
                  {...props}
                  type='switch'
                  label={{
                    before: 'Inativo',
                    after: 'Ativo',
                  }}
                  onChange={(e) => {
                    setValue(props.name, e.target.checked)
                  }}
                  checked={value}
                />
              )
            }}
          />
        </div>
      </S.Container>
    </S.SubSection>
  )
}

export default Status
