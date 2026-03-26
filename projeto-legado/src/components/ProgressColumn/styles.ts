import styled, { css, keyframes } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: start;
  line-height: 1em;

  > span {
    width: 40px;
    text-align: center;
  }
`

const Animation = keyframes`
  000.00% { background-image: linear-gradient(90deg, transparent 000%, rgba(255, 255, 255, .25) 005%, transparent 100%); }
  005.00% { background-image: linear-gradient(90deg, transparent 000%, rgba(255, 255, 255, .25) 010%, transparent 100%); }
  010.00% { background-image: linear-gradient(90deg, transparent 005%, rgba(255, 255, 255, .25) 015%, transparent 100%); }
  015.00% { background-image: linear-gradient(90deg, transparent 010%, rgba(255, 255, 255, .25) 020%, transparent 100%); }
  020.00% { background-image: linear-gradient(90deg, transparent 015%, rgba(255, 255, 255, .25) 025%, transparent 100%); }
  025.00% { background-image: linear-gradient(90deg, transparent 020%, rgba(255, 255, 255, .25) 030%, transparent 100%); }
  030.00% { background-image: linear-gradient(90deg, transparent 025%, rgba(255, 255, 255, .25) 035%, transparent 100%); }
  035.00% { background-image: linear-gradient(90deg, transparent 030%, rgba(255, 255, 255, .25) 040%, transparent 100%); }
  040.00% { background-image: linear-gradient(90deg, transparent 035%, rgba(255, 255, 255, .25) 045%, transparent 100%); }
  045.00% { background-image: linear-gradient(90deg, transparent 040%, rgba(255, 255, 255, .25) 050%, transparent 100%); }
  050.00% { background-image: linear-gradient(90deg, transparent 045%, rgba(255, 255, 255, .25) 055%, transparent 100%); }
  055.00% { background-image: linear-gradient(90deg, transparent 050%, rgba(255, 255, 255, .25) 060%, transparent 100%); }
  060.00% { background-image: linear-gradient(90deg, transparent 055%, rgba(255, 255, 255, .25) 065%, transparent 100%); }
  065.00% { background-image: linear-gradient(90deg, transparent 060%, rgba(255, 255, 255, .25) 070%, transparent 100%); }
  070.00% { background-image: linear-gradient(90deg, transparent 065%, rgba(255, 255, 255, .25) 075%, transparent 100%); }
  075.00% { background-image: linear-gradient(90deg, transparent 070%, rgba(255, 255, 255, .25) 080%, transparent 100%); }
  080.00% { background-image: linear-gradient(90deg, transparent 075%, rgba(255, 255, 255, .25) 085%, transparent 100%); }
  085.00% { background-image: linear-gradient(90deg, transparent 080%, rgba(255, 255, 255, .25) 090%, transparent 100%); }
  090.00% { background-image: linear-gradient(90deg, transparent 085%, rgba(255, 255, 255, .25) 095%, transparent 100%); }
  095.00% { background-image: linear-gradient(90deg, transparent 090%, rgba(255, 255, 255, .25) 100%, transparent 100%); }
  100.00% { background-image: linear-gradient(90deg, transparent 095%, rgba(255, 255, 255, .25) 100%, transparent 100%); }
`

interface ProgressProps {
  percent: string | number
  color: string
  animated?: boolean
}

export const Progress = styled.div<ProgressProps>`
  flex: 1;
  background-color: transparent;
  border: 1px solid #e4e4e4;
  height: 17px;
  margin-right: 10px;

  > div {
    height: 100%;
    width: ${({ percent }) => percent}%;
    position: relative;

    background-color: ${({ color }) => color};
    transition: width 1s ease-in-out;

    ${(props) => {
      if (!props.animated) return css``

      return css`
        :after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          animation: ${Animation} 0.5s infinite linear alternate;
        }
      `
    }}
  }
`
