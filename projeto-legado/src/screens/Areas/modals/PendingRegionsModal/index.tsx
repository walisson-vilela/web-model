import React, { useCallback, useState } from 'react'

import { MwButton, MwInput, MwLoader, MwScrollContainer } from '@mw-kit/mw-ui'
import toast from 'react-hot-toast'
import { Modal } from 'semantic-ui-react'

import {
  ErrorStyle,
  SuccessStyle,
  ToasterContent,
} from '../../../../components/Toaster'
import { Region } from '../../types'

import { save } from './services'
import * as Styles from './styles'

const PendingRegionsModal = (props: {
  regions: Region[]
  close: () => void
}) => {
  const { regions, close } = props

  const [checkeds, setCheckeds] = useState<number[]>(
    regions.map((region) => region.id),
  )
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = useCallback(async () => {
    setLoading(true)

    try {
      await save(checkeds)
      toast(<ToasterContent color='normal' />, SuccessStyle)
      close()
    } catch (e) {
      console.error(e)
      toast(<ToasterContent color='error' />, ErrorStyle)
      setLoading(false)
    }
  }, [checkeds])

  return (
    <Modal open>
      <Styles.ModalHeader color='blue' content='Notificação' />

      <Styles.Content>
        <Styles.Title children='Atualização: Áreas de Atuação Automática' />

        <p>
          As áreas selecionadas serão atualizadas automaticamente. A atualização
          poderá causar impacto nas divisões da área que consequentemente poderá
          gerar conflito no roteiro.
        </p>

        <p>
          Para manter suas áreas nos padrões atuais, desmarque-a para
          transforma-las em áreas personalizadas.
        </p>

        <b children='Áreas (Sistema)' />
      </Styles.Content>

      <Styles.ListContainer>
        {loading && <MwLoader filled zIndex={99} />}

        <MwScrollContainer>
          {regions.map((region, key) => {
            return (
              <Styles.ListItem key={key}>
                <MwInput
                  type='checkbox'
                  label={region.name}
                  checked={checkeds.includes(region.id)}
                  onChange={(e) => {
                    setCheckeds((prev) => {
                      const checkeds = prev.filter((id) => region.id !== id)
                      return [
                        ...checkeds,
                        ...(e.target.checked ? [region.id] : []),
                      ]
                    })
                  }}
                />
              </Styles.ListItem>
            )
          })}
        </MwScrollContainer>
      </Styles.ListContainer>

      <Styles.Footer>
        <MwButton
          type='button'
          content='Avisar mais tarde'
          size='large'
          appearance='borderless'
          onClick={close}
        />

        <MwButton
          type='button'
          content='Confirmar'
          size='large'
          {...(loading
            ? {
                disabled: true,
              }
            : {
                onClick: onSubmit,
              })}
        />
      </Styles.Footer>
    </Modal>
  )
}

export default PendingRegionsModal
