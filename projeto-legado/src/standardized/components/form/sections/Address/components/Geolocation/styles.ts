import styled, { css } from 'styled-components'

export const Map = styled.div`
  width: 100%;
  height: 300px;
`

export const FullMap = styled.div`
  width: 100%;
  height: 100%;
`

export const CenteredContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    margin: 0;
    font-size: 16px;
  }

  button {
    margin: 21px 0;
  }
`

export const ExpandMap = styled.span`
  cursor: pointer;
  opacity: 0.5;
  display: flex;
  align-items: center;
  gap: 7px;
`

export const ResentToAudit = styled.span`
  color: ${({ theme }) => theme.colors.warningRed};

  ${({ onClick }) =>
    onClick
      ? css`
          cursor: pointer;
        `
      : css`
          opacity: 0.5;
        `}
`
