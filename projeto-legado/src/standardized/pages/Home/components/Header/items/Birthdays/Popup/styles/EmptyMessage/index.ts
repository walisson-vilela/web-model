import styled from 'styled-components'

const EmptyMessage = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.useTypography('h4')}
  line-height: 17px;
  /** TODO: use theme color */
  color: #a6acb1cc;
`

export default EmptyMessage
