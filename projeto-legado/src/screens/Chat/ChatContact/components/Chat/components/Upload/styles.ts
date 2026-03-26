import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`

export const UploadBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  strong {
    margin-top: 8px;
  }
`

export const UploadFooter = styled.footer`
  width: 100%;
  padding: 23px 40px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eaeaea;
  padding: 14px 21px;
`

export const Upload = styled.div`
  width: inherit;
  max-width: 100%;
  min-width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`

export const Carrosel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 14px;
  overflow-y: hidden;
  overflow-x: auto;
`

export const IconFile = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
`

export const ImageIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`

export const Button = styled.button``

export const Label = styled.label`
  border: 2px solid #c8c8c8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;

  cursor: pointer;

  input {
    display: none;
  }
`

export const WarningMessage = styled.div`
  width: 244px;
  padding: 7px;

  p {
    font: normal normal normal 14px/17px Lato;
    color: #ffffff;
  }
`

export const Send = styled.div`
  width: 21px;
  height: 21px;
  margin-left: 14px;

  cursor: pointer;
`
