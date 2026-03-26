import styled from 'styled-components'

interface ToasterTypes {
  color: 'normal' | 'error'
}

export const ToasterContentContainer = styled.div<ToasterTypes>`
  margin: 0;
  padding: 0;
  width: 100%;
  color: ${(props) => (props.color === 'normal' ? '#1E561F' : '#561E1E')};

  .title {
    font-size: 18px;
    font-weight: bold;

    margin: 0 7px 0 0;
  }

  .description {
    font-size: 14px;
    font-weight: normal;

    margin: 0;
  }

  svg {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
`
