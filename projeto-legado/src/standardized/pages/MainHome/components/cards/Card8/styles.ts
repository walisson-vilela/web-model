import styled from 'styled-components'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s2};
  width: 100%;
`

export const Description = styled.span`
  font-size: 14px;
  color: #6b7280;
`

export const GaugeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`

export const GaugeContainer = styled.div`
  width: clamp(180px, 40vw, 220px);
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .highcharts-container {
    width: 100% !important;
    height: 100% !important;
  }
`
