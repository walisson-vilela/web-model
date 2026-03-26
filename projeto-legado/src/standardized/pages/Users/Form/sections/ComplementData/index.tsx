import { MwGrid } from '@mw-kit/mw-ui'

import useHomeContext from '../../../../Home/context'
import useFormContext from '../../context'

import * as Inputs from './inputs'
import * as S from './styles'

const ComplementData = () => {
  const { form } = useFormContext()

  const { contractor } = useHomeContext()

  const { watch } = form

  const role = watch('role')

  return (
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
            <S.Title $marginBottom='0' children='Dados Complementares' />
          </MwGrid.Col>
        </MwGrid.Row>

        <MwGrid.Row>
          {role && !role.internal_access && contractor.type === 'MASTER' && (
            <MwGrid.Col width='auto'>
              <Inputs.RouteContractor />
            </MwGrid.Col>
          )}

          <MwGrid.Col width='auto'>
            <Inputs.SelectCities />
          </MwGrid.Col>

          <MwGrid.Col width='auto'>
            <Inputs.PersonalMobile />
          </MwGrid.Col>

          <S.ImeiColumn
            width='auto'
            align={{
              content: {
                vertical: 'bottom',
              },
            }}
          >
            <Inputs.Imei />
          </S.ImeiColumn>
        </MwGrid.Row>
      </MwGrid>
    </S.Section>
  )
}

export default ComplementData
