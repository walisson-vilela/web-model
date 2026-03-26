import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 13px;
`
export const Select = styled.div`
  width: 100%;
  gap: 9px;
  display: flex;
  flex-direction: column;
`
export const ButtonS = styled.div`
  width: 35px;
  height: 35px;
  margin-top: 27px;
`
export const Icon = styled.div`
  margin-top: 30px;
`
export const ContainerPopup = styled.div`
  width: 318px;
`
export const Title = styled.div`
  & > span {
    text-align: left;
    font: normal normal bold 18px/20px Lato;
    letter-spacing: 0px;
    color: #263046;
    opacity: 1;
  }

  background: #ffffff 0% 0% no-repeat padding-box;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
  height: 48px;
  display: flex;
  align-items: center;
`
export const ContainerCheckbox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-block: 14px;
`
export const AlldaysCheckbox = styled.div`
  display: flex;
`
export const DaysCheckbox = styled.div`
  display: flex;
  justify-content: space-between;
`
export const RowLabel = styled.label`
  &:after,
  &:before {
    top: calc(50% - 7px) !important;
  }
  & > span {
    font: normal normal normal 14px/17px Lato;
    color: #192338;
  }
`
export const Button = styled.div`
  border-top: 1px solid #e5e5e5;
  padding: 14px;
  display: flex;
  justify-content: center;
`
export const ButtonSize = styled.div`
  width: 150px;
  height: 35px;
`
export const FortnightCheckbox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`
export const Repeat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  & > span {
    font: normal normal normal 14px/17px Lato;
    color: #192338;
  }
`
export const RepeatInput = styled.div`
  display: flex;
  gap: 9px;
`
