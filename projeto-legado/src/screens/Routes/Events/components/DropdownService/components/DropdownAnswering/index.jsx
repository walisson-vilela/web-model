import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {Popup, Menu, Segment} from 'semantic-ui-react';
import {Icomoon, Confirm, Modal} from '../../../../../../../components';
import './index.css';

class DropdownAnswering extends Component {
    constructor(props) {
        super(props);

        this.state = {
            popup: {
                father: false,
                children: false
            }
        };

        this.popupConfigurationRef = React.createRef();
    }

    onOpenPopupFather = () => this.setState(prevState => {
        return {
            popup: {
                ...prevState.popup,
                father: true
            }
        }
    });

    onClosePopupFather = () => {
        const {popup} = this.state;

        if (!popup.children)
            this.setState(prevState => {
                return {
                    popup: {
                        ...prevState.popup,
                        father: false
                    }
                }
            })
    };

    onOpenPopupChildren = () => this.setState(prevState => {
        return {
            popup: {
                ...prevState.popup,
                children: true
            }
        }
    });

    onClosePopupChildren = () => this.setState(prevState => {
        return {
            popup: {
                ...prevState.popup,
                children: false
            }
        }
    });

    render() {
        const {popup} = this.state;

        return (
            <Fragment>
                <Modal ref={'ClearListStores'} size={'tiny'}>
                    <Confirm
                        title={'Tem certeza que deseja continuar?'}
                        description={'Ao continuar, todos os eventos já adicionados, serão removidos.'}
                        onCancel={() => this.refs['ClearListStores'].closeModal()}
                        onConfirm={() => this.props.onClearStores()}
                        confirmButton={'Sim, limpar!'}
                    />
                </Modal>
                <div ref={this.popupConfigurationRef}/>
                <Popup
                    basic
                    on={'click'}
                    className={'p-0'}
                    open={popup.father}
                    onOpen={() => this.onOpenPopupFather()}
                    onClose={() => this.onClosePopupFather()}
                    position={'bottom right'}
                    trigger={
                        <Menu.Item link>
                            <Icomoon
                                name={'more-vertical link'}
                                title={'Configurações'}
                            />
                        </Menu.Item>
                    }
                    content={
                        <Segment basic style={{paddingBottom: '4px'}}>
                            <Menu secondary vertical className={'menu-dropdown-answering'}>
                                <Menu.Item
                                    link
                                    content={'Limpar todos os pontos da lista'}
                                    onClick={() => {
                                        this.onClosePopupFather();
                                        this.refs['ClearListStores'].openModal();
                                    }}
                                />
                            </Menu>
                        </Segment>
                    }
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownAnswering);