import styled, { css } from 'styled-components'

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
`

export const Title = styled.div`
  ${({ theme }) => theme.useTypography('h1')}
  font-weight: bold;
  color: #192338;
  line-height: 22px;
`

export const Subtitle = styled.div`
  ${({ theme }) => theme.useTypography('h3')}
  color: #263046b3;
  line-height: 22px;
`

export const FileInput = styled.label<{ disabled: boolean }>`
  ${({ theme }) => theme.useTypography('p')}
  line-height: 17px;
  font-weight: bold;
  border-radius: 4px;
  width: 309px;

  display: flex;
  justify-content: center;
  align-items: 'center';

  ${({ disabled }) =>
    disabled
      ? css`
          background-color: #e0e1e2;
          border: 1px solid #e0e1e2;
          color: #b0b0b0;
          cursor: default;
          pointer-events: none;
        `
      : css`
          background-color: #3455ab;
          border: 1px solid #3455ab;
          color: white;
          cursor: pointer;
        `}

  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    display: none;
  }
`

export const FileLimits = styled.div`
  margin-left: ${({ theme }) => theme.spacings.s3};
  gap: ${({ theme }) => theme.spacings.s1};

  p {
    font-size: 14px;
    font-weight: 400;
    color: #b0b0b0;
    margin-bottom: 0;
  }
`

export const ImageContainer = styled.div<{ src: string }>`
  width: 309px;
  height: 100%;
  border: 1px solid #e2e2e3;
  border-radius: 5px;
  background: white url(${({ src }) => src}) no-repeat center;
  background-size: contain;
`

export const Divider = styled.hr`
  background-color: #c8c8c8;
  margin: 35px 0;
  height: 1px;
  border: none;
`

export const InputsContainer = styled.div`
  width: 465px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};

  > :nth-child(2) > label > div {
    margin-bottom: ${({ theme }) => theme.spacings.s1};

    ${({ theme }) => theme.useTypography('p')}
    line-height: 17px;
    color: ${({ theme }) => theme.colors.greyishBlue};
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: ${({ theme }) => theme.spacings.s3};
`
