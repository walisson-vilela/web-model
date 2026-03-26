import styled from 'styled-components';

export const Empty = styled.div`
    padding: 0 1.5rem;
    color: var(--black-30);
    font-weight: 700;
    text-transform: uppercase;
    user-select: none;
`;

export const Content = styled.div`
    max-width: 49rem;
    display: flex;
    background:red;
`;

export const Item = styled.div`
    width: 15rem;
    margin: 0 .5rem;
    padding: .5rem 1rem;
    position: relative;
    user-select: none;

    h5 {
        margin: 0;
        font-weight: 700;
        color: var(--black-60);
        max-width: 11rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    p {
        color: var(--black-40);
        font-size: .8rem;
        color: var(--black-30);
        max-width: 13rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        padding: 0;
    }

    i.mw-icon {
        color: var(--black-60);
        position: absolute;
        top: .7rem;
        right: .9rem;
        font-weight: 700;
        font-size: 1rem;
    }

    :hover {
        background-color: rgba(0, 0, 0, .04);
    }
`;

export const More = styled.div`
    display: flex;
    align-items: center;
    color: var(--black-60) !important;
    font-weight: 700;
    text-align: center;
    font-size: 1.4rem;
    cursor: pointer;
    margin-right: .5rem;

    :hover {
        background-color: rgba(0, 0, 0, .04);
    }

    i.mw-icon {
        margin: 0;
    }
`;

export const ContentMore = styled.div`
    width: 15.714285714285714rem;
    height: 22rem;
    display: flex;
    flex-direction: column;

    p {
        text-align: right;
        text-transform: uppercase;
        color: var(--black-60);

        span {
            font-size: .8rem;
            padding: .5rem;
            cursor: pointer;
            border-radius: .2rem;

            :hover {
                background-color: rgba(0, 0, 0, .04);
            }
        }
    }
`;

export const HeaderMore = styled.div`
    border-bottom: 1px solid var(--black-10);
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    h1 {
        color: var(--headers-blue);
        font-size: .9rem;
        text-transform: uppercase;
        margin: 0;
    }

    .input {
        width: 100% !important;
        border-color: var(--black-10);
        margin-top: 1rem !important;
    }
`;

export const ListMore = styled.div`
    margin-bottom: 1rem;
    flex: 1;
    overflow-y: auto;
`;

export const ItemMore = styled.div`
    padding: .5rem;
    margin-top: 1rem;
    margin-right: .5rem;
    margin-bottom: .5rem;
    position: relative;

    :first-child {
        margin-top: 0;
    }

    :after {
        position: absolute;
        content: "";
        width: 100%;
        height: .5rem;
        border-bottom: 1px solid var(--black-10);
        bottom: -.5rem;
        left: 0;
    }

    h5 {
        margin: 0;
        font-weight: 700;
        color: var(--black-60);
        max-width: 11rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    p {
        color: var(--black-40);
        font-size: .8rem;
        color: var(--black-30);
        max-width: 13rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 0;
        padding: 0;
        text-align: left;
    }

    i.mw-icon {
        color: var(--black-60);
        position: absolute;
        top: .7rem;
        right: .9rem;
        font-weight: 700;
        font-size: 1rem;
    }

    :hover {
        background-color: rgba(0, 0, 0, .04);
    }
`;
