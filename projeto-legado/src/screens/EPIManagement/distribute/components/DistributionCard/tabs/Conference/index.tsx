import React, { useEffect, useRef, useState } from 'react'

import { Icon } from 'semantic-ui-react'
import { useReactToPrint } from 'react-to-print'

import { DistributionConferenceEpi } from '../../../../../distribute/interfaces'
import { listDistributionConference } from '../../../../services'
import * as S from './styles'

type ConferenceTabProps = {
  distributionId: number
}

const ConferenceTab = ({ distributionId }: ConferenceTabProps) => {
  const [items, setItems] = useState<DistributionConferenceEpi[]>([])
  const [loading, setLoading] = useState(false)
  const printRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    removeAfterPrint: true,
  })

  useEffect(() => {
    let mounted = true

    const load = async () => {
      setLoading(true)
      try {
        const data = await listDistributionConference(distributionId)
        if (mounted) setItems(data)
      } catch (error) {
        console.error(error)
        if (mounted) setItems([])
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [distributionId])

  const hasItems = items && items.length > 0

  return (
    <S.Container ref={printRef}>
      <S.Header>
        <S.Title>Lista de EPI&apos;s</S.Title>

        <S.PrintButton
          type='button'
          aria-label='Imprimir lista de EPIs'
          onClick={handlePrint}
        >
          <Icon name='print' />
        </S.PrintButton>
      </S.Header>

      {loading ? (
        <span>Carregando lista de EPI&apos;s...</span>
      ) : hasItems ? (
        <S.List>
          {items.map((epi, index) => (
            <React.Fragment key={epi.id}>
              <S.EpiContainer>
                <S.EpiName>{epi.name}</S.EpiName>

                <S.SizesList>
                  {epi.sizes.map((size) => (
                    <S.SizeRow key={size.id}>
                      <S.SizeLabelWrapper>
                        <S.Bullet />
                        <S.SizeLabel>{size.label}</S.SizeLabel>
                      </S.SizeLabelWrapper>

                      <S.QuantityPill>{size.quantity}</S.QuantityPill>
                    </S.SizeRow>
                  ))}
                </S.SizesList>
              </S.EpiContainer>

              {index < items.length - 1 && <S.Separator />}
            </React.Fragment>
          ))}
        </S.List>
      ) : (
        <span>Nenhum EPI encontrado para esta distribuição.</span>
      )}
    </S.Container>
  )
}

export default ConferenceTab
