import { useCallback, useEffect, useState } from 'react'

import { MwButton, MwInput, MwLoader, Popup } from '@mw-kit/mw-ui'
import 'react-quill/dist/quill.snow.css'

import MwModal, { ModalState } from '../../../../../../components/MwModal'
import { reloadUser } from '../../../../../../utils/Auth'
import { acceptTerms as aproveTerms, refuseTerms } from '../../services'

import { ComponentProps } from './interfaces'
import * as Styled from './styles'

const TradeResultPrivacyPolicy = ({
  close,
  term,
}: ComponentProps): JSX.Element => {
  const [checkedRef, setCheckedRef] = useState<HTMLDivElement | null>(null)
  const [loadedImgs, setLoadedImgs] = useState<HTMLImageElement[]>([])
  const [checkbox, setCheckbox] = useState<'disabled' | 'loading' | 'enabled'>(
    'loading',
  )
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(term.accepted)
  const [modal, setModal] = useState<ModalState | null>(null)

  // executes when the user iterates with scroll bar
  const handleOnScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (checkbox !== 'disabled') return
      const { scrollTop, scrollHeight, clientHeight } =
        e.target as HTMLDivElement
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        setCheckbox('enabled')
      }
    },
    [checkbox],
  )

  // executes when terms change or when all image loads
  const updateDisabled = useCallback(() => {
    if (!checkedRef) return
    const { scrollTop, scrollHeight, clientHeight } = checkedRef
    const checkbox =
      clientHeight !== scrollHeight &&
      scrollTop + clientHeight + 10 < scrollHeight
        ? 'disabled'
        : 'enabled'
    setCheckbox(checkbox)
  }, [open, term, checkedRef])

  useEffect(() => {
    setCheckbox('loading')
    if (!checkedRef) return

    const imgs = Array.from(checkedRef.getElementsByTagName('img'))
    if (imgs.some((a) => !loadedImgs.some((b) => a.isSameNode(b)))) return

    const id = setTimeout(updateDisabled, 500)
    return () => clearTimeout(id)
  }, [loadedImgs, updateDisabled])

  const handleCloseTerms = () => {
    close()
    setCheckbox('loading')
    setChecked((prev) => !prev)
  }

  const handleAcceptTerms = async () => {
    setLoading(true)
    try {
      await aproveTerms(term.id, term)
    } catch (error) {
      console.error(error)
    }
    handleCloseTerms()
  }

  const handleRefuseTerms = () => {
    setModal({
      title: 'Recusar Políticas e Termos',
      content:
        'Recusando as políticas e termos, o seu acesso será desconectado imediatamente. Deseja recusar?',
      buttonType: 'MwButton',
      actions: [
        {
          type: 'button',
          children: 'Cancelar',
          size: 'large',
          appearance: 'borderless',
          onClick: () => setModal(null),
        },
        {
          type: 'button',
          children: 'Recusar',
          size: 'large',
          color: 'warningRed',
          onClick: async () => {
            setModal(null)
            setLoading(true)
            try {
              await refuseTerms(term.id, term.system)
            } catch (error) {
              console.error(error)
            }

            term.required ? await reloadUser() : handleCloseTerms()
          },
        },
      ],
    })
  }

  const props = {
    dangerouslySetInnerHTML: { __html: term.content },
  }

  return (
    <Styled.Container open>
      <Styled.Header>{term.title}</Styled.Header>
      <Styled.Main>
        {loading && <MwLoader filled />}
        <div ref={setCheckedRef} onScroll={handleOnScroll}>
          <div
            className='ql-editor'
            style={{ padding: 0 }}
            {...props}
            onLoadCapture={(e) => {
              if ((e.target as HTMLElement).tagName !== 'IMG') return
              setLoadedImgs((prev) => [...prev, e.target as HTMLImageElement])
            }}
          ></div>
        </div>
      </Styled.Main>

      <Styled.Footer>
        {term.accepted ? (
          <div></div>
        ) : (
          (() => {
            const disabled = checkbox !== 'enabled' || term.accepted
            const trigger = (
              <MwInput
                type='checkbox'
                name='active'
                label='Li e concordo com as condições descritas no documento'
                onChange={(e) => setChecked(e.target.checked)}
                checked={checked}
                disabled={disabled}
              />
            )

            return disabled ? (
              <Popup
                content='Para selecionar o botão é necessário visualizar até o final todo o termo.'
                trigger={<div>{trigger}</div>}
                offset={[-10, 0]}
                inverted
              />
            ) : (
              trigger
            )
          })()
        )}

        <div>
          <MwButton
            type='button'
            size='large'
            onClick={handleCloseTerms}
            appearance='borderless'
          >
            Cancelar
          </MwButton>

          <MwButton
            type='button'
            size='large'
            {...(term.accepted
              ? {
                  children: 'Recusar',
                  color: 'warningRed',
                  ...(loading
                    ? {
                        disabled: true,
                      }
                    : {
                        onClick: handleRefuseTerms,
                      }),
                }
              : {
                  children: 'Aceitar',
                  ...(!checked || loading
                    ? {
                        disabled: true,
                      }
                    : {
                        onClick: handleAcceptTerms,
                      }),
                })}
          />
        </div>
      </Styled.Footer>

      {modal && <MwModal modal={modal} />}
    </Styled.Container>
  )
}

export default TradeResultPrivacyPolicy
