import React, { useContext, useEffect, useRef, useState } from 'react'

import toast from 'react-hot-toast'
import { Button, Loader, Modal, Popup } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../../components/Toaster'
import { ManagerProvider } from '../../../Manager/context'
import Notification from '../../Notification'
import { JustificationNonAttendanceContext } from '../context'
import { JustificationNonAttendanceProps } from '../interfaces'
import { ChangeToReview } from '../services'

import { ImpactSide } from './components/ImpactSide'
import { ImpactSideContextProvider } from './components/ImpactSide/context'
import { UserSide } from './components/UserSide'
import { UserSideContext } from './components/UserSide/context'
import * as S from './styles'

const ModalComponent = ({
  setOpenModal,
  tabId,
  registerId,
}: JustificationNonAttendanceProps) => {
  const { handleEditData, disabledStatus } = useContext(UserSideContext)
  const { userInfo } = useContext(JustificationNonAttendanceContext)
  const { disabled, loading } = useContext(JustificationNonAttendanceContext)
  const firstRender = useRef(true)
  const { handleLoadData } = useContext(ManagerProvider)
  const [loadingButton, setLoadingButton] = useState<boolean>(false)
  const [loadingButtonNotification, setLoadingButtonNotification] =
    useState<boolean>(false)
  const [openNotification, setOpenNotification] = useState<JSX.Element | null>(
    null,
  )

  const modal = (
    <Notification
      props={{
        title: 'Notificação',
        description:
          'Você está Reenviando a justificativa para análise. Ao fazer isto, ela voltará para o seu estado Original, removendo qualquer ação ou edição feita. Tem certeza que deseja continuar?',
        setOpenModalJSX: setOpenNotification,
        actions: [
          <Button
            key='confirm'
            primary
            disabled={loadingButtonNotification}
            loading={loadingButtonNotification}
            content='Sim'
            onClick={async () => {
              setLoadingButtonNotification(true)
              try {
                await ChangeToReview(userInfo.id, userInfo.audit.id)
                toast(<ToasterContent color='normal' />, SuccessStyle)
              } catch (error) {
                console.log(error)
                toast(<ToasterContent color='normal' />, ErrorStyle)
              } finally {
                setLoadingButtonNotification(false)
                setOpenNotification(<React.Fragment />)
                setOpenModal(<React.Fragment />)
                handleLoadData()
              }
            }}
          />,
        ],
      }}
    />
  )

  const handleChangeToReview = async () => {
    setOpenNotification(modal)
  }

  useEffect(() => {
    if (!firstRender.current) {
      setOpenNotification(modal)
    } else {
      firstRender.current = false
    }
  }, [loadingButtonNotification])

  return (
    <Modal open size='large'>
      <S.Header>
        <strong>Justificativa do não Atendimento</strong>
      </S.Header>
      <Modal.Content>
        {loading ? (
          <S.LoaderContainer>
            <Loader active />
          </S.LoaderContainer>
        ) : (
          <S.Content>
            <UserSide tabId={tabId} />

            <ImpactSideContextProvider>
              <ImpactSide />
            </ImpactSideContextProvider>
          </S.Content>
        )}
      </Modal.Content>
      <Modal.Actions>
        {tabId !== 2 ? (
          <React.Fragment>
            <Button
              basic
              className='tertiary'
              content='Cancelar'
              onClick={() => {
                if (disabledStatus) {
                  setOpenNotification(
                    <Notification
                      props={{
                        title: 'Notificação',
                        description:
                          'Existem dados que ainda não foram salvos, você deseja realmente sair da tela?',
                        actions: [
                          <Button
                            key='confirm'
                            primary
                            content='Confirmar'
                            onClick={() => {
                              setOpenModal(<React.Fragment />)
                            }}
                          />,
                        ],
                        setOpenModalJSX: setOpenNotification,
                      }}
                    />,
                  )
                } else {
                  setOpenModal(<React.Fragment />)
                }
              }}
            />
            <Button
              primary
              disabled={disabled || loadingButton}
              loading={loadingButton}
              content='Confirmar'
              onClick={async () => {
                setLoadingButton(true)
                handleEditData(registerId).then(() => {
                  setLoadingButton(false)
                  setOpenModal(<React.Fragment />)
                  handleLoadData()
                })
              }}
            />
          </React.Fragment>
        ) : (
          <S.ButtonsContainer>
            <Popup
              pinned
              on='click'
              inverted
              position='left center'
              className='popup-field'
              disabled={userInfo ? userInfo.audit.status !== 'Expirado' : true}
              content={
                <S.PopupContent>
                  Justificativas expiradas não podem ser Reenviadas para
                  análise.
                </S.PopupContent>
              }
              trigger={
                <div>
                  <Button
                    secondary
                    disabled={
                      userInfo ? userInfo.audit.status === 'Expirado' : true
                    }
                    content='Reenviar p/ Análise'
                    onClick={() => {
                      handleChangeToReview()
                    }}
                  />
                </div>
              }
            />
            <Button
              primary
              content='Ok'
              onClick={() => setOpenModal(<React.Fragment />)}
            />
          </S.ButtonsContainer>
        )}
      </Modal.Actions>
      {openNotification}
    </Modal>
  )
}

export default ModalComponent
