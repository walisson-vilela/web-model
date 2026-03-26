import styled, { css } from 'styled-components'

export const HeaderContainer = styled.div`
  width: 100% !important;
  padding: 14px 19px !important;
`

export const HeaderContent = styled.div`
  display: flex !important;
  flex-direction: column !important;
  margin: 0;
  padding: 0;
  div {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;

    strong {
      font-size: 17px;
      color: #000;
    }

    img {
      width: 25px;
      height: 25px;
      cursor: pointer;
    }
  }

  strong {
    color: #505d6f;
    font-size: 12px;
    margin: 0;
  }
`

interface LabelTypeProps {
  type: 'Iniciada' | 'Não Iniciada' | 'Encerrada' | string
}

export const Label = styled.strong<LabelTypeProps>`
  ${(props) =>
    props.type === 'Iniciada' &&
    css`
      color: #505d6f;
    `}

  ${(props) =>
    props.type === 'Não Iniciada' &&
    css`
      color: #08236e;
    `}

  ${(props) =>
    props.type === 'Encerrada' &&
    css`
      color: #f2245c;
    `}
`
