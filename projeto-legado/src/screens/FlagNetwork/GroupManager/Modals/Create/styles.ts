import styled, { css } from 'styled-components'

export const Container = styled.div`
  height: 438px;
  display: flex;
  flex-direction: column;
`

export const Header = styled.header`
  padding: 21px;
  font-size: 18px;
  font-weight: bold;
  background-color: #3455ab;
  color: white;
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  padding: 21px;

  label {
    color: #192338 !important;
    font-size: 14px !important;
    font-weight: normal !important;
    margin-bottom: 7px !important;
  }

  small {
    display: block;
    margin-top: 7px;
    color: #c70101;
    font-weight: normal;
    font-size: 14px;
  }

  .field {
    margin-bottom: 35px !important;
  }

  .form-field {
    width: 294px !important;
  }

  div > .popup-field,
  div > .popup-field::before {
    background-color: #263046 !important;
  }
`

export const FormContent = styled.div`
  width: 430px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding-top: 12px;
`

export const Footer = styled.footer`
  border-top: 1px solid #e6e6e7;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 14px;
  background: #ffffff;

  .button {
    margin: 0px 14px 0px 0px !important;
  }

  .button:last-child {
    margin: 0px !important;
  }
`

interface ImageUploadProps {
  disabled?: boolean
  image?: string
}

export const ImageUploadContainer = styled.div<ImageUploadProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-left: 21px;

  > p {
    font-size: 14px;
    font-weight: normal;
    color: #192338;
    margin-bottom: 7px;
    opacity: ${(props: ImageUploadProps) => (props.disabled ? '50%' : '100%')};
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100px;
    width: 133px;
    border: 1px solid #bcbcbc;
    background: #e4e4e470 url(${(props: ImageUploadProps) => props.image || ''})
      no-repeat scroll center;
    background-size: cover;
    color: #192338;
    font-size: 13px;
    margin-bottom: 14px;

    > div {
      p {
        margin-bottom: 0;
        opacity: ${(props: ImageUploadProps) =>
          props.disabled ? '50%' : '100%'};
      }

      p:first-child {
        margin-bottom: 1px;
      }
    }
  }

  > label input {
    visibility: hidden;
    width: 0;
  }
`

export const ErrorMessage = styled.span`
  margin-top: 3.5px;
  color: ${({ theme }) => theme.colors.red};
  display: inline-block;

  ${({ children }) => {
    if (children) return
    return css`
      :after {
        content: ' ';
        white-space: pre;
      }
    `
  }}
`
