import { find, isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

import { Input, InputSelect } from '../../../../../components';
import { required } from '../../../../../utils/Validate';
import { GroupButton } from './style';

import AppTypesConstants from '../../../../../constants/AppTypesConstants';
import { changeParamsRoutes } from '../../../../../redux/actions/RoutesActions';

class AlterParams extends Component {

    state = {
        isLoading: false
    };

    handleSubmit = route => {
        const {changeParamsRoutes, forms} = this.props;
        const {name, version} = forms.values;

        this.setState({isLoading: true});

        changeParamsRoutes(route, {
            name,
            version
        }).then(() => {
            this.setState({isLoading: false});
            this.props.onRefresh();
            this.props.onCancel();
        }).catch(() => {
            this.setState({isLoading: false})
        });
    };

    render() {
        const {route, people} = this.props.route;
        const {pristine, submitting, valid, published, route_start} = this.props;
        const {isLoading} = this.state;

        return (
            <React.Fragment>
                <Form onSubmit={() => this.handleSubmit(route.id)} loading={isLoading}>
                    <Field
                        label={'Nome da rota'}
                        name={'name'}
                        component={Input}
                        type={'text'}
                        validate={[required]}
                        required
                    />
                    {
                        !published &&
                        <React.Fragment>
                            <Field
                                label={'Ordem de execução das visitas'}
                                name={'version.order_visit'}
                                component={InputSelect}
                                clearable={false}
                                options={AppTypesConstants.YES_OR_NO}
                            />
                            <Field
                                label={'Controle de ajuda de custo'}
                                name={'version.cost_control'}
                                component={InputSelect}
                                clearable={false}
                                options={AppTypesConstants.YES_OR_NO}
                            />
                            <Field
                                label={'Ponto de partida'}
                                name={'version.route_start'}
                                component={InputSelect}
                                clearable={false}
                                options={AppTypesConstants.HOME_OR_WORK}
                            />
                        </React.Fragment>
                    }

                    <GroupButton>
                        <Form.Button
                            onClick={() => this.props.onCancel()}
                            className={'fechar'}
                            content={'Fechar'}
                        />
                        <Form.Button
                            basic
                            color={'teal'}
                            disabled={pristine || submitting || !valid}
                            content={'Salvar'}
                        />
                    </GroupButton>
                </Form>
            </React.Fragment>
        )
    }
}

AlterParams.propTypes = {
    onCancel: PropTypes.func,
    route: PropTypes.object,
    onRefresh: PropTypes.func,
    subcontractor: PropTypes.bool,
    published: PropTypes.bool,
    version: PropTypes.string
};

AlterParams.defaultProps = {
    onCancel: (() => {
    }),
    route: {},
    onRefresh: (() => {
    }),
    subcontractor: false,
    published: false,
    version: '0'
};

AlterParams = reduxForm({
    form: 'AlterParams', enableReinitialize: true
})(AlterParams);

const mapStateToProps = (state, ownProps) => {

    const params = state.Users.content.result.data.user.contractor.params;

    let route_start = find(params, {key: 'route_start'});
    route_start = isUndefined(route_start) ? 0 : parseInt(route_start.value);

    return {
        forms: state.form.AlterParams,
        route_start,
        initialValues: {
            name: ownProps.route && ownProps.route.route.name,
            version: {
                id: parseInt(ownProps.version),
                subcontractor: (ownProps.route && ownProps.route.subcontractor) ? 1 : 0,
                cost_control: (ownProps.route && ownProps.route.cost_control) ? 1 : 0,
                order_visit: (ownProps.route && ownProps.route.order_visit) ? 1 : 0,
                route_start: ownProps.route && (ownProps.route.route_start || 0)
            }
        }
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({changeParamsRoutes}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(AlterParams);
