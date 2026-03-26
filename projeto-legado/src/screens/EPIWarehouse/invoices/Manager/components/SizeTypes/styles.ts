import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  color: #333;
`

export const Th = styled.th<{ alignCenter?: boolean }>`
  width: 50%;
  padding: 16px 16px;
  border-bottom: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  background-color: #fafafa;
  font-weight: 600;
  text-align: ${({ alignCenter }) => (alignCenter ? 'center' : 'left')};

  &:last-child {
    border-right: none;
  }
`

export const Td = styled.td<{ isCalendar?: boolean; alignCenter?: boolean }>`
  width: 50%;
  padding: 16px 16px;
  border-top: 1px solid #d9d9d9;
  border-right: 1px solid #d9d9d9;
  background-color: #fff;
  text-align: ${({ alignCenter }) => (alignCenter ? 'center' : 'left')};

  ${({ isCalendar }) =>
    isCalendar &&
    `
      color: #0052cc;
      font-weight: 600;
    `}

  &:last-child {
    border-right: none;
  }
`

export const Row = styled.tr``
