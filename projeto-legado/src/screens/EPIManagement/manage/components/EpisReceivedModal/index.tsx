import React, { useEffect, useState } from 'react'

import { MwButton } from '@mw-kit/mw-ui'

import Modal from '../../../../../components/MwModal'
import { WorkerEpiDistribution, WorkerEpiRow } from '../../interfaces'
import { listWorkerEpisReceived } from '../../services'

type EpisReceivedModalProps = {
  close: () => void
  worker: WorkerEpiRow
}

const formatDateTime = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

const EpisReceivedModal = ({ close, worker }: EpisReceivedModalProps) => {
  const [distributions, setDistributions] = useState<WorkerEpiDistribution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const load = async () => {
      try {
        const data = await listWorkerEpisReceived(worker.id)
        if (mounted) setDistributions(data)
      } catch (error) {
        console.error(error)
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [worker.id])

  return (
    <Modal.Modal open size='large'>
      <Modal.Header color='blue'>EPI&apos;s Recebidos</Modal.Header>
      <Modal.Body style={{ padding: '16px 24px 24px' }}>
        <p
          style={{
            margin: '0 0 16px',
            fontSize: 13,
            color: '#111827',
          }}
        >
          Nome do Colaborador:{' '}
          <strong>{worker.name}</strong>
        </p>

        {loading ? (
          <div
            style={{
              minHeight: 220,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#6b7280',
              fontSize: 13,
            }}
          >
            Carregando distribuições...
          </div>
        ) : (
          <div
            style={{
              maxHeight: 360,
              overflowY: 'auto',
            }}
          >
            {distributions.map((distribution) => (
              <div
                key={distribution.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 32,
                  padding: '12px 0',
                  borderBottom: '1px solid #e5e7eb',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: '0 0 4px',
                      fontSize: 12,
                      color: '#6b7280',
                    }}
                  >
                    Data/Hora:{' '}
                    <strong>{formatDateTime(distribution.deliveredAt)}</strong>
                  </p>
                  <p
                    style={{
                      margin: '0 0 4px',
                      fontSize: 12,
                      color: '#6b7280',
                    }}
                  >
                    Código da Distribuição:{' '}
                    <strong>{distribution.distributionCode}</strong>
                  </p>
                  <p
                    style={{
                      margin: '0 0 8px',
                      fontSize: 12,
                      color: '#6b7280',
                    }}
                  >
                    Entregue por:{' '}
                    <strong>{distribution.deliveredBy}</strong>
                  </p>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                      columnGap: 16,
                      rowGap: 4,
                    }}
                  >
                    {distribution.items.map((item) => (
                      <div
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: '#111827',
                          }}
                        >
                          • {item.name}
                        </span>
                        <span
                          style={{
                            minWidth: 24,
                            padding: '2px 8px',
                            borderRadius: 999,
                            backgroundColor: '#f3f4f6',
                            fontSize: 12,
                            textAlign: 'center',
                            color: '#111827',
                          }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    minWidth: 140,
                    textAlign: 'center',
                    alignSelf: 'flex-start',
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 4px',
                      fontSize: 12,
                      color: '#6b7280',
                    }}
                  >
                    Qtde. Baixada:
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      fontWeight: 600,
                      color: '#111827',
                    }}
                  >
                    {distribution.totalDelivered}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <MwButton
          appearance='solid'
          className='primary'
          content='OK'
          onClick={close}
        />
      </Modal.Footer>
    </Modal.Modal>
  )
}

export default EpisReceivedModal
