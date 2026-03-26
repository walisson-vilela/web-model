import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { ErrorMessage } from '../../../../../../../../standardized/components/form/components'
import { useCategoriesContext } from '../../../context'

const Name = () => {
  const {
    editData,
    form,
    isInvalid,
    statusProcess: [statusProcess],

    validName: [validName],
  } = useCategoriesContext()

  const {
    control,
    formState: { errors },
    watch,
  } = form

  const category = watch('category')

  return (
    <MwGrid.Col width='auto'>
      <div>
        <Controller
          name='name'
          control={control}
          render={({ field: props }) => {
            return (
              <MwInput
                {...props}
                name='name'
                label={
                  category === 'category' ? (
                    !editData ? (
                      <>
                        Insira o nome da nova Categoria <b>(1º Nível)</b>:
                      </>
                    ) : (
                      'Edite o nome da Categoria*'
                    )
                  ) : !editData ? (
                    'Insira o nome do novo Subnível:'
                  ) : (
                    'Edite o nome do Subnível*'
                  )
                }
                placeholder='Exemplo: Café Pouch 500g'
                loading={statusProcess.name}
                invalid={isInvalid('name') || validName === false}
                inputWidth='274px'
                value={props.value || ''}
              />
            )
          }}
        />

        <ErrorMessage
          children={(() => {
            if (errors.name) return errors.name.message
            else if (validName === false) {
              return 'O nome já está sendo utilizado'
            }

            return undefined
          })()}
        />
      </div>
    </MwGrid.Col>
  )
}

export default Name
