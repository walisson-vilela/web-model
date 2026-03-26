import { MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useLoginContext } from '../../../context'

const KeepConnected = () => {
  const { method } = useLoginContext()
  return (
    <Controller
      name='keep'
      control={method.control}
      render={({ field: props }) => (
        <MwInput
          type='checkbox'
          label='Manter-me conectado'
          checked={props.value}
          onChange={() => method.setValue('keep', !props.value)}
        />
      )}
    />
  )
}

export default KeepConnected
