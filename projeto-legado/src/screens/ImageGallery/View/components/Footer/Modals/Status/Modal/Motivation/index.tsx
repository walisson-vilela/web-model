import React, { useCallback, useContext, useEffect, useState } from 'react'

import { SearchFilter } from '@mw-kit/mw-manager'
import { MwButton } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Checkbox, Loader, Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../../../../../components/Toaster'
import { GalleryViewContext } from '../../../../../../context'
import {
  approvationImage,
  listClassifications,
} from '../../../../../../service'
import { StatusData } from '../../../../../Popup/SelectConfirmation/interface'
import { ClassificationProps, StatusProps } from '../../interface'

import * as S from './style'

const Motivation = (props: StatusProps) => {
  const { setStatusModal, handleToogleStatus, handleUnCheckAll } =
    useContext(GalleryViewContext)

  const { approved, images } = props
  const [search, setSearch] = useState<string>()
  const [checked, setChecked] = useState<number>()
  const [formLoading, setFormLoading] = useState<boolean>(false)
  const [statusData, setStatusData] = useState<StatusData>()
  const [optionsCassifications, setOptionsClassifications] = useState<
    ClassificationProps[]
  >([])

  const loadingOptionsData = useCallback(async () => {
    setFormLoading(true)
    const isApproved = approved === 'R' ? 11 : 10
    try {
      const response = await listClassifications(isApproved, search)
      if (response) {
        setOptionsClassifications(response)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setFormLoading(false)
    }
  }, [search])

  const handleApplyStatus = async () => {
    try {
      const { success } = await approvationImage(statusData)
      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        images.map((image) =>
          handleToogleStatus(
            image.card.id,
            statusData.status,
            image.accordionId,
          ),
        )
        handleUnCheckAll()
        setStatusModal(<React.Fragment />)
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    }
  }

  useEffect(() => {
    loadingOptionsData()
  }, [loadingOptionsData])

  useEffect(() => {
    setStatusData({
      ids: images.map((image) => image.card.id),
      notes: '',
      reason_id: checked,
      status: props.approved === 'A' ? 1 : 2,
    })
  }, [checked])

  return (
    <Modal open style={{ width: '720px', padding: 0 }}>
      <S.Header>
        Status: {props.approved === 'A' ? 'Aprovar' : 'Reprovar'}
      </S.Header>
      <S.Main>
        <S.Content>
          <S.ContentHeader>
            <strong>Motivo:</strong>
            <SearchFilter setSearch={setSearch} />
          </S.ContentHeader>
          {formLoading ? (
            <S.LoaderContainer>
              <Loader active />
            </S.LoaderContainer>
          ) : (
            <React.Fragment>
              <S.Motivation>
                {optionsCassifications.map((item) => (
                  <Checkbox
                    key={item.id}
                    radio
                    checked={checked === item.id}
                    label={item.name}
                    onClick={() => setChecked(item.id)}
                    className='checkTransferRadio'
                  />
                ))}
              </S.Motivation>
              <S.Notification>
                <p>
                  Nem todas as imagens selecionadas estão na condição que
                  permite a ação de{' '}
                  {props.approved === 'A' ? "'Aprovação'" : "'Reprovação'"}
                </p>
              </S.Notification>
            </React.Fragment>
          )}

          <S.Footer>
            <div>
              <p>
                <b>
                  {images.length >= 1 && images.length < 10
                    ? `0${images.length}`
                    : images.length}
                </b>{' '}
                image
                {images.length > 1 ? 'ns selecionadas' : 'm selecionada'}
              </p>
            </div>
            <div>
              <MwButton
                appearance='borderless'
                content='Cancelar'
                onClick={() => setStatusModal(<React.Fragment />)}
              />
              <MwButton
                appearance='solid'
                content='Aplicar'
                disabled={checked === undefined}
                onClick={handleApplyStatus}
              />
            </div>
          </S.Footer>
        </S.Content>
      </S.Main>
    </Modal>
  )
}

export default Motivation
