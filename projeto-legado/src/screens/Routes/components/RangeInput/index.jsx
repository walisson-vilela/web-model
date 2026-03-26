import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Grid, Form, Input, Button} from 'semantic-ui-react';

import './index.css';

export default class Range extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            value: {
                min: 0,
                max: 0
            }
        });
    }

    onChangeRange = (field, res) => {
        this.setState((prevState) => {
            return {
                value: {
                    ...prevState.value,
                    [field]: parseInt(res)
                }
            }
        });
    };

    render() {
        const {value} = this.state;
        const {titleMin, placeholderMin, titleMax, placeholderMax} = this.props;
        return (
            <div
                className={'rangeFilters'}
            >
                <Grid.Row>
                    <Grid.Column>
                        <Form.Field>
                            <label>{titleMin}</label>
                            <Input
                                key={'inputMin'}
                                placeholder={placeholderMin}
                                type={'number'}
                                min={0}
                                value={value.min}
                                onChange={
                                    (event, result) => this.onChangeRange('min', result.value)
                                }
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Form.Field>
                            <label>{titleMax}</label>
                            <Input
                                key={'inputMax'}
                                placeholder={placeholderMax}
                                type={'number'}
                                min={0}
                                value={value.max}
                                onChange={
                                    (event, result) => this.onChangeRange('max', result.value)
                                }
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Button
                        color={'blue'}
                        content={'Aplicar'}
                        onClick={
                            () => this.props.onGetValue(value)
                        }
                    />
                </Grid.Row>
            </div>
        );
    }
}

Range.Proptype = {
    onGetValue: PropTypes.func,
    titleMin: PropTypes.string,
    placeholderMin: PropTypes.string,
    titleMax: PropTypes.string,
    placeholderMax: PropTypes.string
};

Range.defaultProps = {
    onGetValue: () => {
    },
    titleMin: '',
    placeholderMin: '',
    titleMax: '',
    placeholderMax: ''
};