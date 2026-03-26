import React, { useContext } from 'react'

import fileDownload from 'js-file-download'
import moment from 'moment'
import { FiAlertTriangle, FiEdit2, FiX } from 'react-icons/fi'
import { Popup } from 'semantic-ui-react'

import axios from '../../../../../../../../../services/Axios'
import { notEmptyStringOrDefault } from '../../../../../../../../../utils/Formatters'
import PopupJustificationType from '../../../../../PopupJustificationType'
import { JustificationNonAttendanceContext } from '../../../../../context'
import { UserSideContext } from '../../context'

import * as S from './styles'

interface JustificationContainerProps {
  props: {
    tabId: number
    openJustificationPopup: boolean
    setOpenJustificationPopup: React.Dispatch<React.SetStateAction<boolean>>
    openJustificationPopupRef: React.MutableRefObject<any>
  }
}

export const JustificationContainer = ({
  props,
}: JustificationContainerProps) => {
  const {
    tabId,
    openJustificationPopup,
    setOpenJustificationPopup,
    openJustificationPopupRef,
  } = props
  const { userInfo } = useContext(JustificationNonAttendanceContext)
  const { payloadData, setPayloadData } = useContext(UserSideContext)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files[0]
    setPayloadData((prev) => ({
      audit: prev.audit,
      justify_type_id: prev.justify_type_id,
      file: image,
    }))
  }

  const handleImageDownload = async () => {
    try {
      const request = await axios.get(
        `/v1/files/download/${userInfo.file.id}`,
        {
          responseType: 'blob',
        },
      )

      await fileDownload(request.data, `${userInfo.file.name}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <S.JustificationContainer>
      <S.Data>
        <strong>Dados da Justificativa</strong>
        {tabId === 2 && (
          <S.StatusContainer status={userInfo.audit.status}>
            <div></div>
            <span>{userInfo.audit.status}</span>
          </S.StatusContainer>
        )}
        <span>
          <strong>Usuário:</strong>{' '}
          {notEmptyStringOrDefault(userInfo.people.name, '')}{' '}
          <strong>| Função:</strong>{' '}
          {userInfo.people.role
            ? notEmptyStringOrDefault(userInfo.people.role.name, '')
            : ''}
        </span>
        <span>
          <strong>Data da Justificativa:</strong>{' '}
          {moment(userInfo.created_at).format('DD/MM/YYYY')}{' '}
          <strong>| Superior Direto:</strong>{' '}
          {userInfo.people.supervisor
            ? notEmptyStringOrDefault(userInfo.people.supervisor.name, '')
            : ''}
        </span>
        <span>
          <strong>Roteiro:</strong>{' '}
          {notEmptyStringOrDefault(userInfo.people.routes[0].name, '')}{' '}
          <strong>| Área de Atuação:</strong>{' '}
          {userInfo.people.routes[0].region
            ? userInfo.people.routes[0].region.name
            : 'Sem área de Atuação'}
        </span>
      </S.Data>
      <hr />
      <S.Data>
        <span>
          <strong>Justificativa:</strong>{' '}
          {payloadData.justify_type_id
            ? payloadData.justify_type_id.name
            : 'Sem Justificativa'}{' '}
          {tabId !== 2 && (
            <React.Fragment>
              <Popup
                on='click'
                pinned
                position='right center'
                open={openJustificationPopup}
                content={
                  <div ref={openJustificationPopupRef}>
                    <PopupJustificationType
                      setOpenJustificationPopup={setOpenJustificationPopup}
                    />
                  </div>
                }
                trigger={
                  <FiEdit2
                    size={12}
                    color='#192338'
                    onClick={() => setOpenJustificationPopup(true)}
                  />
                }
              />
              <Popup
                className='popup-field'
                on='hover'
                pinned
                position='right center'
                content={
                  <S.PopupContent>
                    <span>
                      Avalie a necessidade de Inativar o Usuário de acordo com
                      as datas informadas
                    </span>
                  </S.PopupContent>
                }
                trigger={<FiAlertTriangle size={12} color='#E06666' />}
              />
            </React.Fragment>
          )}
        </span>
        <span>
          <strong>Período:</strong>{' '}
          {`${moment(userInfo.start).format('DD/MM/YYYY')} à ${moment(
            userInfo.end,
          ).format('DD/MM/YYYY')}`}{' '}
          <strong>| Impacto em dias:</strong> {userInfo.impact_days} dias
        </span>
        <span>
          {tabId !== 2 ? (
            <React.Fragment>
              <label>
                <strong>Anexo:</strong>{' '}
                {payloadData.file
                  ? payloadData.file.name
                  : 'Selecione um anexo'}{' '}
                <input
                  type='file'
                  accept='image/*'
                  onChange={(e) => handleImageUpload(e)}
                />
              </label>
              {payloadData.file && (
                <FiX
                  size={12}
                  color='#192338'
                  onClick={(e) => {
                    setPayloadData((prev) => ({
                      audit: prev.audit,
                      justify_type_id: prev.justify_type_id,
                      file: null,
                    }))
                  }}
                />
              )}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <S.attachmentText onClick={() => handleImageDownload()}>
                <strong>Anexo:</strong>{' '}
                {payloadData.file ? payloadData.file.name : 'Sem anexo'}
              </S.attachmentText>
            </React.Fragment>
          )}
        </span>
      </S.Data>
      {tabId === 2 && (
        <React.Fragment>
          {userInfo.audit.obs && (
            <React.Fragment>
              <hr />
              <strong>Observação</strong>
              <span>{userInfo.audit.obs}</span>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </S.JustificationContainer>
  )
}
