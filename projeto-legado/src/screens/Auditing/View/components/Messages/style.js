import styled from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 35rem;
`;

export const Header = styled.div`
    font-weight: 700;
    color: var(--headers);
    font-size: 1.3rem;
    position: relative;
    margin-bottom: 1.5rem;
    
    span {
        margin-left: .5rem;
        color: var(--black-60);
        
        :after {
            content: ')'
        }
        
        :before {
            content: '('
        }
    }
    
    .mw-icon {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 1.3rem;
        color: var(--black-50);
    }
`;

export const Body = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 0;
    
    Textarea {
        margin-bottom: 1rem;
        border-color: var(--black-10);
        padding: 1rem;
        color: var(--black-70);
    }
`;

export const Footer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const Unread = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    border: 1px solid var(--black-10);
    padding: 1rem 1.5rem;
    margin-bottom: 1rem;
    
    .div__empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        flex: 1;
        
        .ui.container {
            width: 100%;
            
            h4.ui.header {
                margin-bottom: 1rem !important;
            }
        }
    }
    
    > div:not(:last-child) {
        margin-bottom: 1rem;
    }
`;

export const Item = styled.div`
    display: flex;
    flex-direction: ${props => props.right ? 'row-reverse' : 'row'};
    max-width: 65%;
    margin-left: ${props => props.right ? '40%' : '0'};
    text-align: ${props => props.right ? 'right' : 'left'};
    
    > div:first-child {
        width: 2.2857142857142856rem;
        margin-right: ${props => props.right ? '0' : '1rem'};
        margin-left: ${props => props.right ? '1rem' : '0'};
        display: flex;
        align-itens: top;
        
        img {
            width: 2.2857142857142856rem;
            height: 2.2857142857142856rem;
            border-radius: 2rem;
        }
    }
    
    > div:last-child {
        display: flex;
        flex: 1;
        flex-direction: column;
        
        h5 {
            margin-bottom: .5rem;
            padding: 0;
            color: var(--blue-facebook);
            
            span:after {
                content: ')';
            }
            
            span:before {
                content: '(';
            }
        }
        
        p {
            margin-bottom: .3rem;
            color: var(--black-60);
        }
        
        small {
            margin: 0;
            padding: 0;
            font-size: .85rem;
            color: var(--black-40);
        }
    }
`;
