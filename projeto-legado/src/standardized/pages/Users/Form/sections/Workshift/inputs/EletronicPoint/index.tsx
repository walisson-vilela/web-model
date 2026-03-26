import { MwInput } from '@mw-kit/mw-ui'

import Popup from '../../../../../../../components/Popup'
import useFormContext from '../../../../context'

const loader = async () => [
  { value: 'true', label: 'Sim', data: {} },
  { value: 'false', label: 'Não', data: {} },
]

const EletronicPointInput = () => {
  const { form, originals, data } = useFormContext()
  const { setValue, watch } = form
  const { pis } = data

  const electronicPointValue = watch('electronic_point')

  const isDisabled = pis === null && electronicPointValue === false

  return (
    <Popup
      on='click'
      trigger={
        <span>
          <MwInput
            name='electronic_point'
            type='select'
            loader={loader}
            value={(() => {
              if (electronicPointValue === true) {
                return 'true'
              } else if (electronicPointValue === false) {
                return 'false'
              } else {
                return ''
              }
            })()}
            setValue={(value) => {
              const boolValue = value === 'true'
              setValue('electronic_point', boolValue)

              setValue(
                'work_shift',
                boolValue === originals.electronic_point
                  ? originals.work_shift
                  : null,
              )
            }}
            disabled={isDisabled}
          />
        </span>
      }
      content='Para utilizar marcação de ponto eletrônico como registro é necessário informar o PIS no cadastro da pessoa.'
      inverted
      disabled={!isDisabled}
      position='right center'
      hideOnScroll
    />
  )
}

export default EletronicPointInput
