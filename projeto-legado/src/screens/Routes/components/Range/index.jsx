import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputRange from 'react-input-range';
import {Grid, Form, Input, Button} from 'semantic-ui-react';

import './index.css';
import 'react-input-range/lib/css/index.css';

export default class Range extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            value: {
                min: 0,
                max: 0
            },
            rangeMin: 0,
            rangeMax: 0
        });
    }

    componentWillMount() {
        const {rangeMin, rangeMax} = this.props;
        const start = Math.round((rangeMax * 10) / 100);

        this.setState({
            value: {
                min: rangeMin,
                max: start
            },
            rangeMin,
            rangeMax
        });
    }

    onChangeRange = (field, res) => {
        const {value, rangeMin, rangeMax} = this.state;

        if ((field === 'min' && parseInt(res) > value.max) || parseInt(res) < rangeMin)
            return false;

        if ((field === 'max' && parseInt(res) < value.min) || parseInt(res) > rangeMax)
            return false;

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
        const {value, rangeMin, rangeMax} = this.state;
        return (
            <div
                className={'rangeFilters'}
            >
                <Grid.Row>
                    <Grid.Column>
                        <InputRange
                            maxValue={rangeMax}
                            minValue={rangeMin}
                            value={value}
                            onChange={
                                value => this.setState({value})
                            }
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Form>
                        <Form.Group inline>
                            <Form.Field>
                                <Input
                                    key={'inputMin'}
                                    placeholder={'Mínimo'}
                                    type={'number'}
                                    className={'rangeInput'}
                                    min={rangeMin}
                                    max={value.max}
                                    value={value.min}
                                    onChange={
                                        (event, result) => this.onChangeRange('min', result.value)
                                    }
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>até</label>
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    key={'inputMax'}
                                    placeholder={'Máximo'}
                                    type={'number'}
                                    className={'rangeInput'}
                                    min={value.min}
                                    max={rangeMax}
                                    value={value.max}
                                    onChange={
                                        (event, result) => this.onChangeRange('max', result.value)
                                    }
                                />
                            </Form.Field>
                        </Form.Group>
                    </Form>
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
    rangeMin: PropTypes.number,
    rangeMax: PropTypes.number
};

Range.defaultProps = {
    onGetValue: () => {
    },
    rangeMin: 0,
    rangeMax: 0
};