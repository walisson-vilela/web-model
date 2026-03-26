import { GenericObject } from '@mw-kit/mw-ui/types'

import { ValidationError } from '../../../../../../components/form/modals'
import useFormContext from '../../context'

const ValidationErrors = (props: {
  validationErrors: [
    GenericObject | null,
    React.Dispatch<React.SetStateAction<GenericObject | null>>,
  ]
}) => {
  const { form, originals } = useFormContext()

  const {
    validationErrors: [validationErrors, setValidationErrors],
  } = props

  return (
    validationErrors && (
      <ValidationError
        errors={{
          ...validationErrors,
          ...(validationErrors.stores_contractor || {}),
        }}
        onClose={() => setValidationErrors(null)}
        fields={{
          document: {
            label: 'CNPJ',
            handler: () => {
              const fields: (keyof typeof originals)[] = [
                'document',
                'source_status',
                'fantasy_name',
                'company_name',
                'situation_name',
              ]

              fields.forEach((f) => form.setValue(f, originals[f]))
            },
          },
          code: {
            label: 'Código do PDV',
            handler: () => {
              form.setValue('code', originals.code)
            },
          },
          nickname: {
            label: 'Nome de Identificação',
            handler: () => {
              form.setValue('nickname', originals.nickname)
            },
          },
          segment_id: {
            label: 'Canal de Vendas',
            handler: () => {
              form.setValue('segment', originals.segment)
            },
          },
          market_flag_id: {
            label: 'Bandeira',
            handler: () => {
              form.setValue('market_flag', originals.market_flag)
            },
          },
          typology_id: {
            label: 'Tipologia',
            handler: () => {
              form.setValue('typology', originals.typology)
            },
          },
          classification_id: {
            label: 'Classificação',
            handler: () => {
              form.setValue('classification', originals.segment)
            },
          },
        }}
      />
    )
  )
}

export default ValidationErrors
