import styled from 'styled-components';

export const Container = styled.div`
    background: var(--white);
    border: 1px solid #D4D4D5;
    height: 100%;
    margin-top: 1rem;
    padding: 1rem 1.75rem;
    
    .ui.pointing.secondary.menu {
        .item, .item.active {
            color: var(--headers-blue);
        }
        
        .item.active {
            border-color: var(--headers-blue);
        }
    }
    
    .ui.segment.active.tab {
        padding: 0;
        box-shadow: none;
        border: none;
        height: calc(100vh - 15.7rem);
    }
`;
