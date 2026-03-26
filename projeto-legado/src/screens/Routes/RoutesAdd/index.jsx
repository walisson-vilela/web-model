import { find, isFunction, isObject, isUndefined } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change, Field, formValueSelector, reduxForm } from 'redux-form';
import { Form } from 'semantic-ui-react';

import { isDate, isDateGreater, isDateLess, required } from '../../../utils/Validate';

import { Input, InputDate, InputSearch, InputSelect } from '../../../components';

import AppTypesConstants from '../../../constants/AppTypesConstants';
import { findPeoples } from '../../../redux/actions/PeoplesActions';
import { postRoutes } from '../../../redux/actions/RoutesActions';
import { findZones } from '../../../redux/actions/ZonesActions';
import { toInternalDate } from '../../../utils/DateTime';

import { Content, GroupButton } from './style';

const types = [
    {key: 0, value: '1', text: 'Fixa'},
    {key: 1, value: '2', text: 'Temporária'}
];

class RoutesAdd extends Component {

    state = {
        zones: [],
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {create_without_people, isSelectedPeople: oldPeople} = prevProps;
        const {isSelectedPeople: newPeople} = this.props;
        if (create_without_people || !oldPeople && !newPeople) {
            return;
        }

        if (newPeople !== oldPeople) {
            if (newPeople) {
                this.handleFindZone(newPeople);
            } else {
                this.setState({...this.state, zones: []})
            }
        }
    }

    /**
     * Realiza o envio do formulário para o servidor API.
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {

        const {submitting, onSuccess, history, forms, postRoutes, route_start} = this.props;
        if (submitting) {
            return;
        }

        const values = {...forms.values, zone_id: 0};

        if (parseInt(values.type) === 1) {
            !isUndefined(values.start) && delete values.start;
            !isUndefined(values.end) && delete values.end;
        } else {
            values.start = toInternalDate(values.start);
            values.end = toInternalDate(values.end);
        }

        values.versions[0].route_start = route_start;
        values.versions[0].route_end = route_start;

        try {
            const route = await postRoutes(values);
            if (isFunction(onSuccess)) {
                await onSuccess();
            }

            if (isObject(history)) {
                await history.push(`/main/routes/home/${route.data.id}/versions/${route.data.version_id}`);
            }

        } catch (e) {
            await console.error(e)
        }
    };

    /**
     * Busca pessoas na API de acordo com o grupo selecionado.
     *
     * @param people_id
     * @param q
     * @returns {Promise<void>}
     */
    handleFindZone = async (people_id = undefined, q = undefined) => {
        const {single_route_by_zone: without_route, routeType, findZones, dispatch} = this.props;

        let filters = {"no-paginate": 1, "with_path": true, "mirror": 0};

        if (routeType === 1) {
            filters = {...filters, without_route}
        }

        if (people_id) {
            filters.people_id = people_id;
        }

        if (q) {
            filters.q = q;

            return findZones(filters);
        }

        try {
            const res = await findZones(filters);
            if (res.success) {
                const zones = res.data.map(o => ({
                    key: o.id,
                    value: o.id,
                    text: o.name,
                    description: o.description,
                }));

                if (zones.length === 1) {
                    await dispatch(change('RoutesAdd', 'zone_id', zones[0]['value']));
                }

                this.setState({...this.state, zones});
            }
        } catch (e) {
            console.error(e);
        }
    };

    /**
     * Busca pessoas na API de acordo com o grupo selecionado.
     *
     * @param q
     * @returns {Promise<void>}
     */
    handleFindPeople = async (q) => {
        const {only_hierarchy, without_hierarchy, forms, findPeoples} = this.props;
        const {type} = forms.values;

        let filters = {"without_route": 1, "route_type": type, "contain": "Users"};
        if (parseInt(type) === 2) {
            filters.without_route = 0;
        }

        if (only_hierarchy) {
            filters.only_hierarchy = 1;
        } else if (without_hierarchy) {
            filters.without_hierarchy = 1;
            filters.combine = 1;
        }

        filters.q = q;

        return findPeoples(filters);
    };

    handleClearPeopleID = async () => {
        const {dispatch} = this.props;
        await dispatch(change('RoutesAdd', 'zone_id', null));
        await dispatch(change('RoutesAdd', 'versions[0].people_id', null));
        await dispatch(change('RoutesAdd', 'versions[0].people', null));
    };

    handleClearZoneId = async () => {
        const {dispatch} = this.props;
        await dispatch(change('RoutesAdd', 'zone_id', null));
    };

    render() {
        const {submitting, valid, forms, routeType, isSelectedPeople, isSelectedZone} = this.props;
        const formFields = forms ? forms.values : {};

        let disabled = false;
        if (submitting || !valid) {
            disabled = true;
        }

        let {create_without_people, create_without_zone} = this.props;
        let hierarchy_show;
        if (create_without_people) {
            hierarchy_show = "search";
        } else {
            hierarchy_show = "select";
        }

        if (routeType === 2) {
            if (create_without_people && create_without_zone) {
                hierarchy_show = "hide";
                create_without_people = false;
            }
        }

        return (
            <Content>
                <Form onSubmit={() => this.handleSubmit()} loading={submitting}>
                    <Form.Group>
                        <Field
                            label='Tipo da rota'
                            name='type'
                            component={InputSelect}
                            options={types}
                            width={5}
                            validate={[required]}
                            required={true}
                            onChange={() => {
                                this.handleClearPeopleID();
                            }}
                        />
                        <Field
                            autoFocus={true}
                            label='Nome da rota'
                            name='name'
                            component={Input}
                            type='text'
                            validate={[required]}
                            required={true}
                            width={11}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Field
                            label='Executor da rota'
                            name='versions[0].people'
                            component={InputSearch}
                            getResults={({q}) => this.handleFindPeople(q)}
                            selected={!!isSelectedPeople}
                            validate={create_without_people ? [] : [required]}
                            onClear={() => this.handleClearPeopleID()}
                            required={!create_without_people}
                            width={16}
                        />
                        {/*{*/}
                        {/*    hierarchy_show === "search" && <Field*/}
                        {/*        className={"with_path cut"}*/}
                        {/*        label='Posição na hierarquia'*/}
                        {/*        name='zone'*/}
                        {/*        component={InputSearch}*/}
                        {/*        getResults={({q}) => this.handleFindZone(undefined, q)}*/}
                        {/*        selected={!!isSelectedZone}*/}
                        {/*        validate={[required]}*/}
                        {/*        onClear={() => this.handleClearZoneId()}*/}
                        {/*        required={true}*/}
                        {/*        width={8}*/}
                        {/*    />*/}
                        {/*}*/}
                        {/*{*/}
                        {/*    hierarchy_show === "select" && <Field*/}
                        {/*        label='Posição na hierarquia'*/}
                        {/*        name='zone_id'*/}
                        {/*        component={InputSelect}*/}
                        {/*        options={this.state.zones}*/}
                        {/*        validate={[required]}*/}
                        {/*        required={true}*/}
                        {/*        width={8}*/}
                        {/*        className={"with_path"}*/}
                        {/*    />*/}
                        {/*}*/}
                    </Form.Group>
                    {
                      routeType === 2 && <Form.Group>
                        <Field
                          label='Início'
                          name='start'
                          component={InputDate}
                          type='text'
                          validate={[required, isDate, isDateLess]} maxDate={formFields.end}
                          required={true}
                          width={6}
                        />
                        <Field
                          label='Término'
                          name='end'
                          component={InputDate}
                          type='text'
                          validate={[required, isDate, isDateGreater]} minDate={formFields.end}
                          required={true}
                          width={6}
                        />
                      </Form.Group>
                    }
                    <Form.Group>
                        <Field
                            label={'Ordem de execução de visita livre?'}
                            name={'versions[0].order_visit'}
                            component={InputSelect}
                            clearable={false}
                            options={AppTypesConstants.YES_OR_NO}
                            width={16}
                        />
                    </Form.Group>

                    <GroupButton>
                        <Form.Button onClick={() => this.props.onCancel()}>Fechar</Form.Button>
                        <Form.Button
                            basic
                            color={'teal'}
                            disabled={disabled}
                            content={'Salvar'}
                        />
                    </GroupButton>
                </Form>
            </Content>
        )
    }
}

RoutesAdd.propTypes = {
    history: PropTypes.object,
    onCancel: PropTypes.func.isRequired,
    zone: PropTypes.string,
    zone_id: PropTypes.number,
    disable_zone: PropTypes.bool,
    onSuccess: PropTypes.func
};

RoutesAdd.defaultProps = {
    onCancel: () => undefined,
    onSuccess: () => undefined,
    zone: null,
    zone_id: null,
    disable_zone: false
};

RoutesAdd = reduxForm({form: 'RoutesAdd', enableReinitialize: true,})(RoutesAdd);

const selector = formValueSelector('RoutesAdd');

RoutesAdd = connect(
    state => {
        return {
            routeType: parseInt(selector(state, 'type')),
            isSelectedPeople: selector(state, 'versions[0].people_id'),
            isSelectedZone: selector(state, 'zone_id'),
        }
    }
)(RoutesAdd);

const mapStateToProps = (state, ownProps) => {
    const {RoutesAdd} = state.form;

    const params = state.Users.content.result.data.user.contractor.params;

    const without_hierarchy = find(params, {"key": "without_hierarchy"}, 0) || {value: 0};
    const route_zone = find(params, {"key": "route_zone"}, 0) || {value: 0};
    const single_route_by_zone = find(params, {"key": "single_route_by_zone"}, 0) || {value: 0};
    const create_without_people = find(params, {"key": "create_without_people"}, 0) || {value: 0};
    const create_without_zone = find(params, {"key": "create_without_zone"}, 0) || {value: 0};
    const route_start = find(params, {"key": "route_start"}, 0) || {value: 0};
    const only_hierarchy = find(params, {"key": "only_hierarchy"}, 0) || {value: 0};

    return {
        single_route_by_zone: single_route_by_zone.value,
        without_hierarchy: parseInt(without_hierarchy.value) > 0,
        route_zone: route_zone.value,
        create_without_people: parseInt(create_without_people.value) > 0,
        create_without_zone: parseInt(create_without_zone.value) > 0,
        only_hierarchy: parseInt(only_hierarchy.value) > 0,
        route_start: parseInt(route_start.value),
        forms: RoutesAdd,
        _validDateLessOrGreater: {
            start: 'end',
            end: 'start',
        },
        initialValues: {
            type: '1',
            zone_id: null,
            route_window_id: ownProps.window || null,
            proposed_by: ownProps.proposed || null,
            approved_by: ownProps.approved || null,
            time_control: 1,
            versions: [{
                subcontractor: 0,
                cost_control: 1,
                order_visit: 1,
                cost_pay: 0,
                people_id: null,
            }]
        }
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({findPeoples, findZones, postRoutes}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(RoutesAdd);
