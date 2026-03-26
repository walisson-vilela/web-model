import styled from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    position: relative;

    p {
        margin: 0;
        padding: 0;
        color: rgba(0, 0, 0, .4);
        font-size: 1.1rem;

        span {
            color: #13254F;
        }
    }
`;

export const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;

    h1 {
        color: #13254F;
        font-size: 1.3rem;
        text-transform: capitalize;
        margin: 0;
        padding: 0;
    }

    i.icon {
        font-size: 1.7rem;
        color: rgba(0, 0, 0, .5);
    }
`;

export const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 1.5rem;

    .ui.button:first-child {
        background: transparent;
        text-decoration: underline;
    }
`;
