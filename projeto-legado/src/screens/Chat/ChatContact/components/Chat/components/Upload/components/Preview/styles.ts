import styled, { css } from 'styled-components'

interface ContainerProps {
  type: 'image' | any
}
export const Container = styled.div`
  width: 465px;
  height: 292px;
`

export const Icon = styled.div<ContainerProps>`
  width: 100%;
  height: 100%;
  ${(props) => {
    if (props.type !== 'image') {
      return css`
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      `
    }

    return css`
      border-radius: none;
      img {
        width: 100%;
        height: 100%;
      }
    `
  }}
`
