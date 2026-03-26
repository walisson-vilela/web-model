import styled, { css } from 'styled-components'

interface Common {
  $bgcolor?: string
  $color?: string
  $borderless?: boolean
  $textAlign?: 'center' | 'left' | 'right'
  $width?: number
}

const getFlex = (width?: number) => {
  const w = Math.max(1, Math.min(16, width || 1))
  return `${w} ${w} 0`
}

const getJustify = (align?: Common['$textAlign']) => {
  if (align === 'center') return 'center'
  if (align === 'right') return 'flex-end'
  return 'flex-start'
}

export const TableRow = styled.tr<Common>`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  background-color: ${({ $bgcolor: bgcolor }) =>
    bgcolor || '#f9fafb'} !important;
  border-bottom: 1px solid #e2e2e3;
  padding-right: 2px;

  @supports selector(::-webkit-scrollbar) {
    padding-right: 9px;
  }
`

export const TableHeaderCell = styled.th<Common>`
  overflow: hidden;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: ${({ $textAlign: textAlign }) => getJustify(textAlign)};
  background-color: ${({ $bgcolor: bgcolor }) =>
    bgcolor || '#f9fafb'} !important;
  color: ${({ $color: color }) => color || '#263046'} !important;
  min-height: 45px;
  font-size: 14px;
  line-height: 17px;
  padding: 0 12px;
  min-width: 0;

  flex: ${({ $width: width }) => getFlex(width)};

  ${({ $borderless: borderless }) => {
    if (!borderless) return

    return css`
      border-bottom: none;
    `
  }};
`

export const CheckHeaderCell = styled(TableHeaderCell)`
  flex: 0 0 42px;
  justify-content: center;
  padding: 0;
`

export const MenuHeaderCell = styled(TableHeaderCell)`
  flex: 0 0 42px;
  justify-content: center;
  padding: 0;
`
