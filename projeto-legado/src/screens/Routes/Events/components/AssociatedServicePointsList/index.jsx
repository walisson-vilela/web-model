import React, {Component} from 'react';
import {Button, Container, List} from 'semantic-ui-react';

import DropdownService from '../DropdownService';
import ListServicePoint from './components/ListServicePoint';

import {Empty} from '../../../../../components';

import './index.css';

class AssociatedServicePointsList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: []
        };
    }

    onSetStores = (stores) => this.setState({stores});

    onClearStores = () => this.setState({stores: []});

    onRenderBody = () => {
        const {stores} = this.state;

        return (
            stores.map((store, index) => {
                return (
                    <List.Item key={index}>
                        <ListServicePoint
                            title={store.name}
                            adrress={store.formatted_address}
                            giv={parseInt(store.id)}
                            code={parseInt(store.code)}
                        />
                    </List.Item>
                )
            })
        )
    };

    render() {
        const {stores} = this.state;

        if (stores.length === 0)
        {
            return (
                <div className={'empty-events-stores'}>
                    <Empty title={'Nenhum evento adicionado!'} description={'Utilize o menu ao lado para pesquisar e adicionar eventos a sua agenda.'} image={''}/>
                </div>
            )
        } else
        {
            return (
                <div className={'point-list'}>
                    <DropdownService
                        AssociatedServicePoints={stores.length}
                        onClearStores={() => this.onClearStores()}
                    />

                    <List className={'associated-service-point-list'}>
                        {this.onRenderBody()}
                    </List>

                    <Container>
                        <Button size={'tiny'} floated={'right'} color={'facebook'}>SALVAR</Button>
                        <Button size={'tiny'} floated={'right'} className={'bg-transparent text-underline'}>CANCELAR</Button>
                        <div style={{clear: 'both'}}/>
                    </Container>
                </div>
            )
        }
    }
}

export default AssociatedServicePointsList;
