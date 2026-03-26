import React, {Component} from 'react';
import {injectIntl} from 'react-intl';

import './index.css';
import {Dropdown, Header, Image, Input, Label, List, Menu, Segment} from "semantic-ui-react";
import {times} from 'lodash';
import faker from 'faker';
import {Icomoon} from "../../../components/Icomoon";

const options = [
    {key: 'Mercado', text: 'Mercado', value: 'Mercado'},
    {key: 'PDA', text: 'PDA', value: 'PDA'},
    {key: 'Regional', text: 'Regional', value: 'Regional'},
];

const source = times(10, () => ({
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar()
}));

class RoutesWallets extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <Header id={'walletsHeader'} as='h3'>
                        <Header.Content>
                            Carteira de Visitas
                            <Header.Subheader>1450 Associações</Header.Subheader>
                        </Header.Content>
                        <Icomoon
                            name={'plus'}
                            circular
                            link
                            onClick={
                                () => {
                                    alert('Adicionar!');
                                }
                            }
                        />
                    </Header>

                    <Input
                        fluid
                        placeholder='Search...'
                        className={'mb-4'}
                        label={<Dropdown defaultValue='PDA' options={options}/>}
                        labelPosition={'left'}
                        action={'Search'}
                    />
                </div>
                <Menu id={'walletsMenu'} attached={'top'} size={'mini'} widths={3}>
                    <Menu.Item link>
                        <Label horizontal circular color={'violet'}>M</Label> Mercado
                    </Menu.Item>
                    <Menu.Item link>
                        <Label horizontal circular color={'red'}>P</Label> PDA
                    </Menu.Item>
                    <Menu.Item link>
                        <Label horizontal circular color={'black'}>R</Label> Regional
                    </Menu.Item>
                </Menu>
                <Segment attached={'bottom'} className={'h-100'}>
                    <List divided relaxed={'very'} verticalAlign={'middle'}>
                        {
                            source.map((a, index) => {
                                return (
                                    <List.Item key={index}>
                                        <Image avatar src={a.image}/>
                                        <List.Content>
                                            <List.Header as='a'>{a.title}</List.Header>
                                            {a.description}
                                        </List.Content>
                                    </List.Item>

                                );
                            })
                        }
                    </List>
                </Segment>
            </React.Fragment>
        );
    }
}

export default injectIntl(RoutesWallets);