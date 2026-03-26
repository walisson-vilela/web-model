import styled from 'styled-components';

export const Container = styled.div`
    padding: 1rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    
    h3 {
        font-weight: normal;
        color: var(--headers);
        padding: 0;
        margin-bottom: .5rem;
    }
    
    form {
        display: flex;
        flex-direction: column;
    }
`;

export const List = styled.div`
    padding: 1rem 0;
    margin-top: 1rem;
    border-top: 1px solid var(--black-10);
    border-bottom: 1px solid var(--black-10);
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .div__empty {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--black-60);
    }
    
    .div__items {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
        padding-right: .5rem;
        
        > div:not(:last-chil) {
            border-bottom: 1px solid var(--black-10);
        }
    }
    
    .div__footer {
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }
`;

export const Row = styled.div`
    display: flex;
    margin-top: ${props => props.marginTop ? props.marginTop : 0};
    justify-content: ${props => props.justifyContent ? 'space-between' : 'normal'};
    
    .field {
        margin-bottom: 0 !important;
        max-width: 10rem;
        
        label {
            color: var(--headers) !important;
            font-weight: normal !important;
        }
        
        :not(:last-child) {
            margin-right: 2rem !important;
        }
    }
    
    > div > p {
        color: var(--headers);
    }
    
    > div > div {
        display: flex;
    }
`;

export const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem .5rem;
    color: var(--black-60);
    
    > div {
        display: flex;
        
        strong {
            color: var(--headers);
            margin-right: .5rem;
            
            :after {
                content: ':'
            }
        }
        
        span {
            display: flex;
            margin-left: 1rem;
            align-items: center;
            font-weight: 700;
            
            p {
                margin-right: .5rem;
                margin-bottom: 0;
            }
            
            .mw-icon {
                margin: 0;
                padding: 0;
                font-weight: 700;
            }
        }
        
        .icon-more-vertical {
            margin-left: 1rem;
            font-weight: 700;
        }
    }
`;

export const DropdownUser = styled.div`
    border: 1px solid rgba(34,36,38,.15);
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 10rem;
    border-radius: .3rem;
    cursor: pointer;
    margin-right: ${props => props.marginRight ? props.marginRight : 0};
    
    p {
        margin: 0;
        padding: 0;
        color: var(--black-50);
        font-weight: 700;
    }
    
    .mw-icon {
        margin: 0;
        font-weight: 700;
        color: var(--black-40);
    }
`;
