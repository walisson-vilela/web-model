import styled from 'styled-components'

export const GroupInfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-inline: 14px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
`

export const GroupInfoImage = styled.label`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  background: #2630461a 0% 0% no-repeat padding-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;

  cursor: pointer;

  & > span {
    font: normal normal normal 13px/16px Lato;
    color: #9297a2;
  }

  & > input[type='file'] {
    display: none;
  }

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const Form = styled.form`
  margin-top: 22px;
  width: 100%;

  input {
    width: 100%;
    height: 35px;
    border: 1px solid #c8c8c8;
    border-radius: 4px;
    padding: 9px 14px;

    &[type='text'] {
      font-size: 14px;
      color: #192338;
    }
  }
`

export const GroupInformation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  gap: 4px;

  & > span {
    font: normal normal normal 14px/17px Lato;
    color: #26304680;
  }
`
