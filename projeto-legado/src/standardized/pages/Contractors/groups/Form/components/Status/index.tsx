import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { numberOrDefault } from '../../../../../../../utils/Formatters'
import useContext from '../../context'
import labels from '../../labels'
import * as S from '../../styles'

import { Container } from './styled'

const name = 'active'

const Status = () => {
  const {
    isMaster,
    form: { control, setValue, setValueOptions },
  } = useContext()

  return (
    <S.SubSection>
      <Container>
        <S.Title $marginBottom='0'>{labels.active.label}</S.Title>

        <Controller
          control={control}
          name={name}
          render={({ field: props }) => {
            return (
              <MwInput
                {...props}
                type='switch'
                label={{
                  before: 'Inativo',
                  after: 'Ativo',
                }}
                disabled={isMaster}
                onChange={(e) => {
                  const onChange = props.onChange || (() => {})
                  onChange(e)
                  setValue(name, e.target.checked ? 1 : 0, setValueOptions)
                }}
                checked={numberOrDefault(props.value) === 1}
              />
            )
          }}
        />
      </Container>
    </S.SubSection>
  )
}

export default Status
