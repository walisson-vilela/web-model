import { MwInput } from '@mw-kit/mw-ui'

import useInterruptEventContext from '../../context'

const Activate = ({ value, label }: { value: boolean; label: string }) => {
  const {
    form: { watch, setValue },
  } = useInterruptEventContext()

  const activate = watch('activate')

  return (
    <MwInput
      type='radio'
      name='activate'
      label={label}
      checked={value === activate}
      onChange={(e) => {
        setValue('activate', e.target.checked ? value : !value)
        setValue('classification', null)
        setValue('file', null)
      }}
    />
  )
}

export default Activate
