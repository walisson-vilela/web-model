import React, { useEffect, useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-webpack5'

import Tabs from '../../../components/Tabs'
import type { TabProps } from '../../../components/Tabs/interfaces'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  id: 'MwTabs',
  title: 'Components/MwTabs',
  component: Tabs,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} as Meta<typeof Tabs>

type Story = StoryObj<typeof meta>

const MyTabComponent = Tabs.buildComponent<number>(
  (props) => {
    useEffect(() => {
      console.log(props.data, 'mount component')
      return () => {
        console.log(props.data, 'unmount component')
      }
    }, [props.data])

    return <React.Fragment children={props.label} />
  },
  (props) => {
    useEffect(() => {
      console.log(props.data, 'mount provider')
      return () => {
        console.log(props.data, 'unmount provider')
      }
    }, [props.data])

    return <React.Fragment children={props.children} />
  },
)

const components = Tabs.mapComponents({
  MyTabComponent,
})

const initial: TabProps<number, keyof typeof components>[] = [
  {
    key: 0,
    data: 0,
    label: 'Painel de Controle',
    component: 'MyTabComponent',
  },
  {
    key: 1,
    data: 1,
    label: 'Editar PDV 200578',
    component: 'MyTabComponent',
    group: 'stores',
  },
  {
    key: 2,
    data: 2,
    label: 'Editar Usuário 102547',
    component: 'MyTabComponent',
    group: 'users',
  },
  { key: 3, data: 3, label: 'Calendário', component: 'MyTabComponent' },
  {
    key: 4,
    data: 4,
    label: 'Usuários',
    component: 'MyTabComponent',
    group: 'users',
    primary: true,
  },
  {
    key: 5,
    data: 5,
    label: 'Editar Usuário 101518',
    component: 'MyTabComponent',
    group: 'users',
  },
  {
    key: 6,
    data: 6,
    label: 'Editar PDV 200112',
    component: 'MyTabComponent',
    group: 'stores',
  },
  {
    data: 7,
    label: 'PDV',
    component: 'MyTabComponent',
    group: 'stores',
    primary: true,
  },
]

export const MwTabs: Story = {
  args: {},
  render: () => {
    const [active, setActive] = useState(0)
    const [tabs, setTabs] = useState(initial)

    return (
      <React.Fragment>
        <Tabs
          active={[
            active,
            (active, data) => {
              console.log({ active, data })
              setActive(active)
            },
          ]}
          options={[tabs, setTabs]}
          components={components}
        />

        <input
          type='number'
          placeholder='type the active tab and hit enter'
          onKeyDown={(e) => {
            if (e.key !== 'Enter') return
            e.preventDefault()
            const value: number = parseInt((e.target as HTMLInputElement).value)
            setActive(value)
          }}
          min={0}
          max={tabs.length}
          style={{ width: '432px' }}
        />
      </React.Fragment>
    )
  },
}

export default meta
