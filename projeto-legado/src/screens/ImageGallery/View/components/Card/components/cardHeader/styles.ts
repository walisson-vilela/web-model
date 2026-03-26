import styled from 'styled-components'

export const Container = styled.header`
  display: flex;
  flex-direction: column;
`

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  * img {
    height: 18px;
  }
`

export const Info = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Description = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  flex: 1;
  gap: 7px;

  & > label {
    margin: 0 !important;
  }
`

export const DescriptionText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export const Icon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const AddressContainer = styled.div`
  margin-left: 48px;
`
