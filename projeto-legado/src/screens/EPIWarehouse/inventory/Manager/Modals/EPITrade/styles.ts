import styled from 'styled-components';

export const TabsContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s4};
  flex: 1;
  padding-top: 10px;
`

export const TitleContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s4};
  margin-bottom: ${({ theme }) => theme.spacings.s4};

`

export const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 1;
  align-items: center;
  gap: 2rem;
  z-index: 9999
`;


export const LabelRow2 = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 1;
  align-items: center;
  gap: 2rem;
  z-index: 0
`;

