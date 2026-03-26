import styled from 'styled-components';

export const Header = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: var(--white);
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--white-60);
    
    .mw-icon {
        color: var(--white);
        font-weight: 700;
        margin: 0;
        padding: 0;
        font-size: 1.2rem;
    }
    
    h3, p {
        margin: 0;
        padding: 0;
        color: var(--white);
    }
`;

export const HeaderTitle = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    
    div:first-child {
        margin-right: 1rem;
    }
`;

export const OptionsPopup = styled.div`
    width: 23rem;
    display: flex;
    flex-direction: column;
    position: relative;
    
    label {
        color: var(--headers-blue) !important;
    }
    
    > div {
        margin-bottom: .5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
`;

export const HeadingFilters = styled.div`
    display: flex;
    flex-direction: row;
    
    > div {
        :first-child {
            margin-right: 1rem;
            background: transparent !important;
            border: 1px solid var(--white-50) !important;
            color: var(--white) !important;
            
            > .text {
                color: var(--white) !important;
            }
        }
    }
`;

export const ItemSearch = styled.div`
    padding: .5rem 0;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    
    div {
        color: var(--headers-blue);
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
        :last-child {
            color: var(--black-40);
            font-size: .8rem;
        }
    }
`;

export const ContentGeneral = styled.div`
    width: 100%;
    height: 20rem;
    display: flex;
    flex-direction: column;
    
    .ui.form {
        flex: 1;
        margin-bottom: 1rem;
        
        textarea {
            height: 100%;
        }
    }
`;

export const HeaderGeneral = styled.div`
    display: flex;
    flex-direction: column;
    color: var(--headers-blue);
    margin-bottom: 1rem;
    font-weight: 700;
    
    > div {
        :first-child {
            margin-bottom: 1rem;
        }
    }
`;

export const FooterGeneral = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;
