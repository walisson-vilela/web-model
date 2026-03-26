import styled from 'styled-components';


export const TitleContainer = styled.div`
  padding: 0 ${({ theme }) => theme.spacings.s4};
  margin-bottom: ${({ theme }) => theme.spacings.s2};
`
export const ErrorBox = styled.div`
  background: #FEF5F5 0% 0% no-repeat padding-box;
  border: 1px solid #973937;
  color: #973937;
  font-size: 14px;
  padding: 1rem 2.8rem;
  border-radius: 4px;
  margin-top: 0.5rem;
  width: 100%;
`
export const TabsContainer = styled.div`
  padding: 0;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
`

export const GridContainer = styled.div`
  padding: 0;
  justify-content: flex-start;
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 1.2rem;
  border-bottom: 1px solid #dadadb;
`;

export const RowContainer = styled.div`
  justify-content: space-between;
  gap: 0.6em;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.6rem;
`;

export const ColumnContainer = styled.div`
  width: 100%;
  gap: 0.6em;
  display: flex;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  width: 100%;
  gap: 0.6em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LabelRow = styled.div`
  display: flex;
  flex-direction: row;
  opacity: 0.8;
  align-items: center;
`;

export const Label = styled.span`
  font-weight: 900;
  padding-left: 0.2rem;
  color: #263046;
`;

export const InfoRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const InfoLabel = styled.span`
  font-weight: 900;
  padding-left: 0.2rem;
  color: #192338;
`;

export const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.6rem;
`;

export const SectionTitle = styled.span`
  font-weight: 900;
  margin-bottom: 0.6rem;
  color: #192338;
`;

export const CenteredColumn = styled.div`
  justify-content: center;
  width: 92px;
  gap: 0.8em;
  display: flex;
  flex-direction: column;
`;

export const CenteredText = styled.span`
  display: flex;
  text-align: center;
`;

export const BoldCenteredText = styled.span`
  font-weight: 900;
  width: 92px;
  justify-content: center;
  text-align: center;
  color: #192338;
`;
