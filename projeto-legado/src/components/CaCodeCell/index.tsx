import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

interface CaCodeCellProps {
  ca_code?: string | JSX.Element | null
  ca_code_expiration?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`

const CaCode = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`

const ExpirationText = styled.span<{ expired?: boolean }>`
  margin-top: 2px;
  font-size: 12px;
  color: ${({ expired }) => (expired ? '#E23851' : '#000000CC')};
  opacity: ${({ expired }) => (expired ? 1 : 0.5)};
`

const CaCodeCell: React.FC<CaCodeCellProps> = ({ ca_code, ca_code_expiration }) => {
  // Verifica se a data é válida e formata
  const date = ca_code_expiration && moment(ca_code_expiration).isValid()
    ? moment(ca_code_expiration)
    : null

  const isExpired = date ? date.isBefore(moment(), 'day') : false
  const formattedDate = date ? date.format('DD/MM/YYYY') : null

  return (
    <Wrapper>
      <CaCode>{ca_code || ''}</CaCode>
      {formattedDate && (
        <ExpirationText expired={isExpired}>
          Válido até: {formattedDate}
        </ExpirationText>
      )}
    </Wrapper>
  )
}

export default CaCodeCell
