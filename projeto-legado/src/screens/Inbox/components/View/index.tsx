import React, { useCallback, useEffect, useState } from 'react'

import { MwButton, MwIcon, MwLoader, MwScrollContainer } from '@mw-kit/mw-ui'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast'
import { Popup } from 'semantic-ui-react'

import Modal, { ModalState } from '../../../../components/MwModal'
import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import useHomeContext from '../../../../standardized/pages/Home/context'
import { download } from '../../../../utils/DownloadFile'
import { TabComponent } from '../../types'

import { Views } from './components'
import { BodyInterface } from './interfaces'
import parser from './parser'
import {
  deleteMultiple,
  getMessage,
  toggleImportant,
  togglePaused,
} from './services'
import * as S from './styles'

const View: TabComponent = (props) => {
  const { id: viewID } = props

  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<BodyInterface>(null)
  const [modal, setModal] = useState<ModalState>(null)

  const { refreshUnreadMessages: reloadBarWidget } = useHomeContext()

  const loadData = useCallback(async () => {
    if (!viewID) return

    setLoading(true)

    try {
      const { data } = await getMessage(viewID)
      if (data) setData(parser(data))
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      props.changeTab('previous')
      return
    }

    reloadBarWidget()
    setLoading(false)
  }, [viewID])

  useEffect(() => {
    loadData()
  }, [loadData])

  const onToggleImportant = async (is_important: boolean, id: number) => {
    setLoading(true)

    try {
      const success = await toggleImportant(is_important, [id])

      if (success) {
        toast(<ToasterContent color='normal' />, SuccessStyle)
        loadData()
      }
    } catch (error) {
      toast(<ToasterContent color='error' />, ErrorStyle)
    } finally {
      setLoading(false)
    }
  }

  const deleteSelected = () => {
    setModal({
      title: 'Excluir Mensagem',
      content:
        'Você tem certeza que deseja excluir definitivamente esta mensagem?',
      actions: [
        {
          basic: true,
          className: 'tertiary',
          type: 'button',
          content: 'Cancelar',
          size: 'large',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          content: 'Excluir',
          size: 'large',
          color: 'red',
          onClick: async () => {
            setLoading(true)
            setModal(null)

            try {
              const success = await deleteMultiple([viewID])

              if (success) {
                props.changeTab({ tab: 'sent' })
                toast(<ToasterContent color='normal' />, SuccessStyle)
              }
            } catch (error) {
              toast(<ToasterContent color='error' />, ErrorStyle)
            } finally {
              setLoading(false)
            }
          },
          style: { marginRight: 0 },
        },
      ],
    })
  }

  const onChangePaused = () => {
    const id = data.id
    const value = !data.paused

    const onConfirm = async () => {
      setLoading(true)

      try {
        await togglePaused(value, [id])
        loadData()
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
        setLoading(false)
      }
    }

    value
      ? setModal({
          title: 'Notificação',
          content: (
            <React.Fragment>
              Você tem certeza que deseja pausar este post? Sua campanha será
              interrompida. <br />
              Mas, poderá retomá-la novamente.
            </React.Fragment>
          ),
          actions: [
            {
              secondary: true,
              content: 'Cancelar',
              onClick: () => setModal(null),
            },
            {
              primary: true,
              content: 'Pausar',
              onClick: () => {
                onConfirm()
                setModal(null)
              },
            },
          ],
        })
      : onConfirm()
  }

  return (
    <React.Fragment>
      <S.Container>
        {loading || !data ? (
          <MwLoader filled />
        ) : (
          <React.Fragment>
            <S.Title>
              <h2>
                <MwIcon
                  type='semantic'
                  icon='arrow left'
                  color='black'
                  onClick={() => {
                    props.changeTab('previous')
                  }}
                />
                Visualizar Mensagem
              </h2>

              <span>
                {moment(data.date).format('DD [de] MMM [de] YYYY hh:mm')} (
                {moment(data.date).fromNow()})
              </span>
            </S.Title>

            <MwScrollContainer>
              <S.Subject>
                <S.Important>
                  <input
                    type='checkbox'
                    checked={data.important}
                    onChange={(e) =>
                      onToggleImportant(e.target.checked, data.id)
                    }
                  />

                  <svg
                    viewBox='108.14 97.359 78.178 62.711'
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                  >
                    <path
                      d='M 111.557 99.231 L 163.474 99.381 L 183.856 126.677 L 164.872 158.101 L 111.124 157.859 L 130.015 128.865 L 111.557 99.231 Z'
                      transform='matrix(0.999987, -0.00503, 0.00503, 0.999987, -0.6449, 0.741182)'
                    />
                  </svg>
                </S.Important>

                <span>
                  {data.type}: {data.subject}
                </span>
              </S.Subject>

              {data.type !== 'Msg' && (
                <S.HighlightContainer paused={data.paused}>
                  Exposição {data.highlight_formatted}.
                </S.HighlightContainer>
              )}

              <S.Sender>
                <S.Avatar src={data.sender.avatar} />

                <span>{data.sender.name}</span>
              </S.Sender>

              <S.Recipients>
                <div>
                  <span>Para: </span>{' '}
                  {data.recipients.total > 2 ? (
                    <>
                      <span>
                        {data.recipients.main
                          .map((e) => e.name)
                          .slice(0, 2)
                          .join(', ')}
                        ,
                      </span>

                      <Popup
                        on='click'
                        trigger={
                          <div>
                            <span>
                              <b>mais {data.recipients.total - 2}</b>
                            </span>
                            <MwIcon
                              type='semantic'
                              icon='chevron down'
                              width={10}
                              height={5}
                            />
                          </div>
                        }
                        content={
                          <>
                            <S.PopupHeader>Destinatários</S.PopupHeader>
                            <S.PopupContent>
                              <S.PopupSubtitle>
                                Para ({data.recipients.main.length})
                              </S.PopupSubtitle>
                              {data.recipients.main.map((e, i) => (
                                <p key={e.id}>{e.name}</p>
                              ))}
                              <S.PopupSubtitle>
                                CC ({data.recipients.copy.length})
                              </S.PopupSubtitle>
                              {data.recipients.copy.map((e, i) => (
                                <p key={e.id}>{e.name}</p>
                              ))}
                            </S.PopupContent>
                          </>
                        }
                        position='bottom left'
                        wide
                      />
                    </>
                  ) : (
                    <span>{data.recipients.names.join(', ')}</span>
                  )}
                </div>

                {data.sender.is_logged_user && (
                  <Views recipients={data.recipients} />
                )}
              </S.Recipients>

              <S.BodyContainer>
                {data.type === 'Msg' ? (
                  <React.Fragment>
                    <S.Body dangerouslySetInnerHTML={{ __html: data.body }} />

                    {data.files.length > 0 && (
                      <S.FileContainer>
                        {data.files.map((file, index) => (
                          <S.File key={index}>
                            <span>{file.name}</span>

                            <MwIcon
                              type='semantic'
                              icon='download'
                              width='16px'
                              color='#3455AB'
                              onClick={() => download(file.url)}
                            />
                          </S.File>
                        ))}
                      </S.FileContainer>
                    )}
                  </React.Fragment>
                ) : (
                  data.posts.map((post, index) => (
                    <S.Post key={index}>
                      <img src={post.url} />

                      <div>
                        <p>
                          <b>{post.subject}</b>
                        </p>

                        <p>{post.note}</p>
                      </div>
                    </S.Post>
                  ))
                )}
              </S.BodyContainer>
            </MwScrollContainer>
          </React.Fragment>
        )}
      </S.Container>

      <S.Footer>
        {data &&
          data.type === 'Msg' &&
          data.sender &&
          !data.sender.is_logged_user && (
            <React.Fragment>
              <MwButton
                content='Responder'
                size='large'
                onClick={() => {
                  props.changeTab({ tab: 'reply', id: viewID })
                }}
              />

              <MwButton
                content='Responder Todos'
                size='large'
                onClick={() => {
                  props.changeTab({ tab: 'reply-all', id: viewID })
                }}
              />

              <MwButton
                content='Encaminhar'
                size='large'
                onClick={() => {
                  props.changeTab({ tab: 'forward', id: viewID })
                }}
              />
            </React.Fragment>
          )}

        {data &&
          data.type !== 'Msg' &&
          data.sender &&
          data.sender.is_logged_user && (
            <React.Fragment>
              <MwButton
                content={`${data.paused ? 'Continuar' : 'Pausar'} Post`}
                size='large'
                {...(!data.highlight_in_progress
                  ? {
                      disabled: true,
                    }
                  : {
                      onClick: onChangePaused,
                    })}
              />
            </React.Fragment>
          )}

        <MwButton
          content='Excluir'
          size='large'
          color='red'
          onClick={() => deleteSelected()}
        />
      </S.Footer>

      <Modal modal={modal} />
      <Toaster position='bottom-right' />
    </React.Fragment>
  )
}

export default View
