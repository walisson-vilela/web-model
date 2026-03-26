import { useCallback, useEffect } from 'react'

import { MwInput } from '@mw-kit/mw-ui'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'
import { Popup } from 'semantic-ui-react'

import {
  booleanOrDefault,
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../utils/Formatters'
import { isObject } from '../../../../../../../utils/Validators'
import {
  useHookFormsAsState,
  useSelectLoader,
} from '../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../utils/hooks/useSelectLoader/interfaces'
import useFormContext from '../../context'
import { Scenery } from '../../interfaces'
import { Error } from '../../styles'

const sceneryParser: ParserFunction<Scenery> = (data) => {
  const parsed = data.reduce<SelectOption<Scenery>[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    const name = notEmptyStringOrDefault(e.name)
    const temporary = booleanOrDefault(e.temporary)
    const can_upload_file = booleanOrDefault(e.can_upload_file)

    if (
      id === null ||
      name === null ||
      temporary === null ||
      can_upload_file === null
    ) {
      return parsed
    }

    const option: SelectOption<Scenery> = {
      label: name,
      value: id.toString(),
      data: {
        temporary,
        can_upload_file,
      },
    }

    return [...parsed, option]
  }, [])

  return parsed
}

const name = 'scenery_id'

const SceneryId = () => {
  const {
    data,
    form,
    scenery: [, setScenery],
  } = useFormContext()

  const {
    formState: { errors },
    trigger,
  } = form

  const [value, setValue] = useHookFormsAsState(name, form)
  const [, setTemporary] = useHookFormsAsState('temporary', form)
  const [, setRequiredFile] = useHookFormsAsState('required_file', form)

  const loader = useCallback(
    useSelectLoader({
      request: {
        url: 'v1/classifications/scenarios',
      },
      parser: sceneryParser,
    }),
    [value],
  )

  useEffect(() => {
    trigger('temporary')
  }, [value])

  return (
    <div>
      <Popup
        inverted
        wide
        className='popup-field'
        disabled={!data}
        position='right center'
        content='Não é possível editar o cenário.'
        trigger={
          <div>
            <Controller
              control={form.control}
              name={name}
              render={({ field }) => (
                <MwInput
                  {...field}
                  type='select'
                  label='Defina o Cenário'
                  placeholder='Selecione'
                  name={name}
                  value={field.value === null ? '' : `${field.value}`}
                  setValue={(value, data) => {
                    if (!value) {
                      setScenery({
                        temporary: false,
                        can_upload_file: false,
                      })
                      setTemporary(null)
                      setRequiredFile(false)
                      setValue('')
                    } else {
                      const scenery = data as Scenery
                      setScenery({
                        ...scenery,
                      })
                      setTemporary(scenery.temporary ? true : null)
                      setRequiredFile(scenery.can_upload_file)
                      setValue(parseInt(value))
                    }
                  }}
                  loader={loader}
                  invalid={name in errors}
                  disabled={!!data}
                  required
                />
              )}
            />
          </div>
        }
      />

      <Error children={errors[name] && errors[name].message} />
    </div>
  )
}

export default SceneryId
