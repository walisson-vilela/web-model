
import { useMemo, useState } from 'react'

import { Map } from './Map'

type AttemptItem = {
  id: number
  dateLabel: string
  precision: string
  distance: string
}

type Props = {
  attempts: number
  type?: 'check_in' | 'check_out'
}

export const Attempts = (props: Props) => {
  const { attempts, type = 'check_out' } = props

  const items = useMemo<AttemptItem[]>(() => {
    if (attempts <= 0) {
      return []
    }

    const baseItems: AttemptItem[] = [
      {
        id: 1,
        dateLabel: 'Segunda-Feira 20/02/2021 - 09:08:41',
        precision: '1,7 m',
        distance: '21,01 m',
      },
      {
        id: 2,
        dateLabel: 'Segunda-Feira 20/02/2021 - 08:20:00',
        precision: '1,7 m',
        distance: '41,18 m',
      },
    ]

    return baseItems.slice(0, Math.max(1, attempts))
  }, [attempts])

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (attempts <= 0) {
    return (
      <div style={{ padding: 16, color: '#6b7280' }}>
        Nenhum registro encontrado.
      </div>
    )
  }

  return (
    <div style={{ padding: 16 }}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.id}
            style={{
              background: '#f3f4f6',
              borderRadius: 4,
              padding: 12,
              marginBottom: 12,
            }}
          >
            <button
              type='button'
              onClick={() => setOpenIndex(isOpen ? null : index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                background: 'transparent',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                color: '#1f2937',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 0,
                  height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: isOpen
                    ? 'none'
                    : '6px solid #1f2937',
                  borderBottom: isOpen
                    ? '6px solid #1f2937'
                    : 'none',
                  transform: isOpen ? 'translateY(-1px)' : 'none',
                }}
              />
              <span style={{ flex: 1 }}>{item.dateLabel}</span>
            </button>

            <div
              style={{
                marginTop: 4,
                fontSize: 12,
                color: '#6b7280',
                paddingLeft: 18,
              }}
            >
              Precisão da Coordenada {item.precision} | Distância entre
              os pontos centrais do raios: {item.distance}
            </div>

            {isOpen ? (
              <div
                style={{
                  marginTop: 12,
                  borderRadius: 4,
                  overflow: 'hidden',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                }}
              >
                <Map type={type} />
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
