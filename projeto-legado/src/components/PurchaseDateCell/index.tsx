import moment from 'moment'
import React from 'react'
import styled from 'styled-components'

interface PurchaseDateCellProps {
  date_formatted?: string | JSX.Element | null
  supplier?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`

const PurchaseDate = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.black};
`

const PurchaseDateCell: React.FC<PurchaseDateCellProps> = ({ date_formatted, supplier }) => {
  // Formatar a data, se for válida
  const formattedDate = typeof date_formatted === 'string' && moment(date_formatted).isValid()
    ? moment(date_formatted).format('DD/MM/YYYY')
    : null

  return (
    <Wrapper>
      <PurchaseDate>
         {formattedDate}
      </PurchaseDate>
      <span style={{ marginTop: '2px', color: '#000000CC', opacity: 0.5, fontSize: '12px' }}>
      Fornecedor: {supplier || ''}
      </span>
    </Wrapper>
  )
}

export default PurchaseDateCell
