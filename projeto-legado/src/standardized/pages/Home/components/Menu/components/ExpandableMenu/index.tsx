import { useEffect, useState } from 'react'

import { MwEllipsisContainer, MwIcon } from '@mw-kit/mw-ui'
import { useHistory } from 'react-router'

import * as T from '../../../../types'
import { CONTAINER_EXPANDED_WIDTH } from '../../constants'
import { isActive } from '../../functions'
import Icon from '../Icon'

import * as S from './styles'

const ExpandableMenu = (props: {
  items: T.Item[]
  itemOpen: [number | null, React.Dispatch<React.SetStateAction<number | null>>]
  open: boolean
  loading: boolean
  close: () => void
}) => {
  const {
    items,
    open,
    itemOpen: [itemOpen, setItemOpen],
    loading,
    close,
  } = props

  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref || itemOpen === null) return
    const div = ref.childNodes[itemOpen] as HTMLDivElement | undefined
    const id = setTimeout(() => div?.scrollIntoView(true), 250)
    return () => clearTimeout(id)
  }, [ref, itemOpen])

  const history = useHistory()

  const push = (target: string) => {
    history.push(target)
    close()
  }

  return (
    <S.Container
      ref={setRef}
      style={
        open && !loading
          ? {
              width: CONTAINER_EXPANDED_WIDTH,
            }
          : {
              width: '100%',
              opacity: 0,
              zIndex: -1,
            }
      }
    >
      {items.map((item, idx) => {
        const active = !!item.target && isActive(item.target)

        return (
          <S.ItemContainer
            key={idx}
            className={[
              ...(active ? ['active'] : []),
              ...(itemOpen === idx ? ['open'] : []),
            ].join(' ')}
          >
            <S.NameContainer
              {...(() => {
                if (!open || loading) return {}

                return {
                  onClick: () =>
                    setItemOpen((prev) => (prev === idx ? null : idx)),
                }
              })()}
            >
              <Icon item={item} />

              <MwEllipsisContainer children={item.name} />

              <S.ChevronContainer>
                <MwIcon
                  type='feather'
                  icon='chevron_down'
                  color='white'
                  width='18px'
                  height='18px'
                  strokeWidth='3px'
                />
              </S.ChevronContainer>
            </S.NameContainer>

            <S.ChildrenContainer
              style={{
                height: itemOpen === idx ? (item.children.length || 1) * 33 : 0,
              }}
            >
              {(item.children.length > 0 ? item.children : [item]).map(
                (child, idx) => (
                  <S.ChildContainer
                    key={idx}
                    {...(isActive(child.target)
                      ? {
                          className: 'active',
                        }
                      : {
                          onClick: () => push(child.target),
                        })}
                    children={child.name}
                  />
                ),
              )}
            </S.ChildrenContainer>
          </S.ItemContainer>
        )
      })}
    </S.Container>
  )
}

export default ExpandableMenu
