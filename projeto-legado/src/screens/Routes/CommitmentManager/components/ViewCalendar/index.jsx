import { findIndex, isEmpty } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchRouteEvents } from '../../../../../redux/actions/RoutesVersionEventsActions';

import { Button, Checkbox, Dimmer, Dropdown, Loader } from 'semantic-ui-react';
import { Icomoon } from '../../../../../components';
import { Calendar, Container, FloatToogle, Footer, Header, HeaderCalendar } from './style';

class ViewCalendar extends Component {
    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            calendar: 'day',
            date: moment.utc(),
            localizer: BigCalendar.momentLocalizer(moment),
            events: [],
            period: {
                start: '',
                end: ''
            }
        };
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        const componentDidMount = async () => {
            await this.handleEvents();
        };

        componentDidMount().then();
    }

    /**
     * Altera visualização do calendário.
     *
     * @param calendar
     * @returns {Promise<void>}
     */
    handleChangeView = async (calendar) => {
        await this.setState({calendar});
        await this.handleEvents();
    };

    /**
     * Busca eventos na API.
     *
     * @param clearTemp
     * @returns {Promise<void>}
     */
    handleEvents = async (clearTemp = false) => {
        if (clearTemp) {
            await this.props.changeTemp();
        }

        const now = moment(this.state.date).utc();
        const temp = this.props.temp;

        let params = {};

        await this.setState({
            loading: true,
            events: []
        });

        switch (this.state.calendar) {
            case 'week':
                const week = now.weeks();
                const sunday = moment().week(week).day(0).format('YYYY-MM-DD');
                const saturday = moment().week(week).day(6).format('YYYY-MM-DD');

                await this.setState({
                    period: {
                        start: moment().week(week).day(0).format('DD/MM/YYYY'),
                        end: moment().week(week).day(6).format('DD/MM/YYYY')
                    }
                });

                params = {start: sunday, end: saturday};
                break;
            case 'day':
            default:
                params = {start: now.format('YYYY-MM-DD'), end: now.format('YYYY-MM-DD')};
                break;
        }

        try {
            const events = await this.props.fetchRouteEvents(this.props.route_id, params);
            let records = await events.data.map(({store, start, end, distance, time_total, time_trip}) => ({
                id: store.id,
                title: store.name,
                allDay: false,
                start: moment(start, 'YYYY-MM-DD HH:mm').utc().toDate(),
                end: moment(end, 'YYYY-MM-DD HH:mm').utc().toDate(),
                description: '',
                extra: '',
                distance,
                time_total,
                time_attendance_avg: store.time_attendance_avg,
                formatted_address: store.formatted_address,
                time_trip
            }));

            if (!isEmpty(temp)) {
                const index = await findIndex(records, (ev) => {
                    const event = this.props.event;
                    return Boolean(ev.id === event.id && moment(ev.start).isSame(moment(event.start)) && moment(ev.end).isSame(moment(event.end)))
                });

                if (index > -1) {
                    records.splice(index, 1);
                }

                records = [...records, temp];
            }

            await this.setState({
                loading: false,
                events: records,
                date: now
            });
        } catch (e) {
            await this.setState({
                loading: false,
                events: []
            });
            console.error(e);
        }
    };

    /**
     * Seta data atual no state local e busca eventos do dia.
     *
     * @returns {Promise<void>}
     */
    handleSetNow = async () => {
        await this.setState({
            date: moment.utc()
        });
        await this.handleEvents();
    };

    /**
     * Volta (dia/semana) no clanedário e busca eventos.
     * @returns {Promise<void>}
     */
    handlePreviousEvents = async () => {
        let now = moment(this.state.date).utc();

        switch (this.state.calendar) {
            case 'week':
                now.subtract(1, 'weeks');
                break;
            case 'day':
            default:
                now.subtract(1, 'days');
                break;
        }

        await this.setState({
            date: now
        });
        await this.handleEvents();
    };

    /**
     * Avança (dia/semana) no calendário e busca eventos.
     * @returns {Promise<void>}
     */
    handleNextEvents = async () => {
        let now = moment(this.state.date).utc();

        switch (this.state.calendar) {
            case 'week':
                now.add(1, 'weeks');
                break;
            case 'day':
            default:
                now.add(1, 'days');
                break;
        }

        await this.setState({
            date: now
        });
        await this.handleEvents();
    };

    /**
     * Altera date no state local.
     *
     * @param now
     * @returns {Promise<void>}
     */
    handleOnNavigate = async (now) => {
        const date = moment(now).utc();

        await this.setState({date});
        await this.handleEvents();
    };

    /**
     * Render Header Big Calendar.
     * @param props
     * @returns {*}
     */
    handleRenderHeader = (props) => {
        const label = props.label.split(' ');

        if (this.state.calendar === 'day') {
            return (<div/>)
        }

        return (
            <HeaderCalendar>
                <div>
                    <span>{label[1]}</span>
                    <span>{label[0]}</span>
                </div>
            </HeaderCalendar>
        )
    };

    /**
     * Render Event Big Calendar.
     * @param props
     */
    handleRenderEvent = (props) => {
        return (
            <div>
                <p>{props.title}</p>
            </div>
        )
    };

    /**
     * Executa callback e em caso de sucesso busca novos eventos.
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        await this.props.handleSubmit();
        await this.handleEvents(true);
    };

    /**
     * Seta informação no state local.
     *
     * @param date
     * @returns {Promise<void>}
     */
    handleSetData = async (date) => {
        await this.setState({date});
    };

    render() {
        const optionsView = [
            {key: 0, text: 'Dia', value: 'day'},
            {key: 1, text: 'Semana', value: 'week'}
        ];
        const date = this.state.date.toDate();
        const {disabled} = this.props;
        const {period} = this.state;

        return (
            <Container>
                <div>
                    <Dimmer inverted active={this.state.loading}>
                        <Loader inverted/>
                    </Dimmer>

                    <FloatToogle>
                        <p>Transformar em evento do dia inteiro</p>
                        <Checkbox
                            toggle
                            onChange={(e, {checked}) => this.props.fullDay(checked)}
                        />
                    </FloatToogle>

                    <Header>
                        <Dropdown
                            selection
                            options={optionsView}
                            defaultValue={optionsView[0].value}
                            onChange={(e, {value}) => this.handleChangeView(value)}
                        />
                        <div>
                            <Button onClick={() => this.handleSetNow()} type={'button'}>Hoje</Button>
                            <Button onClick={() => this.handlePreviousEvents()} type={'button'}>
                                <Icomoon name={'chevron-left'}/>
                            </Button>
                            <Button onClick={() => this.handleNextEvents()} type={'button'}>
                                <Icomoon name={'chevron-right'}/>
                            </Button>
                            {
                                this.state.calendar === 'day'
                                    ? <p>{this.state.date.format('dddd, DD \\d\\e MMMM \\d\\e YYYY')}</p>
                                    : <p>{period.start} ao {period.end}</p>
                            }
                        </div>
                    </Header>

                    <Calendar>
                        <BigCalendar
                            selectable
                            popup
                            view={this.state.calendar}
                            onView={() => {
                            }}
                            date={date}
                            localizer={this.state.localizer}
                            events={this.state.events}
                            onNavigate={this.handleOnNavigate}
                            toolbar={false}
                            messages={{undefined: total => `ver mais(${total})`}}
                            drilldownView={null}
                            components={
                                {
                                    header: this.handleRenderHeader,
                                    event: this.handleRenderEvent,
                                }
                            }
                        />
                    </Calendar>

                    <Footer>
                        <Button color={'green'} disabled={disabled} onClick={() => this.handleSubmit()}>Salvar</Button>
                    </Footer>
                </div>
            </Container>
        )
    }
}

ViewCalendar.propTypes = {
    route_id: PropTypes.number,
    changeTemp: PropTypes.func,
    temp: PropTypes.object,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    fullDay: PropTypes.func,
    event: PropTypes.shape({
        start: PropTypes.object,
        end: PropTypes.object,
        all_day: PropTypes.number
    })
};

ViewCalendar.defaultProps = {
    route_id: 0,
    changeTemp: (() => {
    }),
    temp: {},
    handleSubmit: (() => {
    }),
    disabled: true,
    fullDay: (() => {
    }),
    event: {
        start: {},
        end: {},
        all_day: 0
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchRouteEvents
}, dispatch);

export default connect(undefined, mapDispatchToProps, undefined, {forwardRef: true})(ViewCalendar);
