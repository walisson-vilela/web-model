import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
`;

export const Icon = styled.div`
    background-color: #465F98;
    color: var(--white) !important;
    display: flex;
    align-items: center;
    justify-contents: center;
    padding: 0 8rem;
    border-top-left-radius: .2rem;
    border-bottom-left-radius: .2rem;
    box-shadow: 6px 0px 10px 0px var(--black-20);
    
    img {
        max-width: 120px;
    }
`;

export const Content = styled.div`
    flex-shrink: 0;
    flex-grow: 1;
    padding: 1.5rem;
    border-radius: .2rem;
    position: relative;
`;

export const Header = styled.div`
    position: relative;
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.2rem;
    
    .mw-icon {
        color: var(--black-50);
        position: absolute;
        top: -.5rem;
        right: -.5rem;
        margin: 0;
        padding: 0;
    }
`;
