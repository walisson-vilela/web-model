import { MwInput } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'

import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import useFormContext from '../../../../context'

const loader: SelectLoader = async () => [
  { label: 'Roteiro', value: 'routes', data: {} },
  { label: 'Tarefas', value: 'surveys', data: {} },
]

const arr: string[] = []

const Items = () => {
  const { form } = useFormContext()

  const [replace, setReplace] = useHookFormsAsState('replace', form)

  return (
    <MwInput
      type='select-multiple'
      label='Defina o que será espelhado'
      placeholder='Selecione'
      disabled={replace === null}
      loader={loader}
      value={replace ? replace.items : arr}
      setValue={(items) => {
        setReplace((prev) => {
          return {
            ...(prev || {
              user: null,
            }),
            items,
          }
        })
      }}
    />
  )
}

export default Items
