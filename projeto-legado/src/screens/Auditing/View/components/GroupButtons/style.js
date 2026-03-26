import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    
    .__button {
        .inactive {
            opacity: .45;
        }
        
        :not(:last-child) {
            padding-right: .5rem;
        }
        
        + .__button {
            padding-left: .7rem;
            border-left: .05rem solid ${props => props.border === 1 ? 'rgba(0, 0, 0, .2)' : 'transparent'};
        }
    }
`;
