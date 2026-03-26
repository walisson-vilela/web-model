import styled from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    
    h5 {
        color: var(--headers);
        margin: 0;
        padding: 0;
    }
`;

export const Header = styled.div`
    position: relative;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--headers);
    padding-bottom: 1.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--black-10);
    
    .mw-icon {
        color: var(--black-60);
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        padding: 0;
        font-size: 1.3rem;
    }
`;
