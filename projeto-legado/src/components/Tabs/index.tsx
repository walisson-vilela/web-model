import React from 'react'

import { Tabs } from './styles'

interface TabOptionsProps {
  label: string
}

interface MwTabsProps {
  options: TabOptionsProps[]
  active: {
    active: number
    setActive: React.Dispatch<React.SetStateAction<number>>
  }
  style?: React.CSSProperties
}

const MwTabs = (props: MwTabsProps) => {
  const {
    options,
    active: { active, setActive },
    style,
  } = props

  return (
    <Tabs style={{ ...style }}>
      <div>
        {options.map((tab, index) => (
          <div
            key={index}
            className={active === index ? 'active' : undefined}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
    </Tabs>
  )
}

export default MwTabs
