import styled from 'styled-components'

const EmptyMessage = styled.div`
  color: #a6acb1cc;
  ${({ theme }) => theme.useTypography('h4')};
  font-weight: normal;
  line-height: 17px;

  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default EmptyMessage
