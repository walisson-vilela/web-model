import styled from 'styled-components'

export const Content = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5));
  opacity: 0;

  transition: opacity 0.5s ease-in-out;
`

export const Image = styled.div<{ $image?: string; $height?: string }>`
  background: ${({ theme }) => theme.getColor('lightestGrey', 20)}
    url(${({ $image: image }) => image || ''}) no-repeat scroll center;
  background-size: contain;
  position: relative;
  padding: ${({ theme }) => theme.spacings.s3};
  height: ${({ $height }) => $height || '100%'};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-radius: ${({ theme }) => theme.spacings.s1};
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :hover > div {
    opacity: 1;
  }
`
export const Subcontent = styled.div`
  p {
    ${({ theme }) => theme.useTypography('p', { fontWeight: 'bold' })}
    line-height: 17px;
    color: ${({ theme }) => theme.colors.grey};
    margin-bottom: 0;
  }

  p:first-child {
    margin-bottom: 1px;
  }
`
