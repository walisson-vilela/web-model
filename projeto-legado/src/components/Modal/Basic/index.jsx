import * as PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Button, Divider, Header, Input, Segment } from 'semantic-ui-react';
import { Icomoon, Modal } from '../..';
import './index.css';

export class ModalBasic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            q: '',
            title: '',
            subheader: ''
        };

        this.openModal = this.openModal.bind(this);
    }

    onSetSearch = q => this.setState({q});

    onSendSearch = (value, key) => {
        if (key === 'Enter') {
            this.onSetSearch(value);
            this.props.search(value);
        }
    };

    openModal = props => {
        this.setState(props);
        this.refs.MyModalBase.openModal(props);
    };

    closeModal = () => this.refs.MyModalBase.closeModal();

    render() {
        const {q, title, subheader} = this.state;

        return (
            <Modal ref={'MyModalBase'} size={this.props.size} className={`modal-basic ${this.props.className}`}>
                <Icomoon
                    link
                    name={'x'}
                    title={'Fechar'}
                    onClick={() => this.closeModal()}
                    style={{position: 'fixed', top: '1rem', right: '1rem', cursor: 'pointer', zIndex: 1}}
                />
                <Segment basic className={'mt-0 m-0'}>
                    {
                        (this.props.title || title) &&
                        <React.Fragment>
                            <Header as={'h3'} textAlign={this.props.textAlign}>
                                <Header.Content>
                                    {title ? title : this.props.title}
                                    {
                                        (this.props.subheader || subheader) &&
                                        <Header.Subheader>
                                            {subheader ? subheader : this.props.subheader}
                                        </Header.Subheader>
                                    }
                                </Header.Content>
                            </Header>
                            {
                                (this.props.children || this.props.search) &&
                                <Divider/>
                            }
                        </React.Fragment>
                    }
                    {
                        (this.props.children || this.props.search) &&
                        <React.Fragment>
                            {
                                this.props.search &&
                                <React.Fragment>
                                    <Input
                                        transparent
                                        value={q}
                                        onChange={(e, {value}) => this.onSetSearch(value)}
                                        onKeyPress={(e) => this.onSendSearch(e.target.value, e.key)}
                                        placeholder={'Pesquisar...'}
                                        icon={
                                            <Icomoon
                                                name={'search link'}
                                                title={'Pesquisar'}
                                                onClick={() => this.onSendSearch(q, 'Enter')}
                                            />
                                        }
                                    />
                                    <div style={{clear: 'both'}}/>
                                </React.Fragment>
                            }
                            {
                                this.props.children &&
                                <Segment basic className={'pt-0 pb-0 mt-1'}
                                         style={this.props.maxHeight ? {maxHeight: `${this.props.maxHeight}rem`} : {}}>
                                    {this.props.children}
                                </Segment>
                            }
                        </React.Fragment>
                    }
                    {
                        (this.props.onCancel || this.props.onSuccess) &&
                        <React.Fragment>
                            <Button.Group floated={'right'}>
                                {
                                    this.props.onCancel &&
                                    <Button className={'cancell'}
                                            onClick={() => this.props.onCancel()}>{this.props.onCancelText}</Button>
                                }
                                {
                                    this.props.onSuccess &&
                                    <Button className={'submit'} color={'facebook'}
                                            onClick={() => this.props.onSuccess()}>{this.props.onSuccessText}</Button>
                                }
                            </Button.Group>
                            <div style={{clear: 'both'}}/>
                        </React.Fragment>
                    }
                </Segment>
            </Modal>
        );
    }
}

ModalBasic.propType = {
    size: PropTypes.oneOf(['mini', 'small', 'large']),
    className: PropTypes.string,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    title: PropTypes.string,
    subheader: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.object
    ]),
    children: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    search: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    maxHeight: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number
    ]),
    onCancel: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    onCancelText: PropTypes.string,
    onSuccess: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    onSuccessText: PropTypes.string
};

ModalBasic.defaultProps = {
    size: 'small',
    className: '',
    textAlign: 'left',
    subheader: false,
    children: false,
    search: false,
    maxHeight: false,
    onCancel: false,
    onCancelText: 'Cancelar',
    onSuccess: false,
    onSuccessText: 'Finalizar'
};
