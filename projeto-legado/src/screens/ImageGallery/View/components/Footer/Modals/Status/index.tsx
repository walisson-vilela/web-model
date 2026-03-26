import React, { useContext, useEffect, useState } from 'react'

import Modal, { ModalState } from '../../../../../../../components/MwModal'
import { GalleryViewContext } from '../../../../context'
import { CardInterface } from '../../../Card/interface'

import Motivation from './Modal/Motivation'
import { StatusProps } from './interface'
import * as S from './style'

const Status = (props: StatusProps) => {
  const { setStatusModal } = useContext(GalleryViewContext)
  const [data] = useState<CardInterface[]>(props.images)
  const [infoModal, setInfoModal] = useState<ModalState>()

  useEffect(() => {
    if (props.approved === 'A') {
      setInfoModal({
        title: 'Aprovar Imagem',
        content: (
          <React.Fragment>
            <S.ModalText>
              Você tem{' '}
              <b>
                {data.length >= 1 && data.length <= 9
                  ? `0${data.length} `
                  : data.length}{' '}
                Image
                {data.length > 1 ? 'ns' : 'm'}
              </b>{' '}
              na condição que permite a ação de Aprovação. Deseja Confirmar?
            </S.ModalText>
          </React.Fragment>
        ),
        buttonType: 'MwButton',
        actions: [
          {
            appearance: 'borderless',
            content: 'Cancelar',
            onClick: () => setStatusModal(<React.Fragment />),
          },
          {
            appearance: 'solid',
            content: 'Confirmar',
            onClick: () =>
              setStatusModal(<Motivation approved='A' images={data} />),
          },
        ],
      })
    } else {
      setInfoModal({
        title: 'Reprovar Imagem',
        content: (
          <React.Fragment>
            <S.ModalText>
              Você tem{' '}
              <b>
                {data.length >= 1 && data.length <= 9
                  ? `0${data.length} `
                  : data.length}{' '}
                Image
                {data.length > 1 ? 'ns' : 'm'}{' '}
              </b>
              na condição que permite a ação de Reprovação. Deseja Confirmar?
            </S.ModalText>
          </React.Fragment>
        ),
        buttonType: 'MwButton',
        actions: [
          {
            appearance: 'borderless',
            content: 'Cancelar',
            onClick: () => setStatusModal(<React.Fragment />),
          },
          {
            appearance: 'solid',
            content: 'Confirmar',
            color: 'red',
            onClick: () =>
              setStatusModal(<Motivation approved='R' images={data} />),
          },
        ],
      })
    }
  }, [])

  return <Modal modal={infoModal} />
}

export default Status
