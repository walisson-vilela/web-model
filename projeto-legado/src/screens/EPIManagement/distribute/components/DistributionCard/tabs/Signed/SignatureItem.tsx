import { useEffect, useState } from 'react'

import { Button } from '@mw-kit/mw-ui'
import { Icon } from 'semantic-ui-react'

import { DistributionSignature, DistributionSignatureEpi } from '../../../../../interfaces'
import { listSignatureEpis } from '../../../../services'
import * as S from './styles'

type SignatureItemProps = {
  data: DistributionSignature
  distributionId: number
}

const SignatureItem = ({ data, distributionId }: SignatureItemProps) => {
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
          <S.ColumnValue>Função: {data.signer.role}</S.ColumnValue>
          <S.ColumnValue>Supervisor: {data.signer.supervisor}</S.ColumnValue>
        </S.Column>

        <S.Column>
          <S.ColumnTitle>Hash da Assinatura: <S.ValueBold>{data.audit.hash}</S.ValueBold></S.ColumnTitle>
          <S.ColumnTitle>
            System ID: <S.ValueBold>{data.audit.systemId}
            {data.audit.device ? ` (${data.audit.device})` : ''}</S.ValueBold>
          </S.ColumnTitle>
          <S.ColumnTitle>
            Data/Hora: <S.ValueBold>{new Date(data.audit.signedAt).toLocaleString('pt-BR')}</S.ValueBold>
          </S.ColumnTitle>
        </S.Column>

        <S.ContractButtonWrapper>
          <Button
            appearance='solid'
            size='small'
            className='primary'
            onClick={() => window.open(data.contractUrl || '#', '_blank')}
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

            <S.PartialBadgeColumn>
              {data.hasPartialDelivery && (
                <S.PartialBadge>Entrega Parcial</S.PartialBadge>
              )}
            </S.PartialBadgeColumn>
          </S.EpisContent>
        )}
      </S.EpisSection>
    </S.SignatureCard>
  )
}

export default SignatureItem
