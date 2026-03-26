import { useEffect, useState } from 'react'

import { MwPlaceholder } from '@mw-kit/mw-ui'

import { CARD_CONFIGS, DEFAULT_PLACEHOLDER_TYPE } from '../../cardsConfig'
import type { CardView } from '../../cardViewTypes'
import { fetchCardData } from '../../services'
import Card from '../Card'
import * as S from './styles'

type CardContainerProps = {
  id: string
  onOpenDetail?: (cardId: string) => void
}

const loadQueue: (() => Promise<void>)[] = []
let queueRunning = false

const enqueueLoad = async (task: () => Promise<void>) => {
  loadQueue.push(task)
  if (queueRunning) return
  queueRunning = true
  while (loadQueue.length > 0) {
    const next = loadQueue.shift()
    if (next) {
      try {
        await next()
      } catch (error) {
        console.error(error)
      }
    }
  }
  queueRunning = false
}

const CardContainer = ({ id, onOpenDetail }: CardContainerProps) => {
  const config = CARD_CONFIGS[id]
  const placeholderType = config?.placeholderType ?? DEFAULT_PLACEHOLDER_TYPE

  const [view, setView] = useState<CardView | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setLoading(true)

    const loadCard = async () => {
      try {
        if (config) {
          const data = await config.load()
          if (isMounted) {
            setView(config.build(data))
          }
        } else {
          const data = await fetchCardData(id)
          if (isMounted) {
            setView({
              title: data.title,
              content: <span>{data.content}</span>,
            })
          }
        }
      } catch (error) {
        console.error(error)
        if (isMounted) {
          setView({
            title: `Card ${id}`,
            content: <span>Não foi possível carregar os dados.</span>,
          })
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    enqueueLoad(loadCard)

    return () => {
      isMounted = false
    }
  }, [config, id])

  if (loading || !view) {
    return (
      <S.CardSlot>
        <S.PlaceholderCard>
          <S.PlaceholderWrapper>
            <MwPlaceholder loading type={placeholderType} />
          </S.PlaceholderWrapper>
        </S.PlaceholderCard>
      </S.CardSlot>
    )
  }

  return (
    <S.CardSlot>
      <Card
        id={id}
        title={view.title}
        status={view.status}
        footer={view.footer}
        onDetail={onOpenDetail}
      >
        {view.content}
      </Card>
    </S.CardSlot>
  )
}

export default CardContainer