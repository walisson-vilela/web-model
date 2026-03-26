import { MwInput } from '@mw-kit/mw-ui'
import { Controller, UseFormReturn } from 'react-hook-form'

import { Response } from '../../../../../../../utils/hooks/useEndpointValidation/interfaces'
import { IFormType } from '../../interfaces'

import * as S from './styled'

interface IName {
  form: UseFormReturn<IFormType>
  editData?: IFormType
  nameCheck: Response
}

const Name = (props: IName) => {
  const { form, nameCheck, editData } = props
  return (
    <div style={{ maxWidth: '429px' }}>
      <Controller
        name='name'
        control={form.control}
        render={({ field: props }) => {
          return (
            <MwInput
              required
              {...props}
              placeholder='Exemplo: Drogaria'
              label={
                editData
                  ? 'Nome da tipologia'
                  : 'Atribua um nome para tipologia'
              }
              loading={nameCheck.loading}
            />
          )
        }}
      />

      <S.ErrorMessage children={nameCheck.message} />
    </div>
  )
}
export default Name
