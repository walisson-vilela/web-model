import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    align-items: center;
    
    > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const Image = styled.img`
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    margin-right: 1rem;
`;

export const Header = styled.h4`
    margin: 0;
    padding: 0;
    
    span {
        color: var(--black-50);
    }
`;

export const Description = styled.div`
    margin: 0;
    padding: 0;
    color: var(--black-50);
    display: flex;
    align-items: center;
    
    .mw-icon {
        margin-left: .5rem;
        font-weight: 700;
    }
`;

export const Loader = styled.div`
    width: 20rem;
`;
