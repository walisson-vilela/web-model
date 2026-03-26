import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: white;

  > div {
    height: 100%;
    min-width: 50%;
    display: flex;
    flex-direction: column;
  }
`;

interface BGContainerProps {
  bgImage: string;
}

export const BGContainer = styled.div<BGContainerProps>`
  flex: 1;
  background: linear-gradient(90deg, #3455AB, #3455AB70) 100%,
    url(${(props) => props.bgImage}) no-repeat center center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;

  img {
    width: clamp(64px, 12vmin, 140px);
    max-width: 32vw;
    height: auto;
    margin-bottom: clamp(16px, 4vw, 32px);
    position: absolute;
    top: clamp(16px, 3.5vmin, 40px);
    left: clamp(16px, 3.5vmin, 40px);
  }

  h1 {
    width: 100%;
    text-align: center;
  }

  span {
    display: none;
    width: 100%;
  }

  @media (max-width: 768px) {
    img {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;


export const OverlayText = styled.div`
  color: white;
  padding: 0 24px;
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  h1 {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 12px;
  }

  p {
  text-align: center;
  font-family: 'Lato', sans-serif;
  font-weight: 300;
  font-size: 40px;
  line-height: 40px;
  letter-spacing: 0px;
  color: #DFFF44;
  opacity: 1;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 20px;
    }
    p {
      font-size: 16px;
    }
  }
`


export const FormContainer = styled.div`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-left: 1px solid #ccc;
  display: flex;
`;

export const Link = styled.a`
  cursor: pointer;
  font-weight: bold;
  color: #324472;

  :hover {
    text-decoration: underline;
  }
`;

export const Subtext = styled.div`
  text-align: center;
  width: 65%;
  margin-top: 32px;
`;
