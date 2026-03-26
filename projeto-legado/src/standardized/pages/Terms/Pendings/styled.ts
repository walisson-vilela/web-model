import {
  GridProps,
  Button as SemanticButton,
  Grid as SemanticGrid,
} from 'semantic-ui-react'
import styled from 'styled-components'

export { Footer } from '../../../components/form/components'

export const Container = styled.div`
  display: flex !important;
  flex-direction: column;
  overflow-y: auto;
  position: relative;
  flex: 1;
`

type TableComponent = React.FunctionComponent<GridProps>
export const Grid = styled(SemanticGrid as never as TableComponent)`
  width: 100% !important;

  span {
    color: #000000cc;
    font-size: 14px;
    opacity: 0.5;
  }
`

export const Row = styled(SemanticGrid.Row)`
  display: flex;
  align-items: center;
  width: 100% !important;
  padding-bottom: 14px;
  & + div {
    border-bottom: 1px solid #e2e2e3;
  }
`

export const Column = styled(SemanticGrid.Column)`
  width: 100% !important;
  display: flex;
  flex-direction: row;
  align-items: center;

  img {
    margin-left: 10px;
  }
`

interface WrapperProps {
  direction: 'row' | 'column'
  alignItems: 'center' | 'flex-end' | 'flex-start'
  justifycontent?:
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'flex-end'
    | 'flex-start'
}

export const Wrapper = styled.div<WrapperProps>`
  flex: 1;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifycontent};

  p {
    margin: 0;
    padding: 0;
    color: #000000cc;
    font-size: 15px;
    & + p {
      margin-top: 6px;
      color: #000000cc;
      opacity: 0.5;
    }
  }

  button {
    width: 100px;
    height: 31px;
    border-radius: 4px;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #3455ab;
    border: 0;
    text-align: center;
    font: normal normal bold 12px/15px Lato;
    cursor: pointer;
  }
`

export const Button = styled(SemanticButton)`
  width: 130px;
  height: 41px;
  background: #3455ab !important;
  color: #fff !important;
  & + .ui.button {
    margin-left: 35px;
  }
`
