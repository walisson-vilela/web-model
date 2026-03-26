import { useState } from 'react'

import { MwIcon, MwMenu } from '@mw-kit/mw-ui'

import * as S from './styles'

const PrintMenu = () => {
  const [open, setOpen] = useState(false)

  const handlePrint = () => {
    setOpen(false)
    window.print()
  }

  return (
    <S.MoreWrapper>
      <MwIcon
        type='feather'
        icon='more_vertical'
        onClick={() => setOpen((prev) => !prev)}
      />
      <MwMenu
        open={open}
        close={() => setOpen(false)}
        options={[
          {
            label: 'Imprimir',
            onClick: handlePrint,
          },
        ]}
        position='top left'
        containerSpacing='s1'
      />
    </S.MoreWrapper>
  )
}

export default PrintMenu

