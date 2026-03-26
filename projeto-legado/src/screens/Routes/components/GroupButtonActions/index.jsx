import React, {Fragment, useEffect, useState} from 'react';
import {Button, Dropdown} from 'semantic-ui-react';
import {isEmpty} from 'lodash';

import moment from 'moment';

import {getRoutesWindowDetails} from "../../../../redux/actions/RoutesWindowDetailsActions";

const GroupButtonActions = (props) => {

    const {
        default_mode,
        viewCalendar,
        handleCalendar,
        handleActions,
        published,
        route,
        window = true,
        clone,
        progress,
        enable,
        proposal_end
    } = props;

    const [started, setStarted] = useState(false);
    const [editable, setEditable] = useState(true);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function getData() {
            setStarted(true);
            try {
                const res = await getRoutesWindowDetails({
                    window_id: progress,
                    route_id: route.data.route.id,
                });
                if (res.success && !isEmpty(res.data)) {
                    setEditable(res.data[0].editable);
                }

            } catch (e) {
                console.error(e);
            }
        }

        if (route && route.data && route.data.route.id) {
            setLoaded(true);
        }

        if (!started && progress && route && route.data && route.data.route.id) {
            getData();
        }
    }, [progress, route]);

    if (!loaded || (window && (!enable || proposal_end === ''))) {
        return (
            <Fragment/>
        );
    }

    const now = moment().utc(true);
    const proposal = moment(proposal_end).utc(false).endOf('day');

    if (window && progress && now.isAfter(proposal)) {
        return (
            <Fragment/>
        );
    }

    const data = route.data;

    let actions = [
        {key: 0, text: 'Salvar como rascunho', value: 0},
        {key: 1, text: 'Descartar modificações', value: 5}
    ];

    const modes = [
        {key: 0, text: 'Dia', value: 'day'},
        {key: 1, text: 'Semana', value: 'week'},
        {key: 2, text: 'Mês', value: 'month'},
    ];

    // Verifica se é uma versão publicada.
    if (!published) {
        actions = [
            // {key: 2, text: 'Salvar e publicar', value: 2},
            {key: 3, text: 'Salvar e submeter para aprovação', value: 3},
            {key: 1, text: 'Descartar modificações', value: 5}
        ];
    }

    // Verifica se o cliente não utiliza janela.
    if (!window && !published && !isEmpty(data)) {
        actions = [
            // {key: 0, text: 'Salvar e publicar', value: 4},
        ];

        if (!isEmpty(data.route.publish_at)) {
            actions.push({key: 1, text: 'Salvar e editar data da publicação', value: 6});
            actions.push({key: 3, text: 'Salvar e excluir agendamento da publicação', value: 7});
        } else {
            actions.push({key: 1, text: 'Agendar publicação', value: 6});
        }

        actions.push({key: 2, text: 'Descartar modificações', value: 5});
    }

    return (
        <Fragment>
            {
                default_mode !== "week" && <Dropdown
                    selection
                    basic
                    compact
                    options={modes}
                    defaultValue={viewCalendar}
                    onChange={(e, data) => handleCalendar(data.value)}
                    selectOnBlur={false}
                />
            }

            {
                (!published && data.temporary) &&
                <Button.Group color={'green'} className={'ml-2'}>
                    <Button
                        content={!window ? 'Publicar' : 'Salvar'}
                        onClick={() => handleActions(!window ? 4 : 1)}
                        className={'group__button'}
                    />

                    <Dropdown
                        className={'button icon'}
                        floating
                        options={actions}
                        trigger={<Fragment/>}
                        selectOnBlur={false}
                        onChange={(e, {value}) => handleActions(value)}
                        defaultUpward={false}
                    />
                </Button.Group>
            }

            {
                (!data.temporary && (!progress || editable)) && <Button
                    basic
                    className={'group__button ml-2'}
                    color={'blue'}
                    content={'Editar'}
                    onClick={() => clone()}
                />
            }
        </Fragment>
    );
};

export default GroupButtonActions;
