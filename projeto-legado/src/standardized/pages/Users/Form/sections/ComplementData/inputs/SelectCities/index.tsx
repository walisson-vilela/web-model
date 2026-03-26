import { useCallback } from 'react'

import { MwIcon, MwInput } from '@mw-kit/mw-ui'
import { Controller } from 'react-hook-form'

import { useSelectLoader } from '../../../../../../../../utils/hooks'
import Popup from '../../../../../../../components/Popup'
import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'

import parser from './parser'

const SelectCities = () => {
  const { form, disabled } = useFormContext()

  return (
    <div style={{ width: '100%' }}>
      <Controller
        name='host_city'
        control={form.control}
        render={({ field: props }) => {
          const { value } = props

          const loader = useCallback(
            useSelectLoader({
              request: {
                url: 'v1/region-cities',
                aditionalParams: {
                  sort: 'name',
                  contain: ['RegionStates', 'RegionCountries'].join(','),
                },
              },
              parser,
            }),
            [],
          )

          return (
            <MwInput
              {...props}
              type='select'
              disabled={disabled}
              label={
                <div
                  style={{ display: 'flex', gap: '4px', alignItems: 'center' }}
                >
                  {'Cidade Sede'}
                  <Popup
                    on='click'
                    trigger={
                      <MwIcon
                        type='feather'
                        icon='info'
                        onClick={(e) => e.preventDefault()}
                        color='greyishBlue'
                      />
                    }
                    position='right center'
                    content='O Usuário será impactado por todos os eventos dos Calendário Regional referente a Cidade Sede no qual o mesmo estiver associado.'
                    inverted
                  />
                </div>
              }
              search
              width='100%'
              placeholder='Selecione'
              value={value?.name ?? ''}
              setValue={(val: string, optionData: Record<string, any>) => {
                form.setValue('host_city', optionData as Form['host_city'], {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }}
              onClear={() => {
                form.setValue('host_city', null, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }}
              loader={loader}
            />
          )
        }}
      />
    </div>
  )
}
export default SelectCities
