import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Menu, Popup, Segment, Tab, List} from 'semantic-ui-react';
import {Icomoon} from '../../../../../../../components';
import './index.css';

class StartingPoint extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onRenderTabs = () => {
        const panes = [
            {
                menuItem: 'Definir ponto de partida',
                render: () => <Tab.Pane attached={false} className={'no-border no-box-shadow'}>
                    <List>
                        <List.Item>
                            <List.Content>
                                <List.Header>Casa</List.Header>
                                <List.Description>
                                    Rua: Bloco B - Estrada Velha S/N - Nova Lima - Minas Gerais <br/>
                                    ID GIV: 224045 | Código Interno: 10203012
                                </List.Description>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header>Mundo Wap Internet</List.Header>
                                <List.Description>
                                    Rua: Bloco B - Estrada Velha S/N - Nova Lima - Minas Gerais <br/>
                                    ID GIV: 224045 | Código Interno: 10203012
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    </List>
                </Tab.Pane>
            }, {
                menuItem: 'Cadastrar novo ponto de partida',
                render: () => <Tab.Pane attached={false}  className={'no-border no-box-shadow'}>Tab 2 Content</Tab.Pane>
            }
        ];

        return (
            <Tab
                menu={{secondary: true, pointing: true}}
                panes={panes}
            />
        )
    };

    render() {
        return (
            <Popup
                basic
                className={'p-0'}
                on={'click'}
                position={'bottom right'}
                verticalOffset={-5}
                horizontalOffset={5}
                trigger={
                    <Menu.Item link>
                        <Icomoon
                            name={'chevron-down link'}
                            title={'Alterar Ponto de Partida'}
                        />
                    </Menu.Item>
                }
                content={
                    <Segment
                        basic
                        className={'change-starting-point'}
                        content={this.onRenderTabs()}
                    />
                }
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StartingPoint);