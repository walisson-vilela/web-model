import React from 'react'
import { Popup } from 'semantic-ui-react'

type HierarchyPersonLink = {
  id: number
  name: string
  people?: {
    id: number
    name: string
    people_id_name?: string
  }
}

interface PeopleTooltipProps {
  links: HierarchyPersonLink[]
  children: React.ReactElement
}

const PeopleTooltip: React.FC<PeopleTooltipProps> = ({ links, children }) => {
  if (!links || links.length === 0) return children

  const peopleNames = links
    .map((l) => l.people?.name || l.name)
    .filter(Boolean) as string[]

  if (!peopleNames.length) return children

  return (
    <Popup
      basic
      inverted
      // posiciona o balão ao lado esquerdo do trigger, evitando "subir" e quebrar o layout
      position='left center'
      on='hover'
      content={
        <div
          style={{
            maxWidth: 260,
            padding: '6px 10px',
            fontSize: 12,
            lineHeight: 1.4,
            whiteSpace: 'pre-line',
            textAlign: 'left',
          }}
        >
          {peopleNames.join('\n')}
        </div>
      }
      style={{ maxWidth: 260 }}
      offset={[-8, 0]}
      trigger={children}
    />
  )
}

export default PeopleTooltip
