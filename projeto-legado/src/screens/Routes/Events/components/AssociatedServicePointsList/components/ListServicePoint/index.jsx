import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Header, Grid, Divider} from 'semantic-ui-react';
import {Icomoon, InputTime} from '../../../../../../../components';
import './index.css';

const start = {
    meta: {
        error: false,
        invalid: false,
        touched: false
    },
    input: {
        name: 'start',
        value: '00:00',
        onChange: (e) => console.log('onChange START', e),
        onBlur: (v) => console.log('onBlur START',v)
    }
};
const end = {
    meta: {
        error: false,
        invalid: false,
        touched: false
    },
    input: {
        name: 'end',
        value: '23:59',
        onChange: (e) => console.log('onChange END', e)
    }
};

class ListServicePoint extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Grid className={'events-added'}>
                <Grid.Row columns={3} verticalAlign={'middle'} textAlign={'center'}>
                    <Grid.Column width={10} textAlign={'left'}>
                        <Header as={'h5'}>
                            <Header.Content>
                                {this.props.title}
                                <Header.Subheader>
                                    {this.props.adrress}
                                    {
                                        (this.props.giv || this.props.code) &&
                                        <span style={{display: 'block'}}>ID GIV: {this.props.giv} | Código Interno: {this.props.code}</span>
                                    }
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                        <Divider/>
                        <small>
                            <span style={{marginRight: '.5rem'}}><Icomoon name={'car link'}/></span>
                            8,3km | 01:30 + 30min | Total: 2:00
                            <span style={{marginLeft: '.5rem'}}><Icomoon name={'edit1 link'}/></span>
                        </small>
                    </Grid.Column>
                    <Grid.Column width={5}>
                        <InputTime {...start} />
                        <InputTime {...end} />
                    </Grid.Column>
                    <Grid.Column width={1}>
                        <Icomoon name={'more-vertical link'}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

ListServicePoint.propTypes = {
    title: PropTypes.string,
    adrress: PropTypes.string,
    giv: PropTypes.number,
    code: PropTypes.number
};

ListServicePoint.defaultProps = {
    title: '',
    adrress: '',
    giv: '00',
    code: '0'
};

export default ListServicePoint;