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
    border-top: 1px solid var(--black-10);
    padding-top: 1rem;
    padding-right: 1rem;
    overflow-y: auto;
    
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
    border-bottom: 1px solid var(--black-10);
    
    h1 {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--headers);
        margin-bottom: 0;
    }
    
    .div__container {
        display: flex;
        padding-top: 1rem;
        flex-direction: column;
        
        .div__row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
            
            :not(:last-child) {
                border-bottom: 1px solid var(--black-10);
                margin-bottom: .5rem;
            }
        }
    }
`;

export const ContentItem = styled.div`
    flex-shrink: 0;
    flex-grow: 1;
    width: 30%;
    padding: 0 1rem;
    
    hgroup {
        margin: 0;
        padding: 0;
        width: 100%;
        
        h1 {
            font-size: 1.1rem;
            color: ${({first}) => first ? 'var(--blue-facebook)' : 'var(--black-50)'};
            margin: 0;
            padding: 0;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            
            span {
                color: var(--headers-blue);
                font-weight: normal;
            }
        }
        
        h5 {
            font-weight: normal;
            margin: 0;
            padding: 0;
            color: var(--black-60);
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
    
    p {
      margin-top: .5rem;
      font-size: .8rem;
      color: #666;
    }
`;
