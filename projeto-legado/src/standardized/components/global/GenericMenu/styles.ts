import styled from 'styled-components'

const icon = { width: 24, height: 16 }

export const Container = styled.div`
  position: relative;

  > div:nth-child(1) {
    width: ${({ theme }) => theme.spacings.s3};
    height: ${({ theme }) => theme.spacings.s3};
    overflow: hidden;
    > svg {
      width: ${icon.width}px;
      min-width: ${icon.width}px;
      height: ${icon.height}px;
      min-height: ${icon.height}px;
      margin: calc(50% - ${icon.height / 2}px) calc(50% - ${icon.width / 2}px);
    }
  }
`
