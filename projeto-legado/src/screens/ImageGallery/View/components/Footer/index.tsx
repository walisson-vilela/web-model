import React, { useContext, useEffect, useState } from 'react'

import { GalleryViewContext } from '../../context'

import Icons from './Components/Icons'
import * as S from './style'

const Footer = () => {
  const { checkedImage } = useContext(GalleryViewContext)
  const [totalSelect, setTotalSelect] = useState<number>()

  useEffect(() => {
    setTotalSelect(0)
    setTotalSelect(checkedImage.length)
  }, [checkedImage])

  return (
    <S.Main>
      <span style={{ width: '160px' }}>
        <strong>
          {totalSelect >= 1 && totalSelect <= 9
            ? `0${totalSelect} `
            : totalSelect}{' '}
        </strong>
        Image
        {totalSelect > 1 ? 'ns selecionadas' : 'm selecionada'}
      </span>
      <Icons />
    </S.Main>
  )
}

export default Footer
