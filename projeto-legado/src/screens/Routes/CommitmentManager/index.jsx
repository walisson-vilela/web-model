import JWTDecode from 'jwt-decode';
import { findIndex, isEmpty, isNull, isObject } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { Component, createRef, Fragment } from 'react';
import { Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { change, Field, reduxForm } from 'redux-form';
import { Dimmer, Form, Loader, Tab } from 'semantic-ui-react';
import { dateGet } from '../../../utils/DateTime';
import { isTime, isTimeGreater, isTimeLess, required } from '../../../utils/Validate';

import { Icomoon, InputDate, InputTime } from '../../../components';
import { STORAGE } from '../../../constants/AppTypesConstants';
import { putRouteEvents } from '../../../redux/actions/RoutesVersionEventsActions';
import { getJourney } from '../../../redux/actions/UsersActions';
import { DropdownZone, InformationPerson } from '../components';
import { BillingData, ManageSubcontractors, ViewCalendar } from './components';
import { Container, Content, GroupInput, Heading } from './style';

const calendarRef = createRef();
const cookies = new Cookies();

class CommitmentManager extends Component {
    state = {
        loading: false,
        journey: {},
        workday: {},
        temp: {}
    };

    /**
     * componentDidMount
     */
    componentDidMount() {
        const {route, event} = this.props;
        const componentDidMount = async () => {
            await this.handleWorkday(route.people.id, moment(event.start));
        };

        // noinspection JSIgnoredPromiseFromCall
        componentDidMount();
    }

    /**
     * Busca dados da jornada de trabalho do usuário na API.
     *
     * @param user
     * @param day
     * @returns {Promise<void>}
     */
    handleWorkday = async (user, day = null) => {
        await this.setState({loading: true});

        try {
            const workday = await this.props.getJourney(user);
            await this.setState({
                workday: workday.data,
                loading: false
            });

            if (!isNull(day)) {
                await this.handleSetJourney(day)
            }
        } catch (e) {
            await this.setState({loading: false});
            console.error(e);
        }
    };

    /**
     * Seta dados de jornada de trabalho no state local.
     *
     * @param day
     * @returns {Promise<void>}
     */
    handleSetJourney = async (day) => {
        const {sun, mon, tue, wed, thu, fri, sat} = this.state.workday;

        switch (day.format('ddd')) {
            case 'Dom':
                await this.setState({journey: sun.journey});
                break;
            case 'Seg':
                await this.setState({journey: mon.journey});
                break;
            case 'Ter':
                await this.setState({journey: tue.journey});
                break;
            case 'Qua':
                await this.setState({journey: wed.journey});
                break;
            case 'Qui':
                await this.setState({journey: thu.journey});
                break;
            case 'Sex':
                await this.setState({journey: fri.journey});
                break;
            case 'Sab':
            default:
                await this.setState({journey: sat.journey});
                break;
        }
    };

    /**
     * Altera valor de temp.
     *
     * @param temp
     * @returns {Promise<void>}
     */
    changeTemp = async (temp = {}) => {
        await this.setState({temp});
    };

    /**
     * Envia formulário
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        const {forms, route, event} = this.props;
        const {values} = forms;
        const date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD');

        const change = {
            start: `${date} ${values.start}:00`,
            end: `${date} ${values.end}:00`,
            all_day: values.all_day,
        };

        await this.setState({loading: true});

        try {
            await this.props.putRouteEvents(route.route_id, event.event_id, change);
            await this.setState({loading: false});
        } catch (e) {
            await this.setState({loading: false});
            console.error(e);
        }
    };

    /**
     * change contractors
     *
     * @param params
     * @returns {Promise<void>}
     */
    handleChangeContracts = async (params) => {
        const {route, event} = this.props;
        const defParams = {
            start: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
            ...params
        };

        await this.setState({loading: true});

        try {
            await this.props.putRouteEvents(route.route_id, event.event_id, defParams);
        } catch (e) {
            await console.error(e)
        } finally {
            await this.setState({loading: false});
        }
    };

    /**
     * Altera data do calendário.
     *
     * @param select
     * @param digit
     * @returns {Promise<void>}
     */
    handleChangeDateField = async (select, digit) => {
        const value = isObject(select) ? digit : select;

        await this.props.dispatch(change('CommitmentManager', 'date', value));

        if (moment(value, 'DD/MM/YYYY').isValid() && value.length === 10) {
            const {values} = this.props.forms;
            const start = moment(`${value} ${values.start}`, 'DD/MM/YYYY HH:mm').utc();
            const end = moment(`${value} ${values.end}`, 'DD/MM/YYYY HH:mm').utc();

            let temp = {...this.props.event};
            temp.start = start.toDate();
            temp.end = end.toDate();

            await this.handleSetJourney(moment(value, 'DD/MM/YYYY'));
            await this.setState({temp});

            if (!isNull(calendarRef.current)) {
                await calendarRef.current.handleSetData(moment(value, 'DD/MM/YYYY').utc());
                await calendarRef.current.handleEvents();
            }
        }
    };

    /**
     * Toggle evento para o dia inteiro.
     *
     * @param full
     * @returns {Promise<void>}
     */
    handleFullDayEvent = async (full) => {
        const {journey} = this.state;
        const {event} = this.props;

        await this.props.dispatch(change('CommitmentManager', 'all_day', full));
        await this.props.dispatch(change('CommitmentManager', 'start', full ? journey.start : moment(event.start).format('HH:mm')));
        await this.props.dispatch(change('CommitmentManager', 'end', full ? journey.end : moment(event.end).format('HH:mm')));
    };

    render() {
        const {handleReturn, event, route, pristine, submitting, valid} = this.props;
        const {loading, temp} = this.state;
        const schedulePanes = [
            {
                menuItem: 'Visualizar Agenda', render: () => <Tab.Pane attached={false}>
                    <ViewCalendar
                        route_id={route.id}
                        event={event}
                        changeTemp={(temp) => this.changeTemp(temp)}
                        temp={temp}
                        handleSubmit={() => this.handleSubmit()}
                        disabled={Boolean(pristine || submitting || !valid)}
                        fullDay={(full) => this.handleFullDayEvent(full)}
                        ref={calendarRef}
                    />
                </Tab.Pane>
            },
            {
                menuItem: 'Gerênciar Multicontas', render: () => <Tab.Pane attached={false}>
                    <ManageSubcontractors onSubmit={(contractors) => this.handleChangeContracts(contractors)}/>
                </Tab.Pane>
            },
            {
                menuItem: 'Dados de Faturamento', render: () => <Tab.Pane attached={false}>
                    <BillingData store_id={event.id}/>
                </Tab.Pane>
            }
        ];
        const indexSchedule = findIndex(schedulePanes, (schedule) => schedule.menuItem === 'Gerênciar Multicontas');

        // remove tab "Gerênciar Multicontas" if type is different from group
        if (JWTDecode(cookies.get(STORAGE.USER).token).payload.type !== 'G') {
            schedulePanes.splice(indexSchedule, 1)
        }

        return (
            <Form style={{height: '100%', display: 'flex'}}>
                <Container>
                    <Dimmer inverted active={loading}>
                        <Loader inverted/>
                    </Dimmer>

                    <Heading>
                        <div>
                            <Icomoon name={'chevron-left link'} onClick={() => handleReturn()}/>
                            <DropdownZone
                                name={
                                    <Fragment>
                                        {event.id} - {event.title}
                                        <span>(Rota - {route.route.name})</span>
                                    </Fragment>
                                }
                                description={
                                    <Fragment>
                                        {event.formatted_address}
                                        {/*<span>Ver no mapa</span>*/}
                                    </Fragment>
                                }
                                maxWidth={'25rem'}
                            />
                        </div>
                        <GroupInput>
                            <Field
                                name={'date'}
                                component={InputDate}
                                type={'text'}
                                validate={[required]}
                                onChange={(select, value) => this.handleChangeDateField(select, value)}
                            />
                            <Field
                                name={'start'}
                                component={InputTime}
                                type={'text'}
                                maxTime={'end'}
                                validate={[required, isTime, isTimeLess]}
                            />
                            Até
                            <Field
                                name={'end'}
                                component={InputTime}
                                type={'text'}
                                minTime={'start'}
                                validate={[required, isTime, isTimeGreater]}
                            />
                        </GroupInput>
                        <InformationPerson
                            name={route.people.name}
                            func={!isEmpty(route.people.profiles) && route.people.profiles[0].name}
                            image={isNull(route.people.avatar) ? '' : route.people.avatar.avatar}
                        />
                    </Heading>

                    <Content>
                        <Tab
                            menu={{secondary: true, pointing: true}}
                            panes={schedulePanes}
                            style={{display: 'flex', flexDirection: 'column', flex: '1'}}
                        />
                    </Content>
                </Container>
            </Form>
        )
    }
}

CommitmentManager.propTypes = {
    handleReturn: PropTypes.func,
    event: PropTypes.object,
    route: PropTypes.object
};

CommitmentManager.defaultProps = {
    handleReturn: (() => {
    }),
    event: {},
    route: {}
};

CommitmentManager = reduxForm({
    form: 'CommitmentManager'
})(CommitmentManager);

const mapStateToProps = (state, ownProps) => {
    const {CommitmentManager} = state.form;

    return {
        forms: CommitmentManager,
        _validDateLessOrGreater: {
            start: 'end',
            end: 'start',
        },
        initialValues: {
            date: dateGet(ownProps.event.start, 'DD-MM-YYYY'),
            start: moment(ownProps.event.start).format('HH:mm'),
            end: moment(ownProps.event.end).format('HH:mm'),
            all_day: ownProps.event.allDay
        },
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    getJourney,
    putRouteEvents
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommitmentManager);
