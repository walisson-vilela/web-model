import { useEffect, useState } from 'react'

import { MwGrid, MwTabs } from '@mw-kit/mw-ui'

import { generateKey } from '../../../../../../../../../../utils/Generate'
import { Selector } from '../../../../../../components'
import { Teams, Users } from '../../../../../../components/Selector/instances'
import type {
  SelectorConfig,
  SelectorProps,
} from '../../../../../../components/types'
import type { ReactState } from '../../../../../../types'
import type {
  Events,
  StepComponent,
  StepComponentAttributes,
  StepComponentComponent,
} from '../../../../../Form/types'
import useExclusionListManagerContext from '../../../../context'

type Field = 'teams' | 'users'
interface GridProps<F extends Field> {
  config: SelectorConfig<Events[F][number]>
  target: F
}

function Grid<F extends Field>({ config, target }: GridProps<F>) {
  const {
    selected: [selected, setSelected],
    original,
  } = useExclusionListManagerContext()

  const updateTabSelected: ReactState<Events[F]>[1] = (value) => {
    setSelected((prev) => {
      const currentSelectedForTarget = prev[target] as { id: number }[]
      const newValue =
        typeof value === 'function'
          ? value(currentSelectedForTarget as Events[F])
          : value

      if (prev[target] === newValue) return prev

      const updatedEvent = {
        ...prev,
        [target]: newValue,
      }

      return updatedEvent
    })
  }

  const selectorConfig = {
    ...config,
    selected: [selected ? selected[target] : [], updateTabSelected],
    original: original ? original[target] : [],
  } as SelectorProps<Events[F][number]>

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
          <Selector.Left {...selectorConfig} />
        </MwGrid.Col>
        <MwGrid.Col>
          <Selector.Right {...selectorConfig} />
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

const TeamUserAssociationStep: StepComponent = Object.assign<
  StepComponentComponent,
  StepComponentAttributes
>(
  () => {
    const {
      selected: [event],
      active: [active, setActive],
    } = useExclusionListManagerContext()
    const [key, setKey] = useState<string>(generateKey())
    const { Component } = tabs[active]

    useEffect(() => {
      setKey(generateKey())
    }, [event])

    return (
      <div>
        <MwTabs
          key={key}
          active={[active, setActive]}
          options={tabs.map((tab) => {
            const {
              config: { label },
              target,
            } = tab

            const length = event?.[target]?.length ?? 0

            return {
              label: `${label} (${length})`,
              data: {},
            }
          })}
          internal
          alwaysOpen
        />
        <Component />
      </div>
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

export default TeamUserAssociationStep
