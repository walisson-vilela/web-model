import { findIndex } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Checkbox, Dimmer, Loader } from 'semantic-ui-react';

import { Icomoon } from '../../../components';
import { dateDuration, dateGet } from '../../../utils/DateTime.js';
import EventsManager from '../EventsManager';
import { Container, FirstHovered, Heading, ItemHovered, Scroller, SortedOut } from './style';

import { fetchRouteEventsParents, getRouteConflicts } from '../../../redux/actions/RoutesVersionEventsActions';

class TimeConflicts extends Component {
    state = {
        isLoading: false,
        conflicts: [],
        events: {
            isLoading: false,
            data: []
        },
        checked: {},
        ocuupation: 0
    };

    componentDidMount() {
        this.setState({isLoading: true},
            () => this.props.getRouteConflicts(this.props.route_version_id).then(({data}) => this.setState({
                isLoading: false,
                conflicts: data
            }, () => {
                (data.length > 0) && this.handleCheckConflict(data[0])
            })).catch(() => this.setState({isLoading: false})))
    }

    handleCheckConflict = checked => {
        this.setState({
            checked,
            events: {
                isLoading: true, data: []
            }
        }, () => this.props.fetchRouteEventsParents(this.props.route_version_id, checked.date).then(({data}) => {

            const events = data.map(row => {
                const interval = {
                    type: row.type === 1 ? 'unique' : '',
                    every: 1,
                    days: [
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'sunday'),
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'monday'),
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'tuesday'),
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'wednesday'),
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'thursday'),
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'friday'),
                        (row.recurrent_params.days && row.recurrent_params.days[0] && row.recurrent_params.days[0] === 'saturday'),
                    ],
                    start: dateGet(row.start, 'YYYY-MM-DD'),
                    endBy: 'occorrs',
                    endEvents: 0,
                    endDate: '',
                    dates: []
                };

                return ({
                    id: row.id,
                    store_id: row.store_id,
                    store_code: row.store.code,
                    company_name: row.store.company_name,
                    name: row.store.name,
                    formated_adrress: row.store.formatted_address,
                    document: row.store.document,
                    start_time: dateGet(row.start, 'HH:mm'),
                    end_time: dateGet(row.end, 'HH:mm'),
                    duration: dateDuration(row.duration),
                    extra_time: dateDuration(row.time_trip_extra),
                    time_total: dateDuration(row.time_total),
                    distance: row.distance ? parseFloat((parseInt(row.distance) / 1000).toFixed(2)) : '0.0',
                    time_attendance_avg: row.store.time_attendance_avg,
                    zone_id: row.zone_id,
                    zone_name: 'ND',
                    _interval: interval,
                    interval: interval
                })
            });

            this.setState({
                events: {
                    isLoading: false,
                    data: events
                }
            })
        }).catch(() => this.setState({events: {isLoading: false, data: []}})))
    };

    handleOccupation = ocuupation => this.setState({ocuupation});

    handleCountResolve = () => {
        return this.state.conflicts.filter(row => (row.resolve === true)).length;
    };

    handleValidate = () => {
        let conflicts = this.state.conflicts;
        const index = findIndex(conflicts, check => (check.id === this.state.checked.id));

        conflicts[index].resolve = true;

        this.setState({conflicts});
    };

    render() {
        return (
            <Container>
                <div>
                    <Heading>
                        <div>
                            <Icomoon name={'chevron-left link'} onClick={() => this.props.handleReturn()}/>
                        </div>
                        <div>
                            <h3>Conflitos <span>({this.handleCountResolve()}/{this.state.conflicts.length})</span></h3>
                            <p>Clique para gerenciar conflitos</p>
                        </div>
                    </Heading>

                    <Scroller>
                        {
                            this.state.isLoading &&
                            <Dimmer active={this.state.isLoading} inverted>
                                <Loader inverted/>
                            </Dimmer>
                        }
                        {
                            this.state.conflicts.map((row, key) => (
                                <ItemHovered key={key} onClick={() => this.handleCheckConflict(row)}>
                                    <FirstHovered>
                                        <div>
                                            <Checkbox radio checked={this.state.checked.id === row.id}
                                                      onChange={() => this.handleCheckConflict(row)}/>
                                        </div>
                                        <div>
                                            <h5>{dateGet(row.date, `dddd (MM)`)}</h5>
                                            <p>{dateGet(row.date, 'DD/MM/YYYY')}</p>
                                        </div>
                                    </FirstHovered>
                                    {
                                        row.resolve &&
                                        <SortedOut>Resolvido</SortedOut>
                                    }
                                </ItemHovered>
                            ))
                        }
                    </Scroller>
                </div>
                <div style={{position: 'relative'}}>
                    <EventsManager
                        managed={false}
                        day={dateGet(this.state.checked.date)}
                        stores={this.state.events.data}
                        saveText={'SALVAR'}
                        startingPoint={false}
                        endPoint={false}
                        cancellButton={false}
                        handleSave={() => this.handleValidate()}
                        route_version_id={this.props.route_version_id}
                        markerStart={false}
                        route={this.props.route}
                    />

                    <Dimmer active={this.state.events.isLoading} inverted>
                        <Loader inverted/>
                    </Dimmer>
                </div>
            </Container>
        )
    }
}

TimeConflicts.propTypes = {
    handleReturn: PropTypes.func,
    route_version_id: PropTypes.string,
    route: PropTypes.object
};

TimeConflicts.defaultProps = {
    handleReturn: (() => {}),
    route: {}
};

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => bindActionCreators({getRouteConflicts, fetchRouteEventsParents}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TimeConflicts);
