import styled from 'styled-components'

export const TimeWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.s1};
  > label:is(:nth-child(2), :nth-child(3)) {
    width: 66px;
  }
`

export const CalendarWrapper = styled.div`
  padding: 0px !important;
  > div {
    gap: ${({ theme }) => theme.spacings.s1};
    padding: ${({ theme }) => theme.spacings.s1} !important;
    > div {
      padding: 0px !important;
    }
  }
`
