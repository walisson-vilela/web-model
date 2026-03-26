import React, { useContext, useEffect, useState } from 'react'

import { Button, Checkbox, Dropdown } from 'semantic-ui-react'

import { useOnClickOutside } from '../../../../../utils/hooks'
import { UserSideContext } from '../Modal/components/UserSide/context'
import { FormProps } from '../Modal/components/UserSide/interface'
import { PopupJustificationProps } from '../interfaces'
import { GetJustifyTypes } from '../services'

import * as S from './styles'

interface JustifyProps {
  id: number
  name: string
  type: number
}

const PopupJustificationType = ({
  setOpenJustificationPopup,
}: PopupJustificationProps) => {
  const { payloadData, setPayloadData } = useContext(UserSideContext)
  const ref = useOnClickOutside(() => setOpenJustificationPopup(false))
  const [justifyTypes, setJustifyTypes] = useState<JustifyProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [itemForm, setItemForm] = useState<FormProps | null>(
    payloadData.justify_type_id,
  )

  const motivation = async () => {
    try {
      const data = await GetJustifyTypes()
      setJustifyTypes(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const options = [
    {
      id: 1,
      label: 'Antecipada',
    },
    {
      id: 2,
      label: 'Posterior',
    },
  ]

  const disabled =
    itemForm.type === -1 || itemForm === null || itemForm.type === undefined
  useEffect(() => {
    motivation()
  }, [])

  return (
    <S.Container ref={ref}>
      <S.Title>
        <strong>Tipo de Justificativa</strong>
      </S.Title>
      <S.Content>
        <S.Type>
          {options.map((item) => (
            <Checkbox
              className='checkTransferRadio'
              disabled
              radio
              key={item.id}
              label={item.label}
              checked={itemForm.type === item.id}
            />
          ))}
        </S.Type>
        <S.Motivation>
          <span>Defina o Motivo Justificado</span>
          <Dropdown
            text={itemForm ? itemForm.name : 'Selecione'}
            loading={loading}
          >
            <Dropdown.Menu>
              {justifyTypes.map(
                (justify) =>
                  justify.type === itemForm.type && (
                    <Dropdown.Item
                      key={justify.id}
                      text={justify.name}
                      onClick={() =>
                        setItemForm({
                          id: justify.id,
                          name: justify.name,
                          type: justify.type,
                        })
                      }
                      selected={itemForm && justify.id === itemForm.id}
                    />
                  ),
              )}
            </Dropdown.Menu>
          </Dropdown>
        </S.Motivation>
      </S.Content>
      <S.Footer>
        <Button
          content='Cancelar'
          className='tertiary'
          onClick={() => setOpenJustificationPopup(false)}
        />
        <Button
          primary
          content='Aplicar'
          disabled={disabled}
          onClick={() => {
            setPayloadData((prev) => ({
              audit: prev.audit,
              file: prev.file,
              justify_type_id: itemForm,
            }))
            setOpenJustificationPopup(false)
          }}
        />
      </S.Footer>
    </S.Container>
  )
}

export default PopupJustificationType
