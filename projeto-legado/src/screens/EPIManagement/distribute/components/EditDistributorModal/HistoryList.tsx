import React from 'react'

type HistoryItem = {
  id: number
  name: string
  startAt: string
  endAt?: string | null
}

type HistoryListProps = {
  items: HistoryItem[]
  loading: boolean
  formatDateTime: (value: string) => string
}

const HistoryList = ({ items, loading, formatDateTime }: HistoryListProps) => {
  if (loading) {
    return <span>Carregando histórico...</span>
  }

  if (items.length === 0) {
    return <span>Nenhum distribuidor encontrado.</span>
  }

  return (
    <>
      {items.map((item, index) => (
        <HistoryListItem
          key={item.id}
          item={item}
          showDivider={index < items.length - 1}
          formatDateTime={formatDateTime}
        />
      ))}
    </>
  )
}

const HistoryListItem = ({
  item,
  showDivider,
  formatDateTime,
}: {
  item: HistoryItem
  showDivider: boolean
  formatDateTime: (value: string) => string
}) => (
  <div style={{ paddingBottom: 12 }}>
    <div
      style={{
        fontSize: 13,
        fontWeight: 600,
        color: '#111827',
        marginBottom: 4,
      }}
    >
      {item.name}
    </div>
    <div
      style={{
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 8,
      }}
    >
      De {formatDateTime(item.startAt)} a{' '}
      {item.endAt ? formatDateTime(item.endAt) : 'Indefinido'}
    </div>
    {showDivider && (
      <div
        style={{
          height: 1,
          backgroundColor: '#e5e7eb',
          marginBottom: 8,
        }}
      />
    )}
  </div>
)

export default HistoryList
