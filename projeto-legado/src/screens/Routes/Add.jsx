import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

import { Input, InputDate, InputSearch, InputSelect, ModalForm } from '../../components';
import AppTypesConstants from '../../constants/AppTypesConstants';

import { findPeoples } from '../../redux/actions/PeoplesActions';
import { postRoutes } from '../../redux/actions/RoutesActions';
import { isDate, isDateGreater, isDateLess, required } from '../../utils/Validate';

import moment from "moment";

const localeDate = () => moment.localeData().longDateFormat('L');

const types = [{
    key: 't1',
    value: '1',
    text: 'Fixa'
}, {
    key: 't2',
    value: '2',
    text: 'Temporária'
}];

class RoutesAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        let values = {...this.props.forms.values};
        delete values.versions[0].people;

        if (values.type === "2")
        {
            values.start = moment(values.start, localeDate()).format(moment.HTML5_FMT.DATE);
            values.end = moment(values.end, localeDate()).format(moment.HTML5_FMT.DATE);
        }

        this.setState({
            isLoading: true
        });

        this.props
            .postRoutes(values)
            .then(({data}) => {
                this.props.history.push(`/main/routes/home/${data.id}/versions/${data.versions[0].id}`);
            })
            .catch(error => {
                this.setState({isLoading: false, error});
            });
    };

    render() {
        const {isLoading} = this.state;
        const {routeType, forms, isSelectedPeople} = this.props;
        const formFields = forms ? forms.values : {};

        return (
            <ModalForm
                action={'Adicionar'}
                header={'Rota'}
                //subheader={'Texto de ajuda para novo rota, para que serve...'}
                handleSubmit={this.handleSubmit}
                form={'RoutesAdd'}
                props={this.props}
                isLoading={isLoading}
                image={'/assets/images/pin.svg'}
            >
                <Form.Group>
                    <Field
                        label='Tipo da rota'
                        name='type'
                        component={InputSelect}
                        clearable={false}
                        options={types}
                        width={'four'}
                    />
                    <Field
                        label='Nome da rota'
                        name='name'
                        component={Input}
                        type='text'
                        validate={[required]}
                        required
                        width={'twelve'}
                    />
                </Form.Group>
                <Form.Group widths={'equal'}>
                    <Field
                        label='Grupo / Zoneamento'
                        name='versions[0].group_id'
                        component={Input}
                    />
                    <Field
                        label='Trabalhar com multicontas'
                        name='versions[0].subcontractor'
                        component={InputSelect}
                        clearable={false}
                        options={AppTypesConstants.YES_OR_NO}
                    />
                    <Field
                        label='Controlar ajuda de custo'
                        name='versions[0].cost_control'
                        component={InputSelect}
                        clearable={false}
                        options={AppTypesConstants.YES_OR_NO}
                    />
                </Form.Group>
                <Form.Group>
                    <Field
                        name='versions[0].people_id'
                        component={'input'}
                        type={'hidden'}
                        validate={routeType === '1' ? [] : [required]}
                    />
                    <Field
                        label='Executor da rota'
                        name='versions[0].people'
                        component={InputSearch}
                        getResults={this.props.findPeoples}
                        selected={!!isSelectedPeople}
                        validate={routeType === '1' ? [] : [required]}
                        required={routeType === '2'}
                        width={'eight'}
                    />
                    <React.Fragment>
                        <Field
                            label='Início'
                            name='start'
                            component={InputDate}
                            type='text'
                            validate={routeType === '1' ? [] : [required, isDate, isDateLess]}
                            maxDate={formFields.end}
                            width={'four'}
                            required={routeType === '2'}
                            disabled={routeType === '1'}
                        />
                        <Field
                            label='Término'
                            name='end'
                            component={InputDate}
                            type='text'
                            validate={routeType === '1' ? [] : [required, isDate, isDateGreater]}
                            minDate={formFields.end}
                            width={'four'}
                            required={routeType === '2'}
                            disabled={routeType === '1'}
                        />
                    </React.Fragment>
                </Form.Group>
            </ModalForm>
        );
    }
}

RoutesAdd = reduxForm({
    form: 'RoutesAdd',
    enableReinitialize: true,
})(RoutesAdd);

const selector = formValueSelector('RoutesAdd');
RoutesAdd = connect(
    state => {
        return {
            routeType: selector(state, 'type'),
            isSelectedPeople: selector(state, 'versions[0].people_id')
        }
    }
)(RoutesAdd);

const mapStateToProps = (state, ownProps) => {
    return {
        forms: state.form.RoutesAdd,
        _validDateLessOrGreater: {
            start: 'end',
            end: 'start',
        },
        initialValues: {
            type: '1',
            versions: [{
                subcontractor: 0,
                cost_control: 0,
                people_id: null
            }]
        },
    };
};

const mapDispatchToProps = dispatch => {
    return {
        postRoutes: (content, props) => {
            return dispatch(postRoutes(content, props));
        },
        findPeoples: (params) => {
            return dispatch(findPeoples(params));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RoutesAdd);
