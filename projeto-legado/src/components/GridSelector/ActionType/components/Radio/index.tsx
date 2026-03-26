import { MwInput, Popup } from '@mw-kit/mw-ui'

import { labels } from '../../constants'
import * as Types from '../../types'

const Radio = (
  props: Exclude<Types.ActionTypeProps, 'label'> & {
    value: Exclude<Types.Rule, ''>
  },
) => {
  const {
    rule: [rule, setRule],
    count,
    value,
  } = props

  const disabled = count > 0 && !['', value].includes(rule)

  return (
    <Popup
      on='click'
      className='popup-field'
      position='right center'
      disabled={!disabled}
      content='Não é possível associar elementos com tipos de Ação diferentes.'
      trigger={
        <div>
          <MwInput
            type='radio'
            label={labels[value]}
            checked={rule === value}
            onChange={(e) => setRule(e.target.checked ? value : '')}
            disabled={disabled}
          />
        </div>
      }
      inverted
    />
  )
}

export default Radio
