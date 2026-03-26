import styled from 'styled-components'

export const AccordionTitleContainer = styled.div`
  background-color: #f5f5f5;
  padding: 14px;

  > .title {
    font-weight: bolder;
    font-size: 16px !important;
    cursor: pointer;
  }

  > p {
    padding-left: 21px;
    cursor: pointer;
  }

  & + div {
    margin-top: 14px !important;
  }
`

export const Container = styled.div`
  width: 100%;
  height: 273px;
  overflow-y: auto;
`

export const EmptyMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    color: #c8c8c8;
  }
`
