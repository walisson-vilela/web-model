import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Header, Grid} from 'semantic-ui-react';

import './route.css';

export default class Route extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    renderRows = () => {
        const {getItens} = this.props;

        return (
            getItens.map((row, index) => {
                return (
                    <Grid.Column key={index}>
                        <Header
                            as={'h3'}
                            className={'routeHeader'}
                            textAlign={'center'}
                            content={row.title}
                            subheader={row.description}
                        />
                    </Grid.Column>
                );
            })
        );
    };

    render() {
        const {getItens} = this.props;

        return (
            <Grid columns={getItens.length}>
                <Grid.Row>
                    {
                        this.renderRows()
                    }
                </Grid.Row>
            </Grid>
        );
    }
}

Route.propTypes = {
    getItens: PropTypes.array
};

Route.defaultProps = {
    getItens: []
};