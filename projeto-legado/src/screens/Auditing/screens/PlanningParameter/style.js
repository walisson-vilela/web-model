import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    background-color: var(--white);
    padding: 0 1rem;
    position: relative;
    
    .ui.steps {
        margin-bottom: 1rem !important;
        
        .step {
            padding: 1.5rem 2rem !important;
            font-weight: 700;
            font-size: 1.3rem;
            color: var(--blue-facebook);
        }
        
        .completed.step {
            color: var(--white);
            background: var(--blue);
            
            :after {
                border-color: var(--black-10);
                background: var(--blue);
            }
        }
    }
`;

export const Heading = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: .5rem 0;
    
    .mw-icon {
        font-size: 2rem;
        font-weight: 700;
        margin: 0;
        padding: 0;
        color: var(--headers-blue);
    }
    
    hgroup {
        margin-left: 2rem;
        padding: 0;
        
        h1 {
            margin: 0;
            padding: 0;
            color: var(--headers-blue);
            font-size: 1.5rem;
        }
        
        h5 {
            margin: 0;
            padding: 0;
            font-weight: normal;
            color: var(--black-60);
        }
    }
`;

export const Content = styled.div`
    width: 100%;
    height: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: .5rem;
    overflow-y: auto;
    
    .div__row {
        display: flex;
        align-items: center;
        
        .field {
            width: 13rem;
            margin-bottom: 1.5rem !important;
            
            label {
                font-weight: normal !important;
                color: var(--blue-facebook) !important;
            }
            
            :not(:last-child) {
                margin-right: 1.5rem;
            }
        }
        
        .group__input {
            display: flex;
            align-items: center;
            margin: 0;
            padding: 0;
            
            .field {
                position: relative;
                width: 10rem;
                
                :first-child:after {
                    content: '';
                    width: 1.5rem;
                    height: .1rem;
                    background: var(--black-10);
                    position: absolute;
                    top: 3rem;
                }
            }
        }
    }
    
    .div__content_cards {
        margin-top: 1rem;
        
        > div:not(:last-child) {
            margin-bottom: 1rem;
        }
        
        .div__footer {
            display: flex;
            justify-content: flex-end;
        }
    }
`;

export const HeaderForm = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    h1 {
        font-size: 1.4rem;
        color: var(--headers-blue);
    }
`;

export const FooterForm = styled.div`
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid var(--black-10);
    padding-bottom: 1rem;
`;

export const ParametersAdded = styled.div`
    padding-top: 1rem;
    
    h1 {
        font-size: 1.4rem;
        color: var(--headers-blue);
    }
    
    .div__content {
        padding: 0 1rem;
    }
    
    .div__footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
    }
`;

export const Item = styled.div`
    padding: 1rem;
    box-shadow: 0 0 .2rem 0 var(--black-30);
    margin-bottom: 1rem;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    
    .div__container {
        display: flex;
        flex-wrap: wrap;
        flex-grow: 1;
        justify-content: space-between;
        
        .item {
            flex-grow: 1;
            max-width: 25rem;
            color: var(--headers-blue);
            font-size: 1rem;
            font-weight: 700;
            
            span {color: var(--black-60);}
        }
        
        .break {
            flex-basis: 100%;
            height: 1rem;
            width: 0;
        }
    }
`;
