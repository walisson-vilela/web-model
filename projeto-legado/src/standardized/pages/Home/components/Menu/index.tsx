import { useCallback, useState } from 'react'

import { useOnClickOutState } from '../../../../../utils/hooks'
import useHomeContext from '../../context'
import DisabledPopup from '../DisabledPopup'

import * as C from './components'
import * as S from './styles'

const Menu = () => {
  const { menus: items, isLoading } = useHomeContext()
  const [open, setOpen] = useState<boolean>(false)

  const loading = isLoading('menus')

  const [itemOpen, setItemOpen] = useState<number | null>(null)

  const close = () => {
    setOpen(false)
    setItemOpen(null)
  }

  const toggle = useCallback(() => {
    if (open) setItemOpen(null)
    setOpen(!open)
  }, [open, loading])

  return (
    <S.HamburguerContainer ref={useOnClickOutState(close)}>
      <C.Hamburguer.Provider value={{ loading, toggle }}>
        <DisabledPopup
          offset={[10, -10]}
          trigger={C.Hamburguer}
          position='bottom right'
        />
      </C.Hamburguer.Provider>

      <C.Workspace open={open} />

      <S.Container $loading={loading}>
        <C.ExpandableMenu
          items={items}
          itemOpen={[itemOpen, setItemOpen]}
          open={open}
          close={close}
          loading={loading}
        />

        <C.FastMenu
          items={items}
          open={open && !loading}
          {...(open || loading
            ? {}
            : {
                setItemOpen: (idx) => {
                  setItemOpen(idx)
                  setOpen(true)
                },
              })}
        />
      </S.Container>
    </S.HamburguerContainer>
  )
}

export default Menu
