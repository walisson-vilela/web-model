import { useEffect, useState } from 'react'

import { Button } from '@mw-kit/mw-ui'
import { Icon } from 'semantic-ui-react'

import { DistributionSignature, DistributionSignatureEpi } from '../../../../../interfaces'
import { listSignatureEpis } from '../../../../services'
import * as S from './styles'

type PendingItemProps = {
  data: DistributionSignature
  distributionId: number
}

const PendingItem = ({ data, distributionId }: PendingItemProps) => {
  const [open, setOpen] = useState(false)
  const [epis, setEpis] = useState<DistributionSignatureEpi[]>(data.epis || [])
  const [loadingEpis, setLoadingEpis] = useState(false)
  const [loaded, setLoaded] = useState((data.epis || []).length > 0)

  useEffect(() => {
    if (!open || loaded) return

    let mounted = true
    const load = async () => {
      setLoadingEpis(true)
      try {
        const items = await listSignatureEpis(distributionId, data.id)
        if (mounted) {
          setEpis(items)
          setLoaded(true)
        }
      } catch (error) {
        console.error(error)
        if (mounted) setEpis([])
      } finally {
        if (mounted) setLoadingEpis(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [open, loaded, distributionId, data.id])

  return (
    <S.SignatureCard>
      <S.SignatureColumns>
        <S.Column>
          <S.ColumnValue>
            <S.ValueBold>{data.signer.name}</S.ValueBold> | Matrícula: {data.signer.registry}
          </S.ColumnValue>
          <S.ColumnTitle>Função: {data.signer.role}</S.ColumnTitle>
          <S.ColumnTitle>Supervisor: {data.signer.supervisor}</S.ColumnTitle>
        </S.Column>

        <S.Column>
          {data.episBadge && (
            <S.DeliveredBadge>EPI&apos;s Entregues</S.DeliveredBadge>
          )}
        </S.Column>

        <S.ContractButtonWrapper>
          <Button
            appearance='solid'
            size='small'
            className='primary'
            disabled
            style={{ width: 'auto' }}
          >
            Baixar Contrato
          </Button>
        </S.ContractButtonWrapper>
      </S.SignatureColumns>

      <S.EpisSection>
        <S.EpisToggle type='button' onClick={() => setOpen((prev) => !prev)}>
          <Icon name={open ? 'chevron up' : 'chevron down'} />
          EPIs Entregues:{' '}
          <S.EpisCount>
            {String(data.episDeliveredCount).padStart(2, '0')}
          </S.EpisCount>
        </S.EpisToggle>

        {open && (
          <S.EpisContent>
            {loadingEpis ? (
              <S.EpisList>
                <S.EpiItem>Carregando EPIs...</S.EpiItem>
              </S.EpisList>
            ) : epis.length === 0 ? (
              <S.EpisList>
                <S.EpiItem>Nenhum EPI registrado.</S.EpiItem>
              </S.EpisList>
            ) : (
              <S.EpisList>
                {epis.map((epi) => (
                  <S.EpiItem key={epi.id}>
                    {epi.label}
                    {epi.size ? ` (${epi.size})` : ''}
                    <S.QuantityPill>{epi.quantity}</S.QuantityPill>
                  </S.EpiItem>
                ))}
              </S.EpisList>
            )}

            <S.PartialBadgeColumn />
          </S.EpisContent>
        )}
      </S.EpisSection>
    </S.SignatureCard>
  )
}

export default PendingItem
