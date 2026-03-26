import {
  ReactNode,
  useMemo,
  CSSProperties,
  useState,
  createContext,
  useContext,
} from 'react'

import { MwIcon } from '@mw-kit/mw-ui'
import { Popup } from 'semantic-ui-react'

import * as S from './styles'
import type { CardStatus } from './styles'

type CardActionsContextValue = {
  setHeaderActions: (node: ReactNode) => void
}

const CardActionsContext = createContext<CardActionsContextValue | null>(null)

export const useCardHeaderActions = () => {
  const context = useContext(CardActionsContext)
  if (!context) {
    throw new Error('useCardHeaderActions must be used within a Card component')
  }

  return context.setHeaderActions
}

export type { CardStatus }

export type CardStatusTooltip = {
  title: string
  items: Array<{ color: CardStatus; label: string }>
}

export type CardProps = {
  title?: string
  onDetail?: () => void
  footer?: ReactNode
  status?: CardStatus
  tooltip?: CardStatusTooltip
  children: ReactNode
  style?: CSSProperties
}

const Card = ({
  title,
  onDetail,
  footer,
  status,
  tooltip,
  children,
  style,
}: CardProps) => {
  const [headerActions, setHeaderActions] = useState<ReactNode>(null)
  const statusContent = useMemo(() => {
    if (!status) return null

    const border = <S.StatusBorder $status={status} />

    if (!tooltip) return border

    return (
      <Popup
        content={
          <S.TooltipContent>
            <strong>{tooltip.title}</strong>
            <ul>
              {tooltip.items.map((item, index) => (
                <li key={`tooltip-item-${index}`}>
                  <span data-color={item.color} />
                  {item.label}
                </li>
              ))}
            </ul>
          </S.TooltipContent>
        }
        trigger={border}
        on='hover'
        position='right center'
        inverted
        pinned
      />
    )
  }, [status, tooltip])

  return (
    <CardActionsContext.Provider value={{ setHeaderActions }}>
      <S.Card style={style}>
        {statusContent}

        {(title || onDetail) && (
          <S.Header>
            {title && <S.Title>{title}</S.Title>}
            {(headerActions || onDetail) && (
              <S.HeaderActions>
                {headerActions}
                {onDetail && (
                  <S.DetailButton
                    type='button'
                    onClick={onDetail}
                    aria-label='Ver detalhamento'
                  >
                    <MwIcon type='feather' icon='external_link' width={16} height={16} />
                  </S.DetailButton>
                )}
              </S.HeaderActions>
            )}
          </S.Header>
        )}

        <S.Content>{children}</S.Content>

        {footer && <S.Footer>{footer}</S.Footer>}
      </S.Card>
    </CardActionsContext.Provider>
  )
}

export default Card
