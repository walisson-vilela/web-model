import { useEffect, useState } from 'react'

import { MwGrid, MwTabs } from '@mw-kit/mw-ui'

import { generateKey } from '../../../../../../../../utils/Generate'
import { Selector } from '../../../../components'
import { Teams, Users } from '../../../../components/Selector/instances'
import type {
  SelectorConfig,
  SelectorProps,
} from '../../../../components/types'
import useFormContext from '../../context'
import type {
  StepComponent,
  StepComponentAttributes,
  StepComponentComponent,
  Value,
} from '../../types'
import { TabsContainer } from '../styles'

const Grid = <Field extends 'teams' | 'users'>(props: {
  config: SelectorConfig<Value[Field][number]>
  target: Field
}) => {
  const { useField, originals } = useFormContext()

  const [selected, setSelected] = useField(props.target)

  const config = {
    ...props.config,
    selected: [selected, setSelected],
    original: originals[props.target],
  } as SelectorProps<(typeof selected)[number]>

  return (
    <MwGrid
      cols={{
        spacing: {
          top: 's1',
          left: 's1',
          bottom: 's3',
          right: 's1',
        },
        bordered: true,
      }}
      borderless
    >
      <MwGrid.Row>
        <MwGrid.Col>
          <Selector.Left {...config} />
        </MwGrid.Col>

        <MwGrid.Col>
          <Selector.Right {...config} />
        </MwGrid.Col>
      </MwGrid.Row>
    </MwGrid>
  )
}

const tabs = [
  {
    config: Teams,
    target: 'teams' as const,
    Component: () => <Grid target='teams' config={Teams} />,
  },
  {
    config: Users,
    target: 'users' as const,
    Component: () => <Grid target='users' config={Users} />,
  },
]

const UsersStep: StepComponent = Object.assign<
  StepComponentComponent,
  StepComponentAttributes
>(
  () => {
    const {
      value: [value],
    } = useFormContext()

    const [active, setActive] = useState<number>(0)
    const [key, setKey] = useState<string>(generateKey())

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
    title: 'Defina Usuários e Equipes',
    validator: (value, errors) => {
      return (
        [value.teams, value.users].some((e) => e.length > 0) &&
        !(['teams', 'users'] as const).some((e) => e in errors)
      )
    },
  },
)

export default UsersStep
