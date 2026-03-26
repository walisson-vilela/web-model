import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';

import { Container } from './style';

const GroupButtons = (props) => {
    const {
        options,
        action,
        size,
        basic,
        bordered,
        disabled,
        value
    } = props;

    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState('');

    /**
     * Execute action in click button
     *
     * @param value
     * @returns {Promise<void>}
     */
    const handleClickButton = async value => {
        await setLoading(true);

        try {
            await setActive(value.toString());
            await action(value);
        } catch (e) {
            await console.log(e);
        } finally {
            await setLoading(false);
        }
    };

    return (
        <Container border={bordered ? 1 : undefined}>
            {
                options.map((option) => (
                    <div className={'__button'} key={option.key}>
                        <Button
                            size={size}
                            basic={basic}
                            color={option.color}
                            content={option.text}
                            onClick={() => handleClickButton(option.value)}
                            disabled={disabled}
                            className={value !== option.value.toString() ? 'inactive' : ''}
                            loading={(active === option.value && loading)}
                        />
                    </div>
                ))
            }
        </Container>
    )
};

GroupButtons.propTypes = {
    options: PropTypes.array.isRequired,
    action: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large' ,'big' , 'huge', 'massive']),
    basic: PropTypes.bool,
    bordered: PropTypes.bool,
    disabled: PropTypes.bool
};

GroupButtons.defaultProps = {
    size: 'small',
    basic: false,
    bordered: false,
    disabled: false
};

export default GroupButtons;
