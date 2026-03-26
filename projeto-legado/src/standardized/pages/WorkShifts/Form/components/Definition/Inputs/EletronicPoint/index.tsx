import { MwGrid, MwInput } from '@mw-kit/mw-ui'
import type { SelectLoader, SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import Popup from '../../../../../../../components/Popup'
import useFormContext from '../../../../context'
import { InputLabel } from '../../../../style'
import { labels } from '../../labels'

const options: SelectOption[] = [
  {
    label: 'Horário de acesso ao sistema',
    value: 'false',
    data: {},
  },
  { label: 'Ponto Eletrônico', value: 'true', data: {} },
]

const loader: SelectLoader = async () => options

const EletronicPoint = () => {
  const {
    form,
    auxForm,
    modal: [, setModal],
  } = useFormContext()

  const { control, setValue, getValues } = form

  const id = getValues('id')
  const electronic_point = getValues('electronic_point')
  const [, setWeekdays] = useHookFormsAsState('weekdays', form)

  const notificationModal = (value: string) => {
    if (value !== 'true' && value !== 'false') return
    if (value === electronic_point.toString()) return

    let conf = ['Ponto Eletrônico', 'Horário de acesso ao sistema']
    if (value === 'true') {
      conf = ['Horário de acesso ao sistema', 'Ponto Eletrônico']
    }

    setModal({
      title: 'Notificação',
      content: (
        <p>
          Você está prestes a trocar a configuração de <b>{conf[0]}</b> para{' '}
          <b>{conf[1]}</b>. Ao finalizar esta configuração, a anterior será
          deletada. Deseja realmente alterar?
        </p>
      ),
      buttonType: 'MwButton',
      actions: [
        {
          appearance: 'borderless',
          content: 'Cancelar',
          onClick: () => setModal(null),
        },
        {
          content: 'Sim',
          onClick: () => {
            setValue('electronic_point', value === 'true')
            auxForm.reset()
            form.resetField('tolerance_before')
            form.resetField('tolerance_after')
            setWeekdays([])
            setModal(null)
          },
        },
      ],
    })
  }

  return (
    <MwGrid.Col width='3'>
      <div style={{ width: '100%' }}>
        <Controller
          control={control}
          name='electronic_point'
          render={({ field, fieldState }) => {
            const { label, required, placeholder } = labels[field.name]

            return (
              <Popup
                inverted
                on='click'
                position='right center'
                disabled={id === undefined}
                trigger={
                  <InputLabel>
                    <MwInput
                      {...field}
                      type='select'
                      label={label}
                      placeholder={placeholder}
                      value={options[+field.value] || ''}
                      invalid={fieldState.invalid}
                      required={required}
                      loader={loader}
                      setValue={(value: string) => {
                        notificationModal(value)
                      }}
                      disabled={id !== undefined}
                    />
                  </InputLabel>
                }
                content={'A Configuração não pode ser alterada.'}
              />
            )
          }}
        />
      </div>
    </MwGrid.Col>
  )
}

export default EletronicPoint
