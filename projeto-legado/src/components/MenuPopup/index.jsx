import * as Proptypes from 'prop-types';
import { useState } from 'react';
import { Dimmer, Loader, Menu, Popup } from 'semantic-ui-react';

import { Icomoon } from '..';

const MenuPopup = (props) => {
    const {
        icon,
        items,
        handleReturn,
        position,
        size,
        basic,
        compact,
        loading,
        disabled
    } = props;

    const [open, setOpen] = useState(false);

    /**
     * Fecha o popup e executa função de callback.
     *
     * @param value
     * @returns {Promise<void>}
     * @constructor
     */
    const TogglePopup = async (value) => {
        await setOpen(false);
        await handleReturn(value);
    };

    if (disabled) {
        return <Icomoon name={icon}/>
    }

    return (
        <Popup
            on={'click'}
            position={position}
            size={size}
            trigger={<Icomoon name={icon}/>} offset={'10px'}
            basic={basic}
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            {
                loading === false ? (
                    <Menu secondary vertical compact={compact}>
                        {
                            items.map(item => (
                                <Menu.Item key={item.key} onClick={() => TogglePopup(item.value)}>{item.text}</Menu.Item>
                            ))
                        }
                    </Menu>
                ) : (
                    <Dimmer inverted active={loading}>
                        <Loader inverted/>
                    </Dimmer>
                )
            }
        </Popup>
    )
};

MenuPopup.propTypes = {
    icon: Proptypes.string,
    items: Proptypes.array,
    handleReturn: Proptypes.func,
    position: Proptypes.oneOf(['top center', 'top left', 'top right', 'bottom center', 'bottom left', 'bottom right', 'right center', 'left center']),
    size: Proptypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge']),
    basic: Proptypes.bool,
    compact: Proptypes.bool,
    loading: Proptypes.bool,
    disabled: Proptypes.bool
};

MenuPopup.defaultProps = {
    icon: 'more-horizontal link',
    items: [],
    handleReturn: (() => {
    }),
    position: 'bottom right',
    size: 'small',
    basic: false,
    compact: false,
    loading: false,
    disabled: false
};

export default MenuPopup;
