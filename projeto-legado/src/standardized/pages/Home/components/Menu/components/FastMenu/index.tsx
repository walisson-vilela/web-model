import { useHistory } from 'react-router'

import useHomeContext from '../../../../context'
import * as T from '../../../../types'
import { isActive } from '../../functions'
import Icon from '../Icon'

import * as S from './styles'

const className = 'menu-item'

const onMouseEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
  const item = ((target: HTMLElement | null) => {
    while (target && !target.classList.contains(className)) {
      target = target.parentElement
    }
    return target
  })(e.target as HTMLElement | null)
  if (!item) return

  const hover = item.lastChild as HTMLElement
  const container = item.parentElement as HTMLElement

  const center = item.offsetTop + item.offsetHeight / 2
  const p = ((center - container.scrollTop) * 100) / container.offsetHeight
  hover.style.height = ''
  hover.style.marginTop =
    p > 75 ? `-${hover.clientHeight - item.clientHeight}px` : ''
}

const FastMenu = (props: {
  items: T.Item[]
  open: boolean
  setItemOpen?: (idx: number) => void
}) => {
  const { open, items, setItemOpen = () => {} } = props

  const { disabled } = useHomeContext()

  const history = useHistory()

  return (
    <S.ItemsContainer
      style={
        open
          ? {
              opacity: 0,
              zIndex: -1,
            }
          : {}
      }
    >
      <div>
        {items.map((item, idx) => {
          return (
            <div
              key={idx}
              className={[
                className,

                ...(!!item.target && isActive(item.target) ? ['active'] : []),

                disabled ? ['disabled'] : [],
              ].join(' ')}
              onMouseEnter={onMouseEnter}
            >
              <Icon item={item} onClick={() => setItemOpen(idx)} />

              <S.HoverContainer style={{ height: 0 }}>
                {(item.children.length > 0 ? item.children : [item]).map(
                  (child, idx) => (
                    <div
                      key={idx}
                      {...(isActive(child.target)
                        ? {
                            className: 'active',
                          }
                        : {
                            onClick: () => history.push(child.target),
                          })}
                      children={child.name}
                    />
                  ),
                )}
              </S.HoverContainer>
            </div>
          )
        })}
      </div>
    </S.ItemsContainer>
  )
}

export default FastMenu
