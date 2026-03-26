import { useCallback } from 'react'

import { MwEllipsisContainer, MwGrid, MwInput } from '@mw-kit/mw-ui'
import { SelectOptionLabelComponent } from '@mw-kit/mw-ui/dist/components/Input/components/Select/hooks/interfaces'
import { SelectOption } from '@mw-kit/mw-ui/types'
import { Controller } from 'react-hook-form'

import {
  notEmptyStringOrDefault,
  numberOrDefault,
} from '../../../../../../../../../utils/Formatters'
import { useSelectLoader } from '../../../../../../../../../utils/hooks'
import { ParserFunction } from '../../../../../../../../../utils/hooks/useSelectLoader/interfaces'
import { isObject } from '../../../../../../../../utils/validators'
import useFormContext from '../../../../context'
import { Form } from '../../../../interfaces'
import labels from '../../../../labels'

import { LabelContainer } from './styles'

type MarketFlagType = Exclude<Form['market_flag'], null>

const Label: SelectOptionLabelComponent<MarketFlagType> = ({ data, mode }) => {
  return (
    <LabelContainer>
      <MwEllipsisContainer>{data.name}</MwEllipsisContainer>

      {mode !== 'placeholder' && (
        <MwEllipsisContainer>
          {data.group} - {data.network}
        </MwEllipsisContainer>
      )}
    </LabelContainer>
  )
}

const parser: ParserFunction<MarketFlagType> = (data) => {
  return data.reduce<SelectOption<MarketFlagType>[]>((parsed, e) => {
    if (!isObject(e)) return parsed

    const id = numberOrDefault(e.id)
    if (!id) return parsed

    const name = notEmptyStringOrDefault(e.name, '')

    const option: SelectOption<MarketFlagType> = {
      label: Label,
      data: {
        id,
        name,
        network: '',
        group: '',

        ...(isObject(e.network)
          ? {
              network: notEmptyStringOrDefault(e.network.name, ''),

              ...(isObject(e.network.group)
                ? {
                    group: notEmptyStringOrDefault(e.network.group.name, ''),
                  }
                : {}),
            }
          : {}),
      },
      value: id.toString(),
    }

    return [...parsed, option]
  }, [])
}

const MarketFlag = () => {
  const { form, isInvalid, originals } = useFormContext()
  const { setValue } = form

  return (
    <MwGrid.Col width='3'>
      <Controller
        name='market_flag'
        control={form.control}
        render={({ field: props }) => {
          const loader = useCallback(
            useSelectLoader({
              request: {
                url: '/v1/tr/markets/options',
                aditionalParams: {
                  active: 1,
                  level: 3,
                  contain: 'NetworkFlag',
                  sort: 'name',
                },
              },
              parser,
            }),
            [props.value],
          )

          const initialLoader = useCallback((): SelectOption[] => {
            return originals.market_flag
              ? [
                  {
                    label: Label as never as SelectOptionLabelComponent,
                    data: originals.market_flag as never as MarketFlagType,
                    value: originals.market_flag.id.toString(),
                  },
                ]
              : []
          }, [originals])

          return (
            <MwInput
              {...props}
              type='select'
              label={labels[props.name].label}
              placeholder={labels[props.name].placeholder}
              required={labels[props.name].required}
              invalid={isInvalid(props.name)}
              initialLoader={initialLoader}
              loader={loader}
              value={
                props.value
                  ? {
                      label: Label as never as SelectOptionLabelComponent,
                      data: props.value,
                      value: props.value.id.toString(),
                    }
                  : ''
              }
              setValue={(id, value) => {
                const v = id ? (value as MarketFlagType) : null
                setValue(props.name, v)
              }}
              onClear={() => setValue(props.name, null)}
              search
              width='100%'
            />
          )
        }}
      />
    </MwGrid.Col>
  )
}

export default MarketFlag
