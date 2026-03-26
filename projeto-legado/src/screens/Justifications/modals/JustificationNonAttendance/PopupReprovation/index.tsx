import React, { useContext } from 'react'

import { Button } from 'semantic-ui-react'

import { UserSideContext } from '../Modal/components/UserSide/context'
import { PopupReprovationProps } from '../interfaces'

import * as S from './styles'

const PopupReprovation = ({
  setOpenReprovationPopup,
}: PopupReprovationProps) => {
  const { payloadData, setPayloadData } = useContext(UserSideContext)

  return (
    <S.Container>
      <S.Content>
        <S.Header>
          <strong>Status: Reprovar</strong>
        </S.Header>
        <S.Content>
          <span>Observações</span>
          <textarea
            placeholder='Digite sua observação'
            value={payloadData.audit.obs}
            onChange={(e) => {
              setPayloadData((prev) => ({
                audit: { obs: e.target.value, status: prev.audit.status },
                file: prev.file,
                justify_type_id: prev.justify_type_id,
              }))
            }}
          ></textarea>
        </S.Content>
      </S.Content>
      <S.Footer>
        <Button
          content='Cancelar'
          className='tertiary'
          onClick={() => setOpenReprovationPopup(false)}
        />
        <Button
          primary
          content='Aplicar'
          onClick={() => {
            setPayloadData((prev) => ({
              audit: { obs: prev.audit.obs, status: 'Reprovado' },
              file: prev.file,
              justify_type_id: prev.justify_type_id,
            }))
            setOpenReprovationPopup(false)
          }}
        />
      </S.Footer>
    </S.Container>
  )
}

export default PopupReprovation
