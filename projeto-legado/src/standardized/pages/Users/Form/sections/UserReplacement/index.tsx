import { MwGrid } from '@mw-kit/mw-ui'

import { PERSON_STATUS } from '../../../labels'
import useFormContext from '../../context'
import * as S from '../../styled'

import * as Inputs from './inputs'

const UserReplacement = () => {
  const { form } = useFormContext()

  const { watch } = form

  const status = watch('status')

  return status !== PERSON_STATUS.PC.value ? null : (
    <S.Section>
      <MwGrid
        rows={{
          borderless: true,
        }}
        cols={{
          spacing: {
            top: 's1',
            left: 's3',
            bottom: 's1',
            right: 's3',
          },
          spacingAround: true,
        }}
        spacing={{
          top: 's3',
          left: '0',
          bottom: 's3',
          right: '0',
        }}
        borderless
      >
        <MwGrid.Row>
          <MwGrid.Col>
            <S.Title $marginBottom='0' children='Substituição do Usuário' />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col width='auto'>
            O usuário irá substituir o outro?
          </MwGrid.Col>

          <MwGrid.Col width='auto'>
            <Inputs.Radio value={0} />
          </MwGrid.Col>

          <MwGrid.Col width='auto'>
            <Inputs.Radio value={1} />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          <MwGrid.Col width='auto'>
            <Inputs.User />
          </MwGrid.Col>

          <MwGrid.Col width='auto'>
            <Inputs.Items />
          </MwGrid.Col>

          <MwGrid.Col width='auto' align={{ content: { vertical: 'bottom' } }}>
            <Inputs.Button />
          </MwGrid.Col>
        </MwGrid.Row>
      </MwGrid>
    </S.Section>
  )
}

export default UserReplacement
