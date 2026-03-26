import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    height: 20rem;
`;

export const Header = styled.div`
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--black-10);
    position: relative;
    color: var(--black-60);
    
    h3 {
        margin: 0;
        padding: 0;
        color: var(--headers);
    }
    
    .mw-icon {
        font-weight: 700;
        font-size: 1.3rem;
        color: var(--black-60);
        position: absolute;
        top: 0;
        right: 0;
    }
`;

export const Scroll = styled.div`
    height: 0;
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-right: .5rem;
    
    > div:not(:last-child) {
        margin-bottom: .5rem;
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid var(--black-10);
    color: var(--black-70);
    padding-bottom: .5rem;
    
    > div:first-child {
        text-align: center;
        font-weight: 700;
        
        small {
            display: block;
            color: var(--black-40);
            font-weight: normal;
            font-size: .7rem;
        }
    }
`;
