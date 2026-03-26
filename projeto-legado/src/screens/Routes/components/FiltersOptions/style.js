import styled from 'styled-components';

export const Container = styled.div`
    width: 20rem;
    height: ${props => props.size === 'mini' ? '14rem' : '25.6rem'};
    display: flex;
    flex-direction: column;
    
    h4.header {
        margin: 0;
        padding: 0;
    }
    
    .ui.input {
        margin-top: 1.5rem;
    }
    
    .ui.list {
        margin-top: 1.5rem;
        flex: 1;
        overflow-y: auto;
    }
    
    .component-empty {
        margin-top: 1.5rem;
        display: flex:
        flex: 1;
        align-items: center;
    }
`;

export const ContainerItem = styled.div`
    color: var(--black-60) !important;
`;

export const ContentEmpty = styled.div`
    display: flex;
    flex: 1;
    font-size: 1.1rem;
    text-align: center;
    align-items: center;
    color: var(--black-50);
    padding: 1rem;
`;

export const PointService = styled.div`
    margin-bottom: ${props => props.marginBottom ? props.marginBottom : '0'};
    padding: ${props => props.padding ? props.padding : '0'};
    cursor: pointer;
    
    .content {
        .description, .header {
            color: var(--black-60) !important;
        }
        
        .description {
            margin-top: .2rem;
            
            small {
                display: block;
                margin-top: .2rem;
            }
        }
    }
    
    :hover {
        .content {
            .description, .header {
                color: var(--black) !important;
            }
        }
    }
`;

export const ContainerRange = styled.div`
    width: 20rem;
    
    h4.header {
        margin: 0;
        padding: 0;
    }
    
    .button {
        text-transform: uppercase !important;
        font-size: .8rem !important;
        padding: .75rem 2rem !important;
    }
`;

export const GroupInputRange = styled.div`
    padding: 2rem 0;
    
    label {
        font-weight: normal !important;
        color: var(--black-50) !important;
    }
    
    input {
        border-color: var(--black-20) !important;
        color: var(--blue-facebook) !important;
    }
`;
