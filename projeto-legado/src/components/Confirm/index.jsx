import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Dimmer, Loader } from 'semantic-ui-react';

import { Container, Description, GroupButton, Header } from './style';

const Confirm = ({title, description, cancelButton, confirmButton, confirmColor, onCancel, onConfirm, size, onSuccess, onError, disabled, details}) => {
    const [loading, setLoading] = useState(false);

    const handleConfirm = () => {
        setLoading(true);

        onConfirm().then(() => {
            setLoading(false);
            onSuccess();
            onCancel();
        }).catch((e) => {
            if(typeof(onError) === "function"){
                onError();
            }
            setLoading(false);
        });
    };

    return (
        <Container>
            <Header>{title}</Header>
            <Description>
                {description}
                {
                    details && <>{details}</>
                }
            </Description>

            <GroupButton>
                <Button onClick={() => onCancel()} size={size}>{cancelButton}</Button>
                <Button disabled={disabled} color={confirmColor} onClick={() => handleConfirm()} size={size}>{confirmButton}</Button>
            </GroupButton>

            <Dimmer inverted active={loading}>
                <Loader inverted/>
            </Dimmer>
        </Container>
    )
};

Confirm.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    cancelButton: PropTypes.string,
    confirmButton: PropTypes.string,
    size: PropTypes.oneOf(['mini', 'tiny', 'small']),
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onSuccess: PropTypes.func,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    details: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    confirmColor: PropTypes.oneOf(['red', 'blue']),
};

Confirm.defaultProps = {
    title: 'Tem certeza que deseja deletar?',
    description: 'Ao deletar os registros, eles serão perdidos permanentemente.',
    cancelButton: 'Cancelar',
    confirmButton: 'Sim, deletar!',
    confirmColor: 'red',
    size: 'tiny',
    onCancel: (() => {
    }),
    onConfirm: (() => {
    }),
    onSuccess: (() => {
    }),
    isLoading: false,
    disabled: false,
    details: false
};

export default Confirm;
