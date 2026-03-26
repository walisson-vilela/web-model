import styled from 'styled-components'

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    padding: 0 14px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 36px;
    }

    p {
      margin: 0;
      padding: 0;
      font-size: 13px;
    }
  }
`
