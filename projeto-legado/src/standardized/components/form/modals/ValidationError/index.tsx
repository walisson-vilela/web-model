import { useCallback } from 'react'

import type { GenericObject } from '@mw-kit/mw-ui/types'
import { type AxiosResponse, isAxiosError } from 'axios'

import Modal from '../../../../../components/MwModal'
import { isKeyOf, isObject } from '../../../../../utils/Validators'

import * as Popups from './popups'
import * as S from './styles'

type ErrorResponse = AxiosResponse<{ success: false; errors: GenericObject }>

const handler = async <R extends GenericObject>(
  request: () => Promise<R>,
): Promise<R | ErrorResponse> => {
  try {
    return await request()
  } catch (error) {
    if (!isAxiosError(error) || !isObject(error.response)) throw error

    if (error.response.status !== 422) throw error

    const { data } = error.response

    if (
      !isObject(data) ||
      !isObject(data.data) ||
      !isObject(data.data.errors)
    ) {
      throw error
    }

    error.response.data = { success: false, errors: data.data.errors }

    return error.response
  }
}

type ValidationErrorProps<Fields extends string> = {
  errors: GenericObject
  onClose: () => void | Promise<void>
  fields: {
    [key in Fields]: {
      label: string
      handler: (error: unknown) => void | Promise<void>
    }
  }
}

const ValidationError = Object.assign(
  <Fields extends string>(props: ValidationErrorProps<Fields>) => {
    const { errors, fields, onClose } = props

    const onBeforeClose = useCallback(() => {
      Object.entries(errors).forEach(([key, error]) => {
        if (!isKeyOf(fields, key)) return
        fields[key].handler(error)
      })
    }, [errors, fields])

    return (
      <Modal
        modal={{
          title: 'Não foi possível salvar os seus dados',
          content: (
            <S.Container>
              <div>
                Os seguintes campos sofreram <b>atualizações conflitantes</b> no
                sistema
                <Popups.Info />
              </div>

              <S.List>
                {Object.entries(errors).reduce<JSX.Element[]>(
                  (elements, [key]) => [
                    ...elements,
                    ...(isKeyOf(fields, key)
                      ? [<li key={key} children={fields[key].label} />]
                      : []),
                  ],
                  [],
                )}
              </S.List>

              <div>Para salvar o formulário, preencha novamente.</div>
            </S.Container>
          ),
          buttonType: 'MwButton',
          actions: [
            {
              type: 'button',
              onClick: () => {
                onBeforeClose()
                onClose()
              },
              children: 'OK',
            },
          ],
        }}
      ></Modal>
    )
  },
  {
    handler,
  },
)

export default ValidationError
