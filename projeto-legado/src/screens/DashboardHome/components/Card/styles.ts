import styled, { css } from 'styled-components'

export type CardStatus = 'green' | 'yellow' | 'red' | 'blue'

export const Card = styled.article`
  position: relative;
  background: #ffffff;
  border: 1px solid #d4d4d5bf;
  border-radius: 14px;
  padding: 21px;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
`

export const Title = styled.h3`
  margin: 0;
  font: normal normal 600 14px/18px 'Lato';
  color: #263046;
`

export const HeaderActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
`

export const DetailButton = styled.button`
  border: none;
  background: transparent;
  padding: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  color: #989898;

  &:hover {
    background: rgba(38, 48, 70, 0.08);
    color: #263046;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 14px;
  color: #4b5563;
  flex: 1;
  flex-grow: 1;
`

export const Footer = styled.div`
  margin-top: 7px;
  padding-top: 14px;
  border-top: 1px solid rgba(218, 218, 219, 0.75);
  font-size: 13px;
  color: #4b5563;
  min-height: 42px;
  display: flex;
  align-items: center;
  flex-shrink: 0;

  > * {
    width: 100%;
  }
`

const STATUS_COLORS: Record<CardStatus, string> = {
  green: '#66BB6A',
  yellow: '#FBCF30',
  red: '#E23851',
  blue: '#3B82F6',
}

export const StatusBorder = styled.div<{ $status: CardStatus }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 6px;
  border-radius: 14px 0 0 14px;
  ${(props) => css`
    background: ${STATUS_COLORS[props.$status]};
  `}
`

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  strong {
    display: block;
    color: #ffffff;
    font-size: 14px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 4px;

    li {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      color: #ffffff;

      span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      span[data-color='green'] {
        background: ${STATUS_COLORS.green};
      }

      span[data-color='yellow'] {
        background: ${STATUS_COLORS.yellow};
      }

      span[data-color='red'] {
        background: ${STATUS_COLORS.red};
      }

      span[data-color='blue'] {
        background: ${STATUS_COLORS.blue};
      }
    }
  }
`
