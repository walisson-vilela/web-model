import styled from 'styled-components';

export const GroupButton = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;

    .fechar {
        button {
            background: transparent;
            text-decoration: underline;

            :hover {
                background: transparent;
            }
        }
    }
`;
