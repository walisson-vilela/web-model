import styled from 'styled-components'

export const Shell = styled.div`
  height: 100vh;
  background: #f9fafb;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
`

export const Frame = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 0.5px solid #e7e7e9;
  background: #fff;
  overflow: hidden;
`
