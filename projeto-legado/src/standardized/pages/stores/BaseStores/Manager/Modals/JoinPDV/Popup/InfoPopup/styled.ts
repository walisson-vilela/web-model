import styled from 'styled-components'

export const Container = styled.div`
  width: 462px;
  height: 334px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
`
export const ContentVertical = styled.div`
  writing-mode: vertical-rl;
  transform: rotate(180deg);

  text-align: center;
  line-height: 35px;
  font-weight: bold;
  width: 35px;
  background: #3a4457 0% 0% no-repeat padding-box;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const ContentHorizontal = styled.div`
  box-sizing: border-box;
  padding: 10px;
  height: 35px;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  background: #3a4457 0% 0% no-repeat padding-box;
  font-weight: bold;
`
