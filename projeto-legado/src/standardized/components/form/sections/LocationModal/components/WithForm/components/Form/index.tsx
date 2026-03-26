import { useCallback, useEffect } from 'react'

import { MwButton, MwGrid } from '@mw-kit/mw-ui'
import omit from 'lodash/omit'
import toast from 'react-hot-toast'

import {
  ErrorStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import { getCoordinatesByAddress } from '../../../../../Address/hooks/CoordinatesLoader/services'
import { useWithFormContext } from '../../context'
import { schemaToConfirm } from '../../schema'

import * as Inputs from './inputs'
import * as S from './styled'

const Form = () => {
  const {
    form,
    loading: [loading, setLoading],
    wasSearched: [, setWasSearched],
    onDragEnd,
    polygon: [, setPolygon],
    isValidToConfirm: [, setIsValidToConfirm],
    isFieldFilled: [isFieldFilled],
  } = useWithFormContext()

  const onSubmit = useCallback(async () => {
    setLoading(true)
    const values = omit(form.getValues(), 'postal_code')

    try {
      const { lat, lng } = await getCoordinatesByAddress({
        ...Object.fromEntries(
          Object.entries(values).filter(([, v]) => v != null && v !== ''),
        ),
      })
      if (!lat || !lng) return

      onDragEnd(lat, lng)
      setWasSearched(true)

      setPolygon(undefined)
    } catch (e) {
      console.error(e)
      toast(
        <ToasterContent
          color='error'
          title='Endereço não encontrado'
          description='Detalhe mais a busca e tente novamente.'
        />,
        ErrorStyle,
      )
      setLoading(false)
    }
  }, [])

  const validateConfirm = useCallback(() => {
    const values = form.getValues()
    const valid = schemaToConfirm.isValidSync(values)
    return valid
  }, [form.formState])

  useEffect(() => {
    setIsValidToConfirm(validateConfirm())
  }, [validateConfirm])

  return (
    <MwGrid
      spacing={{ top: 's4', right: 's3', bottom: 's3', left: 's3' }}
      rows={{ borderless: true }}
      style={{ backgroundColor: '#F9F9F9' }}
    >
      <MwGrid.Row
        spacingAround={true}
        cols={{ align: { self: { horizontal: 'center' } } }}
        style={{ backgroundColor: '#F9F9F9' }}
      >
        <form
          style={{ flex: '1' }}
          onSubmit={(e) => {
            e.stopPropagation()
            form.handleSubmit(onSubmit, console.error)(e)
          }}
        >
          <S.RowInputs>
            <Inputs.PostalCode />
            <Inputs.StreetType />
          </S.RowInputs>

          <S.RowInputs>
            <Inputs.StreetAddress />
            <Inputs.StreetNumber />
          </S.RowInputs>

          <S.RowInputs>
            <Inputs.Sublocality />
            <Inputs.City />
          </S.RowInputs>

          <S.RowInputs>
            <Inputs.State />

            <S.ColInputs width='4' align={{ self: { vertical: 'bottom' } }}>
              <MwButton
                type='submit'
                content='Localizar'
                disabled={isFieldFilled}
                loading={loading}
              />
            </S.ColInputs>
          </S.RowInputs>
        </form>
      </MwGrid.Row>
    </MwGrid>
  )
}

export default Form
