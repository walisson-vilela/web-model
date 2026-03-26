import { isNumber } from 'lodash';
import moment from 'moment';
import { Fragment, useContext, useMemo } from 'react';
import { Field } from 'redux-form';
import { Divider, Dropdown, Form, Header, Icon, List, Menu, Popup, Segment } from 'semantic-ui-react';

import { DropActions, Icomoon, InputTime } from '../../../components';

import { checkDuration, isTime, isTimeGreater, isTimeLess, required } from "../../../utils/Validate";

import { EventManagerContext } from "../EventManager";

import { dateGetMinutes, timeDiff, timePlusMinutes } from "../../../utils/DateTime";

import './associated.css';

export const AssociatedAttendance = props => {
    const {
        day,
        logged,
        deleteEventsAfterJourney,
        optimizeRouteEvents,
        time_journey,
        formValues,
        route_start
    } = props;

    const {
        people,
        default_mode,
        default_frequency,
        isGroup,
        refModalRepeat,
        refModalMulticontas,
        setItem
    } = useContext(EventManagerContext);

    const optimize_rules = useMemo(() => {
        let events = formValues.events || [];

        let coordinates = events.filter(o => isNumber(o.lat)).length

        let options = [];
        if (route_start === 2) {
            options = options.concat([
                {
                    "text": "Promotor vinculado",
                    "status": !!people.id
                }, {
                    "text": "Promotor tem coordenadas",
                    "status": isNumber(people.lat),
                }
            ]);
        }

        // default options
        options = options.concat([
            {
                "text": "Ter ao menos 2 eventos",
                "status": events.length > 1
            }, {
                "text": "Ter no máximo 11 eventos",
                "status": events.length > 1 && events.length < 12
            }, {
                "text": "Todos os PDVs tem coordenadas",
                "status": coordinates === events.length
            },
        ]);

        let status = !!options.filter(o => !o.status).length;

        return {
            "disabled": status,
            "options": options,
        };

    }, [formValues.events]);

    const header = useMemo(() => {
        const format = default_mode === 'week' ? 'dddd' : 'dddd, D \\d\\e MMMM \\d\\e YYYY';
        return moment(day, 'DD/MM/YYYY').format(format).replace('-feira', '');
    }, [day]);

    const params = useMemo(() => {
        let items = logged.contractor.params || [];
        let options = {
            optimize_events: 0
        };

        let optimize_events = items.filter(o => o.key === 'optimize_events');
        if (optimize_events.length) {
            options['optimize_events'] = parseInt(optimize_events[0]['value']);
        }

        return options;
    }, [logged]);

    const optionsActions = useMemo(() => {
        let options = [
            {
                key: 3,
                text: 'Limpar todos os pontos da lista',
                action: () => props.clear()
            }, {
                key: 4,
                text: 'Evento de repetição',
                action: async () => {
                    await setItem({
                        "index": -1,
                        "modal": "repeat",
                        "direct": false,
                        "interval": {
                            "type": default_frequency,
                            "days": [
                                moment(day).locale("en").format("dddd").toLowerCase()
                            ]
                        }
                    });
                    await refModalRepeat.current.openModal();
                }
            }, {
                key: 5,
                text: 'Remover pontos fora da jornada',
                action: () => deleteEventsAfterJourney()
            }
        ];

        if (params["optimize_events"] && optimizeRouteEvents) {
            options.push({
                "key": 6,
                "action": () => {
                    if (optimize_rules.disabled) {
                        return;
                    }
                    optimizeRouteEvents();
                },
                "text": !optimize_rules.disabled ? "Otimizar rota" : <Popup
                    inverted
                    basic
                    trigger={<div>Otimizar rota</div>}
                >
                    <List inverted relaxed>
                        {
                            optimize_rules.options.map((o, i) => {
                                return (
                                    <List.Item key={i}>
                                        <List.Icon name={`${o.status ? "check" : "times"} circle outline`}/>
                                        <List.Content style={{whiteSpace: "nowrap"}}>{o.text}</List.Content>
                                    </List.Item>
                                )
                            })
                        }
                    </List>
                </Popup>,
            });
        }

        if (isGroup) {
            options.unshift({
                key: 0,
                text: 'Adicionar Multicontas',
                action: async () => {
                    await setItem({
                        "index": -1,
                        "modal": "multicontas",
                        "direct": false,
                        "interval": {
                            "type": default_frequency,
                            "days": [
                                moment(day).locale("en").format("dddd").toLowerCase()
                            ]
                        },
                        "event": {
                            "subcontractors": [],
                        }
                    });
                    await refModalMulticontas.current.openModal();
                }
            });
        }

        return options;
    }, [params, isGroup, optimize_rules]);

    const people_lat = useMemo(() => {
        let res = {
            "color": "red",
            "title": "A geolocalização do executor não foi encontrada"
        }

        if (isNumber(people.lat)) {
            res.color = "green";
            res.title = "Tudo certo com a geolocalização do executor";
        }

        return res;
    }, [people]);

    let journey = " - ";
    if(!time_journey.default) {
        journey = `${time_journey.start} às ${time_journey.end}`;
    }

    return (
        <Fragment>
            <Menu className={'no-first-bg-menu associated-menu mb-0'}>
                <Menu.Item>
                    <Header as={'h4'} className={'associated-menu'}>
                        <Header.Content>
                            {header}
                            <Header.Subheader>
                                {props.performer}
                                <div>
                                    <small>{`Jornada: ${journey}`}</small>
                                </div>
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Menu.Item>
                <Menu.Menu position={'right'}>
                    {
                        route_start === 2 && <Menu.Item className={"no-border-left"}>
                            <Icon
                                circular
                                fitted
                                link
                                name={"map marker alternate"}
                                color={people_lat.color}
                                title={people_lat.title}
                            />
                        </Menu.Item>
                    }
                    <Menu.Item>
                        <Header as={'h4'} textAlign={'center'}>
                            <Header.Content>
                                {props.jorney}%
                                <Header.Subheader>
                                    Taxa de Ocupação
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    </Menu.Item>
                    <DropActions
                        menu
                        icon={'more-vertical'}
                        options={optionsActions}
                    />
                </Menu.Menu>
            </Menu>
            <Divider style={{marginTop: 0}}/>
        </Fragment>
    )
};

export const EventsItem = props => {
    const {
        data,
        // data_before,
        index,
        item,
        remove,
        // duplicate,
        // onSetInterval,
        // onFetchRates,
        // match,
        className,
        changeEndTime,
        // multicontas,
        countItens,
        forceValidate,
    } = props;

    // const refRepetition = createRef();
    const {default_mode, isGroup, refModalRepeat, refModalMulticontas, setItem} = useContext(EventManagerContext);
    const start_time = moment(data.start_time, 'HH:mm');
    const end_time = moment(data.end_time, 'HH:mm');

    const time_total = (start, extra, calcEndTime = false) => {
        let total = start;
        let minutes = 0;

        if (data.time_trip !== '00:00') {
            minutes += dateGetMinutes(data.time_trip);
        } else {
            minutes += 1;
        }

        if (extra !== '00:00') {
            minutes += dateGetMinutes(extra);
        }

        if (minutes) {
            total = timePlusMinutes(total, minutes);
        }

        data.time_total = total;

        if (typeof calcEndTime !== 'boolean') {
            changeEndTime(calcEndTime);
        }

        forceValidate();
    };

    const calculeTotal = (e, value, start = true, calcEndTime = false) => {
        const time = moment(value, 'HH:mm');
        if (start) {
            data.duration = timeDiff(time, end_time);
        } else {
            data.duration = timeDiff(start_time, time);
        }
        time_total(data.duration, data.extra_time, calcEndTime);
    };

    const distance = useMemo(() => {
        const value = parseFloat(data.distance);
        if(!value) {
            return ''
        }

        return (value / 1000).toFixed(2);
    }, [data.distance]);

    const store_lat = useMemo(() => {
        let res = {
            "color": "red",
            "title": "A geolocalização do PDV não foi encontrada"
        }

        if (isNumber(data.lat)) {
            res.color = "green";
            res.title = "Tudo certo com a geolocalização do PDV";
        }

        return res;
    }, [data]);

    return (
        <Fragment>
            <div className={`itens-associated ${className}`}>
                <div>
                    <div>
                        <Header as={'h5'}>
                            <Header.Content>
                                <small>Código: {data.store_code}</small>
                                {data.name}
                                <Header.Subheader>
                                    {data.formated_adrress}
                                </Header.Subheader>
                            </Header.Content>
                            <div className={"lat-check"}>
                                <Icon
                                    circular
                                    fitted
                                    link
                                    name={"map marker alternate"}
                                    color={store_lat.color}
                                    title={store_lat.title}
                                />
                            </div>
                        </Header>
                    </div>
                    <div>
                        <div className={'ui form'}>
                            <Field
                                name={`${item}.duration`}
                                component={InputTime}
                                type='text'
                                minTime={`${item}.start_time`}
                                validate={[required, isTime, checkDuration]}
                                onBlur={(e, value) => {
                                    let minutes = dateGetMinutes(value);
                                    data.end_time = timePlusMinutes(data.start_time, minutes);

                                    time_total(value, data.extra_time, index);
                                }}
                            />

                        </div>
                        <div className={'duration'}>
                            {data.start_time} às {data.end_time}
                            <Popup
                                basic
                                on={'click'}
                                trigger={<Icomoon name={'edit1 link'}/>}
                                size={"tiny"}
                                content={
                                    <Segment basic className={'change-duration'}>
                                        <Header as={'h5'}>
                                            <Header.Content>
                                                Alterar horário
                                            </Header.Content>
                                        </Header>
                                        <div className={'ui form'}>
                                            <Form.Group width={'equal'}>
                                                <Field
                                                    name={`${item}.start_time`}
                                                    component={InputTime}
                                                    type='text'
                                                    maxTime={`${item}.end_time`}
                                                    validate={[required, isTime, isTimeLess]}
                                                    onBlur={(e, value) => {
                                                        calculeTotal(e, value, true, index);
                                                    }}
                                                />
                                                <Field
                                                    name={`${item}.end_time`}
                                                    component={InputTime}
                                                    type='text'
                                                    minTime={`${item}.start_time`}
                                                    validate={[required, isTime, isTimeGreater]}
                                                    onBlur={(e, value) => {
                                                        calculeTotal(e, value, false, index);
                                                    }}
                                                />
                                            </Form.Group>
                                        </div>
                                    </Segment>
                                }
                            />
                        </div>
                    </div>
                    <div style={{alignSelf: "flex-start", marginTop: -8}}>
                        <Dropdown icon={<Icomoon name={'more-vertical'}/>} direction={'left'}>
                            <Dropdown.Menu>
                                {
                                    isGroup && <Dropdown.Item
                                        onClick={async () => {
                                            await setItem({
                                                index,
                                                "modal": "multicontas",
                                                "direct": false,
                                                "interval": data.interval,
                                                "event": {
                                                    "subcontractors": data.subcontractors._ids || []
                                                }
                                            });
                                            await refModalMulticontas.current.openModal();
                                        }}
                                        content={'Multicontas'}
                                    />
                                }

                                <Dropdown.Item
                                    onClick={() => remove(data)}
                                    content={'Remover PDV'}
                                />

                                {
                                    default_mode === "week" && <Dropdown.Item
                                        onClick={async () => {
                                            await setItem({
                                                index,
                                                "modal": "repeat",
                                                "direct": false,
                                                "interval": data.interval,
                                            });
                                            await refModalRepeat.current.openModal();
                                        }}
                                        content={'Repetição do PDV'}
                                    />
                                }

                                {/*<Dropdown.Item*/}
                                {/*    onClick={duplicate}*/}
                                {/*    content={'Duplicar'}*/}
                                {/*/>*/}

                                {/*<Dropdown.Item*/}
                                {/*    onClick={() => duplicate(true)}*/}
                                {/*    content={<Fragment>Duplicar <small>(Final)</small></Fragment>}*/}
                                {/*/>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div>
                    <div style={{display: 'flex'}}>
                        <Icomoon
                            name={'car'}
                            style={{marginRight: '.75rem'}}
                        />
                        {distance} km | {data.time_trip} + {data.duration} + {data.extra_time} | Total: {data.time_total}
                        {
                            index < countItens &&
                            <Popup
                                basic
                                className={'associated-extra-time'}
                                trigger={<Icomoon name={'edit1 link'} style={{marginLeft: '.5rem'}}/>}
                                content={
                                    <Segment basic>
                                        <div>
                                            Definir tempo extra ao deslocamento
                                        </div>
                                        <div>
                                            <Field
                                                name={`${item}.extra_time`}
                                                component={InputTime}
                                                type='text'
                                                validate={[required, isTime]}
                                                onBlur={(e, value) => time_total(data['duration'], value, index)}
                                            />
                                        </div>
                                    </Segment>
                                }
                            />
                        }
                    </div>
                    <div/>
                </div>
            </div>

            {/*<Travel*/}
            {/*    ref={refTravel}*/}
            {/*    index={index}*/}
            {/*    item={item}*/}
            {/*    data={data}*/}
            {/*    before={data_before}*/}
            {/*    match={match}*/}
            {/*    onFetchRates={onFetchRates}*/}
            {/*    countItens={countItens}*/}
            {/*/>*/}

            {/*<Repetition*/}
            {/*    ref={refRepetition}*/}
            {/*    index={index}*/}
            {/*    item={item}*/}
            {/*    data={data}*/}
            {/*    setInterval={onSetInterval}*/}
            {/*/>*/}
        </Fragment>
    )
};

