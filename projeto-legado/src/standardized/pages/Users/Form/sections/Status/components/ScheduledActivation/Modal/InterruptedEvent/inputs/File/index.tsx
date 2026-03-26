import { FileInputComponent } from '../../../../../../../../../../../../screens/Users/Modals/EventsManager/Tabs/components/Form/components/File'
import useInterruptEventContext from '../../context'

const name = 'file'

const File = () => {
  const { form } = useInterruptEventContext()
  const { setValue, watch, isInvalid, register } = form
  const value = watch(name)

  const classification = watch('classification')

  return (
    <FileInputComponent
      classification={classification}
      setValue={setValue as never}
      input={register(name)}
      value={value}
      invalid={isInvalid(name)}
    />
  )
}

export default File
