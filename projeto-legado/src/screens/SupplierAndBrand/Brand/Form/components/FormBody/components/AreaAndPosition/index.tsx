import React from 'react'

import { MwGrid } from '@mw-kit/mw-ui'

import { useHookFormsAsState } from '../../../../../../../../utils/hooks'
import useContext from '../../../../context'

import * as Inputs from './components'
import * as S from './styled'

const AreaAndPositioning = () => {
  const { form } = useContext()

  const [countries, setCountries] = useHookFormsAsState('countries', form)

  const errors = form.formState.errors.countries || []
  return (
    <>
      {countries.map((country, index) => {
        const setCountry: React.Dispatch<
          React.SetStateAction<typeof country>
        > = (state) => {
          setCountries((prev) => {
            const v = typeof state === 'function' ? state(prev[index]) : state
            if (prev[index] === v) return prev
            const newstate = [...prev]
            newstate[index] = v
            return newstate
          })
        }

        return (
          <S.Section key={index}>
            <MwGrid
              rows={{
                borderless: true,
              }}
              cols={{
                spacing: {
                  top: 's1',
                  left: 's3',
                  bottom: 's1',
                  right: 's3',
                },
              }}
              spacing={{
                top: 's4',
                left: 's3',
                bottom: '0',
                right: 's3',
              }}
              borderless
            >
              <Inputs.Occupation
                country={[country, setCountry]}
                errors={errors[index] || {}}
              />

              <Inputs.Positioning
                country={[country, setCountry]}
                errors={errors[index] || {}}
              />
            </MwGrid>
          </S.Section>
        )
      })}
    </>
  )
}

export default AreaAndPositioning
