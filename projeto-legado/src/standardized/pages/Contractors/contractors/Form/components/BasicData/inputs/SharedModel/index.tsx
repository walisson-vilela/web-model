import { useCallback } from 'react'

import { MwInput, Popup } from '@mw-kit/mw-ui'
import { SelectLoader } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import useContext from '../../../../context'
import labels from '../../../../labels'

const name = 'sharedModel'
type TOptions = { [key: string]: 'Sim' | 'Não' }

const options: TOptions = {
  1: 'Sim',
  0: 'Não',
}

const SharedModel = () => {
  const {
    form: { control, setValue, setValueOptions, isInvalid },
    data: { grouped },
  } = useContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: props }) => {
        const { value } = props

        const loader: SelectLoader = useCallback(async () => {
          return Object.keys(options).map((value) => ({
            label: options[value],
            value,
            data: {},
          }))
        }, [value])

        const inputValue =
          typeof value === 'boolean' ? (value ? '1' : '0') : value || ''

        return (
          <Popup
            on='click'
            inverted
            wide
            className='popup-field'
            content='Não é possível alterar o modelo de operação em contas que já estão atribuídas ao agrupamento.'
            disabled={grouped !== true}
            position='left center'
            trigger={
              <div>
                <MwInput
                  {...props}
                  type='select'
                  label={labels[name].label}
                  placeholder={labels[name].placeholder}
                  invalid={isInvalid(name)}
                  setValue={(v) =>
                    setValue(name, v === '' ? v : v === '1', setValueOptions)
                  }
                  disabled={grouped === true}
                  loader={loader}
                  onClear={() => setValue(name, '', setValueOptions)}
                  value={inputValue}
                  width='200px'
                  center={{ x: 50, y: 75 }}
                  required
                />
              </div>
            }
          />
        )
      }}
    />
  )
}

export default SharedModel
