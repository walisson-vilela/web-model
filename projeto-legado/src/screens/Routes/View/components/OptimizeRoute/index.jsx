import React, {forwardRef, useCallback, useContext, useEffect, useMemo, useState} from "react";
import moment from "moment";
import {isNull, isNumber} from "lodash";
import {Button, Icon, Message, Table} from "semantic-ui-react";

import {Icomoon, Modal} from '../../../../../components';
import {EventManagerContext} from '../../../EventManager';

import {optimizeRouteEvents} from "../../../../../redux/actions/RoutesActions";
import {postRouteEvents} from "../../../../../redux/actions/RoutesVersionEventsActions";
import {dateDuration, dateGetMinutes} from "../../../../../utils/DateTime";

const rules = [
    "Promotor vinculado",
    "Promotor tem coordenadas",
    "Ter ao menos 2 eventos",
    "Ter no máximo 11 eventos",
    "Todos os PDVs tem coordenadas"
];

const Success = <Icon color={"green"} name={"check circle outline"}/>;
const Failure = <Icon color={"red"} name={"times circle outline"}/>;
const IntDays = [0, 1, 2, 3, 4, 5, 6];
const OptimizeRoute = forwardRef((props, ref) => {
    const {current} = ref;
    const {people, handleInterval} = useContext(EventManagerContext);
    const {route_version_id, events, reloadEvents, week, next, prev} = props;
    const [saving, setSaving] = useState(false);
    const [optimized, setOptimized] = useState(false);
    const [status, setStatus] = useState([null, null, null, null, null, null, null]);

    const days = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
    }

    const values = useMemo(() => {
        setOptimized(false);

        const people_id = people.id ? 1 : 0;
        const people_lat = isNumber(people.lat) ? 1 : 0;

        let rows = [
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null],
        ];

        for (let event of events) {
            const day = event.start.getDay();
            days[day].push(event);
        }

        rules.map((rule, index) => {
            IntDays.map((d) => {
                const items = days[d];
                if (items.length) {
                    switch (index) {
                        case 0: // Promotor vinculado
                            rows[index][d] = people_id;
                            break;
                        case 1: // Promotor tem coordenadas
                            rows[index][d] = people_lat;
                            break;
                        case 2: // Ter ao menos 2 eventos
                            rows[index][d] = items.length > 1 ? 1 : 0;
                            break;
                        case 3: // Ter no máximo 11 eventos
                            rows[index][d] = (items.length > 1 && items.length < 12) ? 1 : 0;
                            break;
                        case 4: // Todos os PDVs tem coordenadas
                            let coordinates = items.filter(o => isNumber(o.lat)).length
                            rows[index][d] = (coordinates > 1 && coordinates === items.length) ? 1 : 0;
                            break;
                    }
                }
            });
        });

        return rows;
    }, [people, events]);

    const handleSave = useCallback(async (payload) => {
        const {dispatch} = handleInterval;
        try {
            const res = await dispatch(optimizeRouteEvents(payload));
            if (res.success) {
                let data = {
                    "overwrite": true,
                    "strict": true,
                    "reorder": false,
                    "delete": [],
                    "events": []
                }
                res.data.events.map((event) => {
                    let item = {
                        "store_id": event.store_id,
                        "order": event.order,
                        "start": event.date + " " + event.start_time + ":00",
                        "end": event.date + " " + event.end_time + ":00",
                        "distance": event.distance,
                        "time_trip": dateGetMinutes(event.time_trip),
                        "time_trip_extra": dateGetMinutes(event.extra_time),
                        "time_total": dateGetMinutes(event.time_total),
                        "subcontractors": event.subcontractors,
                        "recurrent": true,
                        "recurrent_params": {
                            "days": event.recurrent_params.days,
                            "direct": false,
                            "overwrite": true,
                            "reorder": false,
                            "strict": true,
                            "interval": event.recurrent_params.interval
                        },
                        "recurrent_end": event.recurrent_end,
                        "recurrent_events": event.recurrent_events
                    };
                    data.events.push(item);
                });

                await dispatch(postRouteEvents(route_version_id, data));
            }
        } catch (e) {
            console.error(e);
        }
    }, [status, handleInterval]);

    const handleOptimize = useCallback(async () => {

        let payload = {
            "reorder": true,
            "people_id": people.id,
            "route_version_id": route_version_id,
            "change": {
                "distance": true,
                "time": true,
                "extra_time": 1,
            },
            "events": [],
        };

        const items = IntDays
            .map((d) => {
                let total = 0;
                values.map((r) => {
                    total += r[d] ? r[d] : 0;
                });
                return {
                    "day": d,
                    "total": total,
                };
            })
            .filter((o) => o.total === rules.length);

        setSaving(true);

        for (let item of items) {
            const {day} = item;
            payload.events = [];
            for (let event of days[day]) {
                const start = moment(event.origin.start);
                let optimize = event.origin;
                optimize.date = start.format("YYYY-MM-DD");
                optimize.start_time = start.format("HH:mm");
                optimize.duration = dateDuration(event.origin.duration);
                optimize.extra_time = dateDuration(event.origin.time_trip_extra);
                optimize.recurrent_params = {
                    "days": event.origin.p.recurrent_params.days,
                    "interval": event.origin.p.recurrent_params.interval,
                };
                optimize.recurrent_end = event.origin.p.recurrent_end.substring(0, 10);
                optimize.recurrent_events = event.origin.p.recurrent_events;
                payload.events.push(optimize);
            }

            try {
                await handleSave(payload);
                status[day] = 1;
            } catch (e) {
                status[day] = 1;
                console.error(e);
            } finally {
                setStatus(status);
            }
        }
        setSaving(false);
        setOptimized(true);
    }, [values]);

    const Footer = useMemo(() => (
        <React.Fragment>
            <Button
                basic
                className={"transparent"}
                type={"button"}
                content={optimized ? "Fechar" : "Cancelar"}
                onClick={() => current.closeModal()}
                disabled={saving}
            />
            {
                (!optimized && !saving) && <Button
                    primary
                    content={"Otimizar"}
                    onClick={handleOptimize}
                />
            }
        </React.Fragment>
    ), [optimized, saving, values]);

    useEffect(() => {
        setStatus([null, null, null, null, null, null, null]);
    }, [week]);

    return (
        <Modal
            menu
            ref={ref}
            title={"Otimizar rota"}
            footer={Footer}
            loading={saving}
            onClose={() => {
                if (optimized) {
                    reloadEvents();
                }
                setStatus([null, null, null, null, null, null, null]);
            }}
        >
            <p>Confira abaixo uma lista de regras necessárias para o funcionamento do otimizador de rotas.</p>
            <div style={{float: "right", marginBottom: 7}}>
                <span style={{paddingRight: 14, fontSize: 15, fontWeight: 700}}>Semana {week}</span>
                <Button.Group basic>
                    <Button
                        disabled={week === 1}
                        icon={<Icomoon name={'chevron-left'}/>}
                        title={"Voltar"}
                        onClick={prev}
                    />
                    <Button
                        disabled={week === 2}
                        icon={<Icomoon name={'chevron-right'}/>}
                        title={"Avançar"}
                        onClick={next}
                    />
                </Button.Group>
            </div>
            <Table selectable textAlign={"center"} size={"large"}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Regra</Table.HeaderCell>
                        <Table.HeaderCell>Dom</Table.HeaderCell>
                        <Table.HeaderCell>Seg</Table.HeaderCell>
                        <Table.HeaderCell>Ter</Table.HeaderCell>
                        <Table.HeaderCell>Qua</Table.HeaderCell>
                        <Table.HeaderCell>Qui</Table.HeaderCell>
                        <Table.HeaderCell>Sex</Table.HeaderCell>
                        <Table.HeaderCell>Sab</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        rules.map((rule, index) => {
                            const items = values[index];
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell textAlign={"left"}>{rule}</Table.Cell>
                                    {
                                        IntDays.map((o, i) => {
                                            let value = items[i];
                                            let icon = null;
                                            if (!isNull(value)) {
                                                icon = value === 1 ? Success : Failure;
                                            }

                                            return <Table.Cell key={`day-${i}`}>{icon}</Table.Cell>;
                                        })
                                    }
                                </Table.Row>
                            )
                        })
                    }
                    <Table.Row>
                        <Table.Cell textAlign={"left"}><strong>Situação</strong></Table.Cell>
                        {
                            IntDays.map((o, i) => {
                                let value = status[i];
                                let icon = null;
                                if (!isNull(value)) {
                                    icon = value === 1 ? Success : Failure;
                                }
                                return <Table.Cell key={`footer-${i}`}>{icon}</Table.Cell>;
                            })
                        }
                    </Table.Row>
                </Table.Body>
            </Table>
            <Message
                warning
                content={"Apenas os dias que cumprirem todas as regras serão processados."}
            />
        </Modal>
    );
});

export default OptimizeRoute;
