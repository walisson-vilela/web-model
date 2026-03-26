import styled from 'styled-components';

export const Container = styled.div`
    padding: 1rem;
    border-left: ${({active}) => active ? '3px solid #50CF73' : '3px solid var(--black-10)'};
    border-top: 1px solid var(--black-10);
    border-right: 1px solid var(--black-10);
    border-bottom: 1px solid var(--black-10);
    border-radius: .2rem;
    display: flex;
    flex-direction: column;
    background: var(--white);
    box-shadow: 2px 2px 10px 0 rgba(0,0,0,.1);
    position: relative;
    
    .cell__row {
        color: var(--black-40);
        display: block;
        
        :after {
            content: ')';
        }
        
        :before {
            content: '(';
        }
    }
    
    .fixedDataTableCellLayout_wrap3.public_fixedDataTableCell_wrap3 {
        background: var(--white);
        background-image: none;
    }
    
    .public_fixedDataTableCell_main,
    .public_fixedDataTable_header,
    .public_fixedDataTable_hasBottomBorder,
    .public_fixedDataTable_main {
        border-color: rgba(0, 0, 0, .07);
        background-image: none;
    }
    
    .public_Scrollbar_main.public_Scrollbar_mainActive,
    .public_Scrollbar_main {
        border-color: transparent;
        background-image: none;
    }
`;

export const Header = styled.div`
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--black-10);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    > div:first-child {
        h5 {
            color: var(--headers-blue);
            
            span {
                color: var(--black-40);
                margin-left: 1rem;
            }
        }
    }
    
    .__actions {
        display: flex;
        align-items: center;
        
        .__icons {
            border-right: 1px solid rgba(0, 0, 0, .1);
            height: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .7rem;
            padding-right: .7rem;
        }
        
        .mw-icon {
            font-size: 1.3rem;
            color: var(--headers);
            padding: 0;
            margin: 0 .5rem;
        }
        
        .ui.selection.dropdown {
            margin-left: .5rem;
        }
    }
`;

export const Mask = styled.div`
    position: absolute;
    width: ${({width}) => `${width}px`};
    height: 4.1rem;
    background-color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 2.4rem;
    left: 1rem;
    border: 1px solid var(--black-10);
    color: var(--black-60);
    user-select: none;
    font-weight: 700;
    text-transform: uppercase;
`;

/**
 * Color dropdown
 *
 * @param value
 * @returns {string}
 */
const bgColorChooser = ({changed}) => {
    switch (changed) {
        case '0':
        default:
            return '#B5B5B5';
        case '1':
        case '2':
            return '#50CF73';
        case '3':
            return '#EF5350'
    }
};

export const ColorDropdown = styled.div`
    margin-left: .5rem;
    
    .ui.selection.dropdown,
    .ui.active.visible.selection.dropdown {
        > i,
        > .text {
            color: #FFF !important;
            font-weight: 700 !important;
        }
    }
    
    .ui.selection.dropdown {
        background-color: ${bgColorChooser};
    }
`;
