import React from 'react'

interface StepIndicatorsProps {
  step: number
  onStepClick?: (target: number) => void
}

const StepIndicators: React.FC<StepIndicatorsProps> = ({ step, onStepClick }) => {
  const steps = [1, 2, 3]
  const canGo = (n: number) => n < step

  const handleClick = (n: number) => {
    if (canGo(n) && onStepClick) onStepClick(n)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, n: number) => {
    if (!canGo(n)) return
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onStepClick?.(n)
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
      {steps.map((n, i) => (
        <React.Fragment key={n}>
          <div
            onClick={() => handleClick(n)}
            onKeyDown={(e) => handleKeyDown(e, n)}
            role={canGo(n) ? 'button' : undefined}
            tabIndex={canGo(n) ? 0 : -1}
            aria-disabled={!canGo(n)}
            title={canGo(n) ? `Ir para o passo ${n}` : undefined}
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: step === n ? '#1F3E8A' : '#fff',
              border: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: step === n ? '#fff' : '#555',
              fontWeight: 500,
              fontSize: 18,
              cursor: canGo(n) ? 'pointer' : 'default',
              userSelect: 'none',
            }}
          >
            {n}
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 1, background: '#ccc', minWidth: 160 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default StepIndicators
