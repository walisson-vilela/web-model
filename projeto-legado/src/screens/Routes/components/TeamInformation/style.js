import styled from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;
    position: relative;
`;

export const Header = styled.div`
    position: relative;
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--black-20);
    
    h1 {
        font-size: 1.3rem;
        color: var(--headers-blue);
        margin: 0;
        padding: 0;
    }
    
    .mw-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--headers-blue);
    }
`;

export const Content = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    
    h5 {
        color: var(--headers-blue);
    }
`;

export const Item = styled.div`
    display: flex;
    color: var(--black-40);
    padding: 1rem;
    align-items: center;
    border-left: 2px solid transparent;
    border-top: 2px solid transparent;
    border-right: 2px solid transparent;
    
    strong {
        color: var(--headers-blue);
        font-weight: normal;
    }
    
    div {
        width: 50%;
        display: flex;
        flex-direction: column;
    }
    
    :not(:last-child) {
        border-bottom: 2px solid var(--black-10);
    }
    
    :last-child {
        border-bottom: 2px solid transparent;
    }
    
    :hover {
        border: 2px solid var(--headers-blue);
    }
`;
