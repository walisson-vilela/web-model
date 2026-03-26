import React from 'react'

import { FiFile } from 'react-icons/fi'

import * as S from './styles'

interface ItemProps {
  hasFile?: boolean
  status: 'Concluído' | 'Interrompido' | 'Removido'
}

export const Item = ({ hasFile = false, status }: ItemProps) => {
  return (
    <S.ListItem>
      <S.ItemInfo>
        <span>
          <strong>Ação:</strong> Inativação | <strong>Motivo:</strong> Atestado
          Médico | <strong>Origem:</strong> Cadastro
        </span>
        <span>
          <strong>Período:</strong> 21/09/2022 a 28/09/2022
        </span>
        <span>
          <strong>Responsável:</strong> Eudes Martins
        </span>
      </S.ItemInfo>
      <S.ItemFile>
        {hasFile && (
          <span>
            <FiFile size={16} /> Atestado_médico.pdf
          </span>
        )}
      </S.ItemFile>
      <S.ItemStatus status={status}>
        <span>
          Status do Evento: <p>{status}</p>
        </span>
        {status !== 'Concluído' && <span>Por Eudes Martins... | 11/05/22</span>}
      </S.ItemStatus>
    </S.ListItem>
  )
}
