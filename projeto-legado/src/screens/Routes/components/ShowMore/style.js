import styled from 'styled-components';

export const Container = styled.div`
    height: 29rem;
    display: flex;
    flex-direction: column;
`;

export const Header = styled.div`
    padding: .5rem 0 1.3rem 0;
    font-weight: 700;
    color: var(--dark-blue);
    border-bottom: 1px solid var(--black-20);
    position: relative;
    
    .mw-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--black-50);
        
        :hover {
            color: var(--black);
        }
    }
`;

export const Actions = styled.div`
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    div {
        color: var(--dark-blue);
        font-weight: bold;
        
        .input {
            border-bottom: 1px solid var(--black-20);
            padding: .5rem;
        }
    }
`;

export const Content = styled.div`
    flex: 1;
    overflow-y: auto;
    
    .empty {
        display: flex;
        flex: 1;
        justify-contents: center;
        align-items: center;
        height: 100%;
    }
`;

export const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--black-10);
    padding: 1rem;
    margin-right: 1rem;
    
    h5, p, small {
        margin: 0;
        padding: 0;
        color: var(--dark-blue);
    }
    
    span {
        text-decoration: underline;
        font-size: .8rem;
        color: var(--blue-facebook);
        cursor: pointer;
    }
`;
