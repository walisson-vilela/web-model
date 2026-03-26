import styled from 'styled-components';

export const Container = styled.div`
    border: 1px solid var(--black-10);
    padding: 1rem;
    margin-bottom: 1rem;
    position: relative;
    background: var(--white);

    .icon-external-link  {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: var(--black-30);
        font-weight: 700;
    }
`;

export const ContentChildren = styled.div`
    h3 {
        margin-bottom: .75rem;
        padding: 0;
        font-size: 1.2rem;
        color: var(--headers-blue);
    }

    p {
        margin: 0;
        padding: 0;
        color: var(--black-90);

        :last-child {
            color: var(--black-30);
        }
    }
`;

export const ContainerPopup = styled.div`
    width: 45rem;
    height: 16.5rem;
    display: flex;
    flex-direction: column;
    position: relative;

    h3 {
        font-weight: 700;
        color: var(--headers-blue);
        font-size: 1.2rem;
        margin-bottom: 1rem;
        padding: 0;
    }
`;

export const StepPopup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    > div {
        width: 50%;

        > div {
            p {
                color: var(--black);
                margin: 0;
                padding: 0;

                :last-child {
                    color: var(--black-40);
                }
            }
        }
    }
`;

export const ProgressPopup = styled.div`
    opacity: ${props => props.disabled ? '.3' : '1'};

    h5 {
        margin: 0;
        padding-left: 1rem;
        font-weight: normal;
        position: relative;

        :after {
            content: '';
            position: absolute;
            top: .4rem;
            left: 0;
            width: .5rem;
            height: .5rem;
            background: var(--blue-facebook);
            border-radius: 1rem;
        }
    }

    .progress {
        margin: .5rem 0 !important;
    }

    p {
        margin: 0 0 0 1.5rem !important;
        color: var(--black-60) !important;
    }
`;

export const Without = styled.div`
    display: flex;
    flex-direction: column;

    h5 {
        font-weight: normal;

        span {
            color: var(--black-40);
            margin-left: 1rem;
        }
    }

    ul {
        margin: 0;
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 0;
        overflow-y: auto;
    }

    li {
        list-style: none;
        color: #0F224D;
        padding: .7rem 0;

        h1 {
            font-size: 1rem;
            margin: 0;
            padding: 0;
        }

        h5 {
            margin: 0;
            padding: 0;
        }
    }

    li + li {
        border-top: 1px solid rgba(0, 0, 0, .1);
    }
`;
