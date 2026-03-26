import * as Components from './components'
import * as Constants from './constants'
import * as Types from './types'

const ActionType = Object.assign(
  (props: Types.ActionTypeProps) => {
    return (
      <>
        <div>Tipo de Ação*:</div>

        <Components.Radio {...props} value='ONLY' />

        <Components.Radio {...props} value='EXCEPT' />

        <Components.Info label={props.label} />
      </>
    )
  },
  { Constants, Types },
)

export default ActionType
