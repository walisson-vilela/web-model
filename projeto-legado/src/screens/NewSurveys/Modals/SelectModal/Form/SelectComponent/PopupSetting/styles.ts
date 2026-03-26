import styled from 'styled-components'

export const PopupContaier = styled.div`
  width: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const PopupHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  padding: 14px 21px;

  & > span {
    text-align: left;
    font: normal normal bold 18px/20px Lato;
    letter-spacing: 0px;
    color: #263046;
  }
`
export const PopupContent = styled.div`
  padding: 14px 21px;
  width: 100%;
  height: 413px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: flex-start;
`

export const InputsContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;

  & > div {
    display: flex;
    align-items: center;
    gap: 14px;
  }
`

export const Footer = styled.div`
  width: 100%;
  border-top: 1px solid #e6e6e6;
  padding: 14px 21px;

  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 7px;
  }
`

export const info = styled.div`
  width: 420px;

  & > h1 {
    text-align: left;
    font: normal normal normal 16px Lato;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    margin: 14px 0 7px 0;
  }

  & > span {
    text-align: left;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
`

export const WarningContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s3};
  padding: ${({ theme }) => theme.spacings.s3};
  margin-top: auto;

  border: 1px solid ${({ theme }) => theme.colors.vanilla};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.floralWhite};
  color: ${({ theme }) => theme.colors.bronze};

  & > strong {
    font: normal normal bold 18px/23px Lato;
  }
`

export const WarningText = styled.div`
  display: flex;
  gap: calc(${({ theme }) => theme.spacings.s1} / 2);
  align-items: center;
`

export const WarningInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacings.s1};
`
