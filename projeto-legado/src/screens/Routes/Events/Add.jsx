import React, {Component} from 'react';

import EventsManagerList from './components/EventsManagerList';
import AssociatedServicePointsList from './components/AssociatedServicePointsList';

import {Divider, Dropdown, Grid, Header, Label, Menu, Segment} from 'semantic-ui-react';
import {Icomoon} from '../../../components';
import './add.css';

class RouteEventsAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activated: false
        };

        this.associatedServicePointsList = React.createRef();
    }

    onSetEvents = stores => this.setState({activated: true}, () => this.associatedServicePointsList.current.onSetStores(stores));

    render() {
        const {activated} = this.state;
        const {route} = this.props;

        return (
            <Segment className={'route-events-add h-100'} basic>
                <Grid className={'m-0 h-100'}>
                    <Grid.Row columns={2}>
                        <Grid.Column className={'p-0'}>
                            <div className={'header'}>
                                <Header as={'h3'} inverted>
                                    <Header.Content>
                                        Gerenciador de Eventos
                                        <Header.Subheader style={{marginTop: '.5rem'}}>
                                            {route.name}
                                        </Header.Subheader>
                                    </Header.Content>
                                </Header>
                                <Divider/>
                            </div>
                            <div className={'filters'}>
                                <EventsManagerList onChangeEvents={(events) => this.onSetEvents(events)}/>
                            </div>
                        </Grid.Column>
                        <Grid.Column className={'h-100'}>
                            <Menu className={'mb-0 no-border'}>
                                <Menu.Item className={'pl-0'}>
                                    <Header as={'h3'}>
                                        <Header.Content>
                                            Segunda-Feira - 15 de Abril de 2019
                                            <Header.Subheader style={{marginTop: '.3rem'}}>
                                                Leandro Martins de Melo
                                                <Dropdown
                                                    trigger={
                                                        <Icomoon
                                                            className={'ml-1 mr-0'}
                                                            name={'clock link'}
                                                        />
                                                    }
                                                >
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item text={'New'}/>
                                                        <Dropdown.Item text={'Open...'}/>
                                                        <Dropdown.Item text={'Save as...'}/>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <Label
                                                    basic
                                                    size={'mini'}
                                                    className={'ml-1'}
                                                    content={'Ordenação: Livre'}
                                                />
                                            </Header.Subheader>
                                        </Header.Content>
                                    </Header>
                                </Menu.Item>
                                {
                                    activated &&
                                    <Menu.Menu position={'right'}>
                                        <Menu.Item>
                                            <Header as={'h3'} textAlign={'center'}>
                                                <Header.Content>
                                                    12%
                                                    <Header.Subheader>
                                                        Taxa de Ocupação
                                                    </Header.Subheader>
                                                </Header.Content>
                                            </Header>
                                        </Menu.Item>
                                    </Menu.Menu>
                                }
                            </Menu>
                            <Divider className={'mt-0'}/>
                            <AssociatedServicePointsList ref={this.associatedServicePointsList}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        );
    }
}

export default RouteEventsAdd;
