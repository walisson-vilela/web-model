import styled, { css } from 'styled-components'

interface CardProps {
  type?: number
  flip: boolean
  flex?: 'row' | 'column'
}

interface DividerProps {
  flex: 'row' | 'column'
}

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

export const Divider = styled.div<DividerProps>`
  display: flex;
  width: 100%;
  flex-direction: ${(props) => props.flex};
  justify-content: space-between;
`

export const CardContainer = styled.div<CardProps>`
  flex: 1 !important;
  height: ${(props) => (props.flex === 'row' ? '460px' : '400px')} !important;
  width: 100% !important;
  position: relative;

  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    overflow: hidden;
    border-radius: 0.28571429rem;
    box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
    padding: 14px !important;
    background-color: rgba(255, 255, 255, 1);

    ${(props) => {
      if (props.flip) {
        if (props.type === 2) {
          return css`
            border-right: 6px solid #e23851 !important;
            border-left: 0px solid #e23851 !important;
            padding-left: 18px !important;
          `
        } else if (props.type === 1) {
          return css`
            border-right: 6px solid #66bb6a !important;
            border-left: 0px solid #66bb6a !important;
            padding-left: 18px !important;
          `
        } else if (props.type === 0) {
          return css`
            border-right: 6px solid #c8c8c8 !important;
            border-left: 0px solid #c8c8c8 !important;
            padding-left: 18px !important;
          `
        } else {
          return css`
            border-right: 6px solid #c8c8c8 !important;
            border-left: 0px solid #c8c8c8 !important;
            padding-left: 18px !important;
          `
        }
      } else {
        if (props.type === 2) {
          return css`
            border-left: 6px solid #e23851 !important;
            border-right: 0px solid #e23851 !important;
            padding-right: 18px !important;
          `
        } else if (props.type === 1) {
          return css`
            border-left: 6px solid #66bb6a !important;
            border-right: 0px solid #66bb6a !important;
            padding-right: 18px !important;
          `
        } else if (props.type === 0) {
          return css`
            border-left: 6px solid #c8c8c8 !important;
            border-right: 0px solid #c8c8c8 !important;
            padding-right: 18px !important;
          `
        } else {
          return css`
            border-left: 6px solid #c8c8c8 !important;
            border-right: 0px solid #c8c8c8 !important;
            padding-right: 18px !important;
          `
        }
      }
    }}

    transition: 0.5s,0.5s,1s;
    transition-property: border-right, border-left, transform;
  }
  .front {
    transform: perspective(5000px)
      rotateY(${(props) => (props.flip ? '180' : '0')}deg);
  }
  .back {
    transform: perspective(5000px)
      rotateY(${(props) => (props.flip ? '360' : '180')}deg);
  }
`
