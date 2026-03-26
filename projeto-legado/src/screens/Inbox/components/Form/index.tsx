import React, { useCallback, useEffect } from 'react'

import { MwButton, MwIcon, MwInput, MwLoader, Popup } from '@mw-kit/mw-ui'
import toast, { Toaster } from 'react-hot-toast'

import Modal from '../../../../components/MwModal'
import { ErrorStyle, ToasterContent } from '../../../../components/Toaster'
import { isOneOf } from '../../../../utils/Validators'
import { Tab, TabComponent } from '../../types'

import {
  BodyEditor,
  FileContainer,
  PostContainer,
  SelectRecipients,
} from './components'
import useContext, { Provider } from './context'
import { Post, PromiseReturn, Recipients } from './interfaces'
import { parseMessage, saveParser } from './parsers'
import { getMessage, save } from './services'
import * as S from './styles'

const today = new Date()
today.setHours(0, 0, 0, 0)

const labels: Partial<{
  [key in Tab]: string
}> = {
  reply: 'Responder',
  'reply-all': 'Responder',
  forward: 'Encaminhar',
}

const Form: TabComponent = Object.assign(
  (props: Parameters<TabComponent>[0]) => {
    const { tab, id: viewID, changeTab } = props

    const {
      values: {
        type,
        recipients,
        copyRecipients,
        subject,
        highlightDate,
        body,
        files,
        posts,
        modal,
        showCopy,
        recipientType,
        reply,
        loading,
        editorDisabled,
      },
      set,
      reset,
    } = useContext()

    const loadData = useCallback(async () => {
      if (!isOneOf(tab, ['reply', 'reply-all', 'forward'])) {
        set('loading', false)
        return
      }

      if (!viewID) {
        console.error('Missing message id')
        props.changeTab('previous')
        return
      }

      set('loading', true)

      try {
        const { data } = await getMessage(viewID)

        if (data.type === 'P')
          throw new Error('Posts can not be replied or forwarded')

        const parsed = parseMessage(data, tab)
        reset({ ...parsed })
      } catch (e) {
        console.error(e)
        props.changeTab('previous')
        return
      }

      set('loading', false)
    }, [viewID, tab])

    useEffect(() => {
      loadData()
    }, [loadData])

    const isInvalid =
      !recipients.length ||
      !subject ||
      (type === 'M' && !body) ||
      (type === 'P' && !posts.length) ||
      files.some((f) => !('id' in f)) ||
      posts.some((p) => !('id' in p.image))

    const isDirty =
      recipients.length > 0 ||
      subject.length > 0 ||
      body.length > 0 ||
      files.length > 0 ||
      posts.length > 0

    const onClickRecipient = (isCopy: boolean) => {
      set(
        'modal',
        <SelectRecipients
          setModal={(v) => set('modal', v)}
          recipientType={recipientType}
          getData={() => (isCopy ? copyRecipients : recipients)}
          save={(recipients: Recipients[]) => {
            isCopy
              ? set('copyRecipients', recipients)
              : set('recipients', recipients)
          }}
        />,
      )
    }

    const clearFileCache = (e: React.MouseEvent<HTMLInputElement>): void => {
      e.currentTarget.value = null
    }

    const onChangePost = async (
      e: React.ChangeEvent<HTMLInputElement>,
    ): Promise<any> => {
      let { files } = e.target
      if (files.length < 1) return

      const checkResolution = (file: File): Promise<PromiseReturn> => {
        return new Promise<PromiseReturn>((resolve) => {
          const fr = new FileReader()

          fr.onload = () => {
            const img = new Image()

            img.onload = () => {
              const { width: w, height: h } = img

              if (
                (w > h && w / h === 4 / 3 && w >= 640 && w <= 1920) ||
                (h > w && h / w === 4 / 3 && h >= 640 && h <= 1920)
              ) {
                resolve({
                  success: true,
                  data: {
                    file: file,
                    base64: fr.result as string,
                  },
                })
              } else {
                resolve({ success: false, data: null })
              }
            }

            img.src = fr.result as string
          }

          fr.readAsDataURL(file)
        })
      }

      let filteredFiles = await Promise.all(
        [...files].map(async (file) => {
          const { success, data } = await checkResolution(file)

          return success ? data : null
        }),
      )

      filteredFiles = filteredFiles.filter(Boolean)

      if (filteredFiles.length !== files.length) {
        set('modal', {
          title: 'Resolução incompatível',
          content:
            'Uma ou mais imagens selecionadas não tem tamanho compatível com o solicitado e serão ignoradas. Para mais informações, clique no informativo abaixo do botão "Incluir Imagens do Post".',
          actions: [
            {
              type: 'button',
              content: 'OK',
              color: 'blue',
              onClick: () => set('modal', null),
              style: { marginRight: 0 },
            },
          ],
        })
      }

      if (filteredFiles.length < 1) return

      const newReg: Post[] = filteredFiles.map((file) => ({
        preview: file.base64,
        image: { file: file.file },
        subject: '',
        note: '',
      }))

      set('posts', (prev) => [...prev, ...newReg])
    }

    const submit = async () => {
      set('loading', true)

      try {
        const payload = saveParser(
          {
            type,
            recipients,
            copyRecipients,
            subject,
            highlightDate,
            body,
            files,
            posts,
          },
          viewID,
        )

        await save(payload)

        set('modal', {
          title: 'Confirmação!',
          content:
            payload.type === 'M'
              ? 'Sua mensagem foi enviada com sucesso!'
              : 'Seu post foi enviado com sucesso!',
          actions: [
            {
              content: 'Ir para Caixa de Entrada',
              onClick: () => changeTab({ tab: '' }),
            },
            {
              primary: true,
              content: 'Nova mensagem',
              onClick: () => {
                reset()
                set('modal', null)
              },
            },
          ],
        })
      } catch (e) {
        console.error(e)
        toast(<ToasterContent color='error' />, ErrorStyle)
      }

      set('loading', false)
    }

    const onExit = () => {
      const onConfirm = () => {
        set('modal', null)
        changeTab('previous')
      }

      if (!isDirty) {
        onConfirm()
        return
      }

      set('modal', {
        title: 'Descartar',
        content: 'Ao confirmar, todos os dados preenchidos serão descartados.',
        buttonType: 'MwButton',
        actions: [
          {
            appearance: 'borderless',
            onClick: () => set('modal', null),
            content: 'Cancelar',
          },
          {
            appearance: 'solid',
            color: 'red',
            onClick: onConfirm,
            content: 'Descartar',
          },
        ],
      })
    }

    return (
      <React.Fragment>
        <S.Container>
          <S.Content>
            {loading && <MwLoader filled />}

            <S.Title>{labels[tab] || 'Nova'} Mensagem</S.Title>

            <S.ContentItem header>
              <span>Tipo de envio:</span>

              <MwInput
                type='radio'
                label='Mensagem'
                name='msg_type'
                checked={type === 'M'}
                onChange={() => set('type', 'M')}
              />

              <MwInput
                type='radio'
                label='Post'
                name='msg_type'
                checked={type === 'P'}
                onChange={() => set('type', 'P')}
              />
            </S.ContentItem>

            <S.ContentItem>
              <S.Cell style={{ borderRight: '1px solid #D3D3D3' }}>
                <label>Tipo de destinatário:</label>
              </S.Cell>

              <MwInput
                type='select'
                placeholder='Selecione'
                borderless
                value={recipientType}
                position='left bottom'
                loader={async () => {
                  return [
                    {
                      label: 'Usuário',
                      value: 'P',
                      data: {},
                    },
                    {
                      label: 'PDV',
                      value: 'S',
                      data: {},
                    },
                  ]
                }}
                setValue={(value) =>
                  value && set('recipientType', value as 'P' | 'S')
                }
              />

              <MwButton
                appearance='borderless'
                onClick={() => onClickRecipient(false)}
                style={{ borderLeft: '1px solid #D3D3D3', borderRadius: 0 }}
              >
                <S.ButtonContent>
                  Para
                  <MwIcon type='feather' icon='chevron_down' />:
                </S.ButtonContent>
              </MwButton>

              <S.RecipientNames>
                {recipients.map((e) => e.name).join(', ')}
              </S.RecipientNames>

              {!showCopy && (
                <MwButton
                  appearance='borderless'
                  content='Cc.'
                  onClick={() => set('showCopy', true)}
                />
              )}
            </S.ContentItem>

            {showCopy && (
              <S.ContentItem>
                <MwButton
                  style={{ marginLeft: 7 }}
                  appearance='borderless'
                  onClick={() => onClickRecipient(true)}
                >
                  <S.ButtonContent>
                    Cc.
                    <MwIcon type='feather' icon='chevron_down' />:
                  </S.ButtonContent>
                </MwButton>

                <S.RecipientNames>
                  {copyRecipients.map((e) => e.name).join(', ')}
                </S.RecipientNames>
              </S.ContentItem>
            )}

            <S.ContentItem>
              <S.Cell>
                <label htmlFor='subject'>Assunto:</label>
              </S.Cell>

              <div
                style={{
                  flex: 1,
                }}
              >
                <MwInput
                  id='subject'
                  borderless
                  value={subject}
                  setValue={(value) => set('subject', value)}
                  paddingless
                />
              </div>

              {type === 'P' && (
                <S.HighlightContainer>
                  <MwInput
                    type='date-interval-picker'
                    label='Período de destaque:'
                    value={highlightDate}
                    setValue={(v) => {
                      set('highlightDate', v)
                    }}
                    min={today}
                    only='custom'
                    paddingless
                    borderless
                  />

                  {highlightDate.some((str) => str.length > 0) && (
                    <MwIcon
                      type='feather'
                      icon='x'
                      onClick={() => set('highlightDate', ['', ''])}
                    />
                  )}
                </S.HighlightContainer>
              )}
            </S.ContentItem>

            {type === 'M' ? (
              <React.Fragment>
                <BodyEditor
                  {...{
                    body,
                    reply,
                    set,
                    clearFileCache,
                    disabled: loading || editorDisabled,
                  }}
                />

                {files.length > 0 && (
                  <S.FileContainer>
                    {files.map((file, index) => {
                      const onRemove = (id?: number) => {
                        set('files', (prev) => {
                          //@ts-ignore
                          return prev.filter((item) => item.id !== id)
                        })
                      }

                      return (
                        <FileContainer
                          key={index}
                          file={[
                            file,
                            (file) => {
                              set('files', (prev) => {
                                const newState = [...prev]
                                newState[index] =
                                  typeof file === 'function'
                                    ? file(newState[index])
                                    : file
                                return [...newState]
                              })
                            },
                          ]}
                          onError={(e) => {
                            console.log(e)
                          }}
                          onRemove={onRemove}
                        />
                      )
                    })}
                  </S.FileContainer>
                )}
              </React.Fragment>
            ) : (
              <S.PostContainer>
                <S.Posts>
                  {posts.map((post, index) => {
                    const onRemove = () =>
                      set('posts', (prev) => {
                        const newState = [...prev]
                        newState.splice(index)
                        return newState
                      })

                    return (
                      <PostContainer
                        key={index}
                        post={[
                          post,
                          (post) =>
                            set('posts', (prev) => {
                              const newState = [...prev]
                              newState[index] =
                                typeof post === 'function'
                                  ? post(newState[index])
                                  : post
                              return newState
                            }),
                        ]}
                        onRemove={onRemove}
                        onError={onRemove}
                      />
                    )
                  })}
                </S.Posts>

                <div>
                  <MwButton style={{ padding: 0, marginBottom: 7 }}>
                    <label style={{ padding: 21 }}>
                      <span>Incluir Imagens do Post</span>

                      <input
                        type='file'
                        multiple
                        accept='image/*'
                        onChange={onChangePost}
                        onClick={clearFileCache}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </MwButton>

                  <S.Description>
                    <span>Tamanho da Imagem</span>

                    <Popup
                      on='click'
                      trigger={<MwIcon type='feather' icon='info' />}
                      content={
                        <>
                          <p>
                            Para melhor resolução nos dispositivos mobile, as
                            imagens devem estar no formato 4:3.
                          </p>

                          <p>
                            O tamanho mínimo da imagem é de 640x480, e o limite
                            máximo é 1920x1440 na posição vertical.
                          </p>

                          <p>
                            Na horizontal, o mínimo é de 480x640 e o máximo de
                            1440x1920.
                          </p>
                        </>
                      }
                      position='left center'
                      className='popup-field'
                      inverted
                      wide
                    />
                  </S.Description>
                </div>
              </S.PostContainer>
            )}
          </S.Content>
        </S.Container>

        <S.Footer>
          <MwButton
            type='button'
            appearance='borderless'
            content='Descartar'
            size='large'
            onClick={onExit}
            disabled={loading}
          />

          <MwButton
            type='button'
            content={
              tab === 'reply' || tab === 'reply-all'
                ? 'Responder'
                : tab === 'forward'
                ? 'Encaminhar'
                : 'Enviar'
            }
            size='large'
            style={{ width: '130px' }}
            onClick={() => submit()}
            disabled={loading || isInvalid || editorDisabled}
            loading={loading}
          />
        </S.Footer>

        <Modal modal={modal} />

        <Toaster position='bottom-right' />
      </React.Fragment>
    )
  },
  { Provider },
)

export default Form
