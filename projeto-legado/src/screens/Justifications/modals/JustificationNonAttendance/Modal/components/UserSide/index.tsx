import React, { useContext, useState } from 'react'

import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'
import { Popup } from 'semantic-ui-react'

import { useOnClickOutside } from '../../../../../../../utils/hooks'
import PopupReprovation from '../../../PopupReprovation'
import { JustificationNonAttendanceContext } from '../../../context'

import { JustificationContainer } from './components/JustificationContainet'
import { UserSideContext } from './context'
import * as S from './styles'

interface UserSideProps {
  tabId: number
}

export const UserSide = ({ tabId }: UserSideProps) => {
  const { payloadData, setPayloadData, disabledStatus } =
    useContext(UserSideContext)
  const { userInfo } = useContext(JustificationNonAttendanceContext)
  const [openJustificationPopup, setOpenJustificationPopup] =
    useState<boolean>(false)
  const openJustificationPopupRef = useOnClickOutside(() =>
    setOpenJustificationPopup(false),
  )
  const [openReprovationPopup, setOpenReprovationPopup] =
    useState<boolean>(false)
  const openReprovationPopupRef = useOnClickOutside(() =>
    setOpenReprovationPopup(false),
  )

  return (
    <S.User>
      <React.Fragment>
        <span>
          Usuário: {userInfo.people.name} | ID:{userInfo.people.id}
        </span>
        <S.JustificationData>
          <JustificationContainer
            props={{
              openJustificationPopup,
              openJustificationPopupRef,
              setOpenJustificationPopup,
              tabId,
            }}
          />

          {tabId !== 2 && (
            <S.Buttons>
              <S.Button
                isDisabled={true}
                onClick={() => {
                  setPayloadData((prev) => ({
                    audit: { obs: '', status: 'Aprovado' },
                    file: prev.file,
                    justify_type_id: prev.justify_type_id,
                  }))
                }}
              >
                <FiThumbsUp
                  size={18}
                  color={
                    payloadData.audit.status === 'Aprovado'
                      ? '#66BB6A'
                      : '#B2B2B2'
                  }
                />
                <strong>Aprovar</strong>
              </S.Button>
              <S.Button>
                <Popup
                  on='click'
                  disabled={false}
                  open={openReprovationPopup}
                  pinned
                  position='top left'
                  offset={[8, 0]}
                  content={
                    <div ref={openReprovationPopupRef}>
                      <PopupReprovation
                        setOpenReprovationPopup={setOpenReprovationPopup}
                      />
                    </div>
                  }
                  trigger={
                    <S.Button
                      isDisabled={!disabledStatus}
                      onClick={() => {
                        !disabledStatus && setOpenReprovationPopup(true)
                      }}
                    >
                      <FiThumbsDown
                        size={18}
                        color={
                          payloadData.audit.status === 'Reprovado'
                            ? '#EF5350'
                            : '#B2B2B2'
                        }
                      />
                      <strong>Reprovar</strong>
                    </S.Button>
                  }
                />
              </S.Button>
            </S.Buttons>
          )}
        </S.JustificationData>
      </React.Fragment>
    </S.User>
  )
}
