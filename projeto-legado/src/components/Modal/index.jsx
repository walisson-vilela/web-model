import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isBoolean, isFunction } from 'lodash';
import { Header, Menu, Modal as ReactModal, Segment } from 'semantic-ui-react';

import './style.css';

export class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            props: {}
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.statusModal = this.statusModal.bind(this);
    }

    statusModal() {
        return this.state.open;
    };

    openModal(props) {
        this.setState({
            open: true,
            props
        });
    };

    closeModal(success = false) {
        this.setState({
            open: false,
            props: {}
        }, () => {
            if (isFunction(this.props.onClose)) {
                this.props.onClose();
            }
            if (isBoolean(success) && success) {
                this.props.onSuccess();
            }
        });
    };

    render() {
        const {open} = this.state;
        const {menu, title, size, actions, maxWidth, closeIcon, style, footer, loading} = this.props;

        let className = "mb-0";
        if (this.props.className) {
            className += " " + this.props.className;
        }

        return (
            <ReactModal
                open={open}
                size={size}
                closeOnEscape={true}
                closeOnDimmerClick={false}
                className={maxWidth}
                style={style}
                onClose={this.closeModal}
            >
                <Segment
                    basic
                    style={{
                        padding: 0,
                        border: 'none'
                    }}
                    className={className}
                >
                    {
                        menu &&
                        <Menu inverted attached={'top'} color={'blue'}>
                            <Menu.Item as={Header} content={title}/>
                            <Menu.Menu position='right'>
                                {actions}
                                <Menu.Item icon link onClick={this.closeModal}>
                                    <span className="icon-x"/>
                                </Menu.Item>
                            </Menu.Menu>
                        </Menu>
                    }

                    <Segment
                        basic
                        style={{
                            border: 'none'
                        }}
                        className={"mt-0 mb-0"}
                        loading={loading}
                    >
                        {
                            closeIcon &&
                            <div
                                className={'modalClose'}
                            >
                                <span onClick={this.closeModal} className="icon-x"/>
                            </div>
                        }
                        {this.props.children}
                    </Segment>
                </Segment>
                {footer && <ReactModal.Actions>{footer}</ReactModal.Actions>}
            </ReactModal>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    open: PropTypes.bool,
    menu: PropTypes.bool,
    size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'fullscreen']),
    maxWidth: PropTypes.oneOf(['mw-840', 'mw-880', 'modal-crop', 'delete-crop']),
    loading: PropTypes.bool,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func,
    className: PropTypes.string
};

Modal.defaultProps = {
    title: '',
    className: '',
    open: false,
    menu: false,
    size: 'small',
    maxWidth: null,
    loading: false,
    onClose: () => {

        return true;
    },
    onSuccess: () => {

        return true;
    }
};
