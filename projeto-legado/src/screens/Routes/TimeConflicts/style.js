import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    margin-top: .75rem;
    
    > div {
        width: calc(50% - .5rem);
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: .5rem;
        
        :first-child {
            background-color: #F7F7F7;
            margin-right: 1rem;
        }
    }
    
    .equal.width.row {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
    
    .associated-menu {
        border: 1px solid #F7F7F7 !important;
        box-shadow: 0.1rem 0.1rem 0.2rem 0 var(--black-10) !important;
        padding: .2rem !important;
        margin-bottom: 1rem !important;
        background-color: var(--white) !important;
        border-radius: unset !important;
        
        h4 {
            font-size: 1.3rem !important;
            color: var(--black) !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: 0 !important;
            
            .sub.header {
                color: var(--headers-blue);
            }
        }
    }
    
    .ui.divider {
        display: none;
    }
`;

export const Heading = styled.div`
    border: 1px solid #F7F7F7;
    box-shadow: 0.1rem 0.1rem 0.2rem 0 var(--black-10);
    display: flex;
    align-items: center;
    padding: 1rem;
    margin-bottom: 1rem;
    background-color: var(--white);
    text-align: ${props => props.textAlign ? props.textAlign : 'left'};
    
    .mw-icon {
        font-size: 1.2rem;
        font-weight: 700;
    }
    
    h3 {
        margin: 0;
        padding: 0;
        span {
            color: var(--black-40);
        }
    }
    
    p {
        color: var(--headers-blue);
    }
`;

export const Scroller = styled.div`
    width: 100%;
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding-right: .5rem;
    position: relative;
`;

export const ItemHovered = styled.div`
    padding: 1.5rem;
    border: 1px solid #ece8e8;
    box-shadow: 0.1rem 0.1rem 0.2rem 0 var(--black-10);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: .5rem;
    background-color: var(--white);
    cursor: pointer;
    
    :hover {
        background-color: rgba(0, 0, 0, .0001);
    }
`;

export const FirstHovered = styled.div`
    display: flex;
    align-items: center;
    
    > div {
        :last-child {
            margin-left: 1.75rem;
            
            h5 {
                margin: 0;
                padding: 0;
                color: var(--headers-blue);
            }
            
            p {
                color: var(--headers-blue);
            }
        }
    }
`;

export const SortedOut = styled.div`
        font-weight: 700;
        color: #7FE0A6;
        border: 1px solid #7FE0A6;
        padding: .5rem 1rem;
        border-radius: .2rem;
`;
