import { MwGrid } from '@mw-kit/mw-ui'

import useFormContext from '../../context'
import * as S from '../../styled'

import * as Components from './components'
import * as Inputs from './inputs'

const ComplementData = () => {
  const {
    form: { watch },
    mode,
    dirtyFields,
  } = useFormContext()

  const source_status = watch('source_status')

  // (enables on base-store, or when editing document) and source_status is UNKNOWN
  const disabled =
    (mode !== 'base-stores' && !dirtyFields.includes('document')) ||
    source_status !== 'UNKNOWN'

  return (
    <MwGrid
      rows={{
        borderless: true,
      }}
      cols={{
        spacing: {
          top: 's1',
          left: 's3',
          bottom: 's3',
          right: 's3',
        },
        align: { content: { vertical: 'top' } },
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
        <MwGrid.Col width='auto' spacing={{ top: '0', right: 's1' }}>
          <S.Title children='Dados do CNPJ' $marginBottom='0' />
        </MwGrid.Col>

        <MwGrid.Col
          align={{ content: { vertical: 'center' } }}
          spacing={{ top: '0', left: '0' }}
        >
          <Components.PopupSealQuality />
        </MwGrid.Col>
      </MwGrid.Row>

      <MwGrid.Row>
        <Inputs.Document />
      </MwGrid.Row>

      <MwGrid.Row>
        <Inputs.FantasyName disabled={disabled} />

        <Inputs.CompanyName disabled={disabled} />

        <Inputs.SituationName disabled={disabled} />
      </MwGrid.Row>
    </MwGrid>
  )
}

export default ComplementData
