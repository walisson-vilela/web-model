import styled, { createGlobalStyle } from 'styled-components'

export const TooltipGlobalStyles = createGlobalStyle`
  .average-speed-tooltip.ui.popup {
    background: #192338 !important;
    color: #ffffff !important;
    border: 0 !important;
    box-shadow: none !important;
    padding: 0 !important;
    border-radius: 0 !important;
    overflow: visible !important;
  }

  .average-speed-tooltip.ui.popup:before {
    content: '' !important;
    width: 0 !important;
    height: 0 !important;
    background: transparent !important;
    box-shadow: none !important;
    transform: none !important;
    border-style: solid !important;
    border-width: 10px 0 10px 10px !important;
    border-color: transparent transparent transparent #192338 !important;
    top: 50% !important;
    right: -10px !important;
    left: auto !important;
    margin-top: -10px !important;
  }
`

export const HeaderTrigger = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const TooltipContainer = styled.div`
  width: 240px;
  overflow: hidden;
`

export const TooltipHeader = styled.div`
  padding: 12px 12px 0;
`

export const TooltipTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
`

export const TooltipMeta = styled.div`
  padding: 10px 12px 12px;
  font-size: 12px;
  line-height: 1.25;
  opacity: 0.95;
`

export const TooltipMetaValue = styled.div`
  font-size: 18px;
  font-weight: 700;
  margin-top: 2px;
`

export const ChartArea = styled.div`
  /* Degradê no fundo para escurecer o rodapé sem “apagar” a legenda */
  background: linear-gradient(
    to bottom,
    #192338 0%,
    #192338 55%,
    #0f172a 100%
  );
  overflow: hidden;
  padding: 0 0 10px 0;
`

export const ChartSvg = styled.svg`
  display: block;
  width: 100%;
  height: 85px;
`

export const ChartLegend = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 8px 12px 12px;
  font-size: 12px;
  opacity: 0.9;
`

export const LegendItem = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
`

export const LegendSwatch = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
`

// Curvas simplificadas (estáticas) para reproduzir visual do print.
// BaseY 70 é o rodapé do viewBox.
export const idealAreaPath =
  'M0 48 C 18 38, 36 58, 54 50 S 90 44, 108 50 S 144 70, 162 56 S 198 40, 220 48 L 220 70 L 0 70 Z'

export const realAreaPath =
  'M0 62 C 18 64, 36 50, 54 58 S 90 70, 108 60 S 144 44, 162 60 S 198 74, 220 64 L 220 70 L 0 70 Z'
