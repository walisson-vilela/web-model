import styled, { css } from 'styled-components'

export const SubSection = styled.div`
  padding: ${({ theme }) => `${theme.spacings.s4} ${theme.spacings.s3}`};
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacings.s3};
`

export const ImageContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
`

export const RoundedImage = styled.div<{
  $src?: string | null
  $width?: string
  $height?: string
}>`
  border-radius: 100%;
  width: ${({ $width: width }) => width || '60px'};
  height: ${({ $height: height }) => height || '60px'};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;

  ${({ $src: src }) => {
    if (!src) {
      return css`
        background-color: #f2f2f2;
        display: flex;
        align-items: center;
        justify-content: center;
      `
    }

    return css`
      background-image: url(${src});

      > * {
        display: none;
      }
    `
  }}
`

export const FileInput = styled.label`
  ${({ theme }) => theme.useTypography('p')}

  color: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
  padding: ${({ theme }) => `${theme.spacings.s1} ${theme.spacings.s4}`};
  cursor: pointer;
  margin-left: auto;

  input {
    display: none;
  }
`
