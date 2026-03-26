import { useEffect, useState } from 'react'

import { MwTabs } from '@mw-kit/mw-ui'

import { generateKey } from '../../../../../../../../utils/Generate'
import { Cities, States } from '../../../../components/Selector/instances'
import useFormContext from '../../context'
import type {
  StepComponent,
  StepComponentAttributes,
  StepComponentComponent,
} from '../../types'
import { TabsContainer } from '../styles'

import { Grid } from './components/Grid'

const tabs = [
  // {
  //   config: Regions,
  //   target: 'regions' as const,
  //   Component: () => <Grid target='regions' config={Regions} />,
  // },
  {
    config: States,
    target: 'states' as const,
    Component: () => <Grid target='states' config={States} />,
  },
  {
    config: Cities,
    target: 'cities' as const,
    Component: () => <Grid target='cities' config={Cities} />,
  },
]

const RegionsStep: StepComponent = Object.assign<
  StepComponentComponent,
  StepComponentAttributes
>(
  () => {
    const {
      value: [value],
    } = useFormContext()

    const [active, setActive] = useState<number>(0)
    const [key, setKey] = useState(generateKey())

    const { Component } = tabs[active]

    useEffect(() => {
      setKey(generateKey())
    }, [value])

    return (
      <TabsContainer>
        <MwTabs
          key={key}
          active={[active, setActive]}
          options={tabs.map((tab) => {
            const {
              config: { label },
              target,
            } = tab
            const length = value[target].length
            return {
              label: `${label} (${length})`,
              data: {},
            }
          })}
          internal
          alwaysOpen
        />

        <Component />
      </TabsContainer>
    )
  },
  {
    title: 'Defina Áreas, Cidades e Estados',
    validator: (value, errors) => {
      return (
        [value.regions, value.cities, value.states].some((e) => e.length > 0) &&
        !(['regions', 'cities', 'states'] as const).some((e) => e in errors)
      )
    },
  },
)

export default RegionsStep
