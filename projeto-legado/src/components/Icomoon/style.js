import styled from 'styled-components';

export const Icon = styled.i.attrs(props => ({
    className: `icon-${props.name} ${props.link === 1 && 'link'} mw-icon icon ${props.rotate === 1 && 'rotate'} ${props.circular === 1 && 'circular'}`,
}))`
    margin: 0 !important;
    padding: 0 !important;
    position: relative;
    
    :after {
        display: ${props => props.label === 1 ? 'block' : 'none'};
        content: '';
        position: absolute;
        width: .7rem;
        height: .7rem;
        background: ${props => props.color};
        border-radius: 50%;
        top: 0;
        right: 0;
        border: .1rem solid #FFF;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    
    span.__text {
        margin-left: .3rem;
    }
`;
