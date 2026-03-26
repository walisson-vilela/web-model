import styled from 'styled-components'

export const Container = styled.div<{ $withStatus: boolean }>`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid #d4d4d5;
  min-height: 160px;
  transition: box-shadow 0.2s ease;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: ${({ theme }) => theme.spacings.s2};
  padding: 14px 14px 0px 21px;
`

export const DetailButton = styled.button`
  border: none;
  background: transparent;
  display: inline-flex;
  cursor: pointer;
  padding: 0px;
  &:focus {
    outline: none;
  }
`

export const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  font-size: 14px;
  color: #4b5563;
  text-align: left;
  width: 100%;
  padding: 14px 14px 14px 21px;
`

export const Footer = styled.div`
  border-top: 1px solid #d4d4d5;
  padding-top: ${({ theme }) => theme.spacings.s2};
  margin-top: ${({ theme }) => theme.spacings.s2};
  font-size: 13px;
  color: #4b5563;
  padding: 14px 14px 14px 21px;
`

export const StatusWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 2;
`

export const StatusButton = styled.button<{ $color: string }>`
  width: 6px;
  height: 100%;
  border-radius: 4px 0px 0px 4px;
  background: ${({ $color }) => $color};
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`

export const StatusTooltip = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: #1f2637;
  color: #fff;
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacings.s2};
  min-width: 220px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.25);
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    left: -8px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 8px solid #1f2637;
  }

  strong {
    font-size: 14px;
    font-weight: 600;
    display: block;
    margin-bottom: ${({ theme }) => theme.spacings.s1};
  }
`

export const StatusTooltipColumns = styled.div<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ $columns }) => Math.max($columns, 1)},
    minmax(0, 1fr)
  );
  gap: ${({ theme }) => theme.spacings.s2};
`

export const StatusTooltipColumn = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s1};

  li {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacings.s1};
    font-size: 13px;
  }

  li span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
  }
`
