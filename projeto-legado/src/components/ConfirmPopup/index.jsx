import * as PropTypes from 'prop-types';
import React, { useState } from 'react';

import { Button, Header, Popup } from 'semantic-ui-react';

import './index.css';

export function ConfirmPopup(props) {
    const {
        inverted,
        disabled,
        color,
        colorSecondary,
        size,
        basic,
        content,
        position,
        title,
        subtitle,
        textCancel,
        textSubmit,
        onSubmit,
        loading
    } = props;

    const [popup, setPopup] = useState(false);

    /**
     * executa ação de submit e fecha popup.
     *
     * @returns {Promise<void>}
     */
    const handleSubmit = async () => {
        await setPopup(false);
        await onSubmit();
    };

    return (
        <Popup
            position={position}
            trigger={
                <Button
                    inverted={inverted}
                    disabled={disabled}
                    color={color}
                    size={size}
                    basic={basic}
                    content={content}
                    loading={loading}
                />
            }
            on={'click'}
            open={popup}
            onOpen={() => setPopup(true)}
            onClose={() => setPopup(false)}
        >
            <div className={'confirm-popup'}>
                <Header as={'h4'} textAlign={'center'}>
                    <Header.Content>
                        {title}
                        <Header.Subheader>{subtitle}</Header.Subheader>
                    </Header.Content>
                </Header>

                <div className={'group-buttons'}>
                    <Button
                        onClick={() => handleSubmit()}
                        color={colorSecondary}
                        content={textSubmit}
                    />

                    <Button
                        onClick={() => setPopup(false)}
                        className={'bg-transparent text-underline'}
                        content={textCancel}
                    />
                </div>
            </div>
        </Popup>
    )
}

ConfirmPopup.propTypes = {
    inverted: PropTypes.bool,
    disabled: PropTypes.bool,
    color: PropTypes.oneOf(['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black', 'facebook', 'google plus', 'instagram', 'linkedin', 'twitter', 'vk', 'youtube']),
    colorSecondary: PropTypes.oneOf(['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black', 'facebook', 'google plus', 'instagram', 'linkedin', 'twitter', 'vk', 'youtube']),
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'medium', 'large', 'big', 'huge', 'massive']),
    basic: PropTypes.bool,
    content: PropTypes.string,
    position: PropTypes.oneOf(['top center', 'top left', 'top right', 'bottom center', 'bottom left', 'bottom right', 'right center', 'left center']),
    title: PropTypes.string,
    subtitle: PropTypes.string,
    textCancel: PropTypes.string,
    textSubmit: PropTypes.string,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
};

ConfirmPopup.defaultProps = {
    inverted: false,
    disabled: false,
    color: 'green',
    colorSecondary: 'green',
    size: 'small',
    basic: false,
    content: 'Button',
    position: 'top left',
    title: 'Tem certeza que deseja continuar?',
    subtitle: 'Ao confirmar, você não poderá mais desfazer esta ação.',
    textCancel: 'Cancelar',
    textSubmit: 'Sim, tenho certeza!',
    onSubmit: () => undefined,
    loading: false
};
