import { useState } from 'react'

import { MwIcon, MwMenu } from '@mw-kit/mw-ui'

import * as S from './styles'

const MoreOptionsMenu = () => {
  const [open, setOpen] = useState(false)

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
            label: 'Exportar',
            onClick: () => {
              console.log('Exportar clique')
            },
          },
        ]}
        position='top left'
        containerSpacing='s1'
      />
    </S.MoreWrapper>
  )
}

export default MoreOptionsMenu
