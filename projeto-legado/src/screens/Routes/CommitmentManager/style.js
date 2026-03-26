import styled from 'styled-components';

export const Container = styled.div`
    background: var(--white);
    margin-top: 1rem;
    border-radius: .2rem;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    
    > div:last-child {
        flex: 1;
    }
`;

export const Heading = styled.div`
    padding: 1rem 0;
    border-bottom: 1px solid var(--black-30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    > div:first-child {
        display: flex;
        align-items: center;
        
        > .mw-icon {
            font-size: 1.2rem;
            font-weight: 700;
            margin-right: 1rem;
        }
    }
`;

export const Content = styled.div`
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    position: relative;
    
    .item {
        font-size: 1.1rem;
        color: var(--black-40) !important;
        font-weight: 700;
    }
    
    .active.item {
        color: var(--blue-facebook) !important;
        border-color: var(--blue-facebook) !important;
    }
    
    .ui.segment.active.tab {
        margin: 0;
        padding: 0;
        border: 0;
        height: 0;
        flex: 1;
        box-shadow: none;
        background: transparent;
    }
`;

export const GroupInput = styled.div`
    display: flex;
    align-items: center;
    color: var(--black-60);
    
    > .field {
        margin: 0 !important;
        
        input {
            color: var(--black-60) !important;
        }
        
        :first-child {
            .ui.input {
                width: 8.5rem !important;
                margin-right: 2rem !important;
            }
        }
        
        :not(:first-child) {
            .ui.input {
                width: 5.5rem !important;
                margin: 0 1rem !important;
            }
        }
    }
`;
