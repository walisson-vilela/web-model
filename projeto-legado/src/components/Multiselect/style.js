import styled from 'styled-components';

export const Container = styled.div`
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 39rem;
`;

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;

    h3 {
        color: var(--headers-blue);
        margin: 0;
        padding: 0;
        font-size: 1.3rem;
    }

    p {
        color: var(--black-60);
        font-size: .9rem;
    }

    .ui.dropdown > .text {
        font-size: 1.3rem;
        font-weight: 700;
        color: var(--headers-blue);
    }
`;

export const Content = styled.div`
    display: flex;
    flex: 1;
    height: 0;
    justify-content: space-between;

    .row__area {
        position: relative;
    }

    .__footer_option {
        font-size: .8rem !important;
        text-align: end !important;
        text-decoration: underline;
        color: rgba(0, 0, 0, .5) !important;
    }

    > div {
        width: calc(50% - .537rem);
        height: 100%;
        display: flex;
        flex-direction: column;

        :first-child {
            margin-right: 1.75rem;
        }

        .row__header {
            border-left: 1px solid var(--black-10);
            border-top: 1px solid var(--black-10);
            border-right: 1px solid var(--black-10);
            align-items: center;
            padding: 1rem 0;
            display: flex;
            justify-content: space-between;

            .mw-icon {
                margin: 0 1.2rem !important;
                padding: 0;
            }

            .ui.button {
                padding: 0 1.2rem;
                background-color: transparent;

                .mw-icon {
                    margin: 0 !important;
                    padding: 0;
                }
            }

            > .ui.transparent.icon.input {
                flex: 1;

                > input {
                    margin-left: 1rem;
                }

                .mw-icon {
                    margin-right: 1rem;
                }
            }

            > .ui.checkbox {
                padding: 0 1rem;
            }

            > div:not(:last-child) {
                position: relative;

                :before {
                    position: absolute;
                    content: '';
                    width: .5rem;
                    height: 3.3rem;
                    border-right: 1px solid var(--black-10);
                    top: -1rem;
                    right: 0;
                }
            }
        }

        .row__footer {
            display: flex;
            justify-content: flex-end;
            margin-top: 1.5rem;
        }

        .row__records {
            border-left: 1px solid var(--black-10);
            border-bottom: 1px solid var(--black-10);
            border-right: 1px solid var(--black-10);
            display: flex;
            justify-content: flex-end;
            padding: 16px;
        }
        .row__pagination{
            border-left: 1px solid var(--black-10);
            border-bottom: 1px solid var(--black-10);
            border-right: 1px solid var(--black-10);
            display: flex;
            justify-content: flex-end;
            padding: .3rem 0;

            .pagination-mw {
                box-shadow: none !important;
            }
        }
    }
`;

export const Column = styled.div`
    border: 1px solid var(--black-10);
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 0;
    overflow-y: auto;
    position: relative;

    > div {
        border-bottom: 1px solid var(--black-10);
    }

    .div__empty {
        height: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h5 {
            margin: 0;
            color: var(--headers);
            font-size: 1.2rem;
        }

        p {
            color: var(--black-60);
        }
    }
`;

export const Item = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
     opacity: ${props => props.disable ? '.5' : '1'};
    cursor: ${props => props.disable ? 'auto' : 'pointer'};

    .row__children {
        margin-left: 1rem;
        flex-shrink: 0;
        flex-grow: 1;
    }
`;

export const ContentPopup = styled.div`
    margin-top: .5rem;
    color: var(--black-70);

    .ui.button {
        display: block;
        margin-top: 1rem;
    }
`;
