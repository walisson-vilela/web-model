import React from 'react'

type SummaryCardProps = {
  label: string
  value: React.ReactNode
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value }) => {
  return (
    <div
      style={{
        flex: 1,
        borderRadius: 4,
        border: '1px solid #e5e7eb',
        padding: '8px 12px',
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: '#6b7280',
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 600,
          color: '#111827',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {value}
      </div>
    </div>
  )
}

export default SummaryCard
