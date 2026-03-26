import React from 'react'

import { Placeholder as SemanticPlaceholder } from 'semantic-ui-react'

interface Props {
  header: number
  paragraph: number
}

const Placeholder = ({ header, paragraph }: Props) => {
  return (
    <div style={{ minWidth: 30 }}>
      <SemanticPlaceholder>
        {header > 0 && (
          <SemanticPlaceholder.Header>
            {Array(header)
              .fill(1)
              .map((_, i) => (
                <SemanticPlaceholder.Line key={i} />
              ))}
          </SemanticPlaceholder.Header>
        )}

        {paragraph > 0 && (
          <SemanticPlaceholder.Paragraph>
            {Array(paragraph)
              .fill(1)
              .map((_, i) => (
                <SemanticPlaceholder.Line key={i} />
              ))}
          </SemanticPlaceholder.Paragraph>
        )}
      </SemanticPlaceholder>
    </div>
  )
}

interface FooterProps {
  paragraph?: number
  size?: number
}

const Footer = ({ paragraph, size }: FooterProps) => {
  return (
    <>
      {Array(paragraph || 1)
        .fill(1)
        .map((_, i) => (
          <div style={{ width: size || 130 }} key={i}>
            <SemanticPlaceholder>
              <SemanticPlaceholder.Paragraph>
                <SemanticPlaceholder.Line />
              </SemanticPlaceholder.Paragraph>
            </SemanticPlaceholder>
          </div>
        ))}
    </>
  )
}

const Circle = () => {
  return (
    <SemanticPlaceholder
      style={{
        height: 160,
        width: 160,
        marginBottom: 14,
        borderRadius: '100%',
      }}
    >
      <SemanticPlaceholder.Image />
    </SemanticPlaceholder>
  )
}

interface BlockProps {
  half?: boolean
}

const Block = ({ half }: BlockProps) => {
  return (
    <SemanticPlaceholder
      style={{
        height: !half ? '90%' : '45%',
        width: '90%',
        marginBottom: 14,
      }}
    >
      <SemanticPlaceholder.Image />
    </SemanticPlaceholder>
  )
}

Placeholder.Footer = Footer
Placeholder.Circle = Circle
Placeholder.Block = Block

export default Placeholder
