import { yupResolver } from '@hookform/resolvers/yup';
import { debounce, filter } from "lodash";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useController, useForm } from "react-hook-form";
import ReactInputMask from 'react-input-mask';
import { Button, Form as SemanticForm, Grid, Header, Icon, Popup, Segment } from "semantic-ui-react";
import * as yup from "yup";

import { CheckboxWrapper, RepeatWrapper } from "./style";

import GroupCheckboxPopup from "../../../../components/GroupCheckboxPopup";
import { fetchStores } from "../../../../redux/actions/StoresActions";
import { isAfter, isBefore, timeToMoment } from "../../../../utils/DateTime";
import { EventManagerContext } from "../../EventManager";

const DAYS = [
    {
        index: 0,
        label: "Domingo",
        day: "sunday",
        checked: false
    }, {
        index: 1,
        label: "Segunda",
        day: "monday",
        checked: false
    }, {
        index: 2,
        label: "Terça",
        day: "tuesday",
        checked: false
    }, {
        index: 3,
        label: "Quarta",
        day: "wednesday",
        checked: false
    }, {
        index: 4,
        label: "Quinta",
        day: "thursday",
        checked: false
    }, {
        index: 5,
        label: "Sexta",
        day: "friday",
        checked: false
    }, {
        index: 6,
        label: "Sábado",
        day: "saturday",
        checked: false
    }
];

const StoreOption = ({item}) => {
    const {code, pdv, name, formatted_address} = item;
    return (
        <React.Fragment>
            <small>Código: {code}</small>
            <div className={"header"}>{pdv || name}</div>
            <div className={"subheader"}>{formatted_address}</div>
        </React.Fragment>
    );
}

const setValueOptions = {shouldDirty: true, shouldValidate: true};

const Form = ({isNew, control, setValue, errors, register, update, watch}) => {
    const {default_event_interval, item, handleInterval: {dispatch}, storeFilterOptions} = useContext(EventManagerContext);
    const [stores, setStores] = useState([]);

    /**
     * memo
     */
    const interval_options = useMemo(() => ([
        {key: 0, text: 'Evento único', value: 'unique'},
        {key: 1, text: 'Evento semanal', value: 'week'},
    ]), []);

    const recurrent_options = useMemo(() => ([
        {key: 0, text: 'Não termina nunca', value: 'never'},
        {key: 1, text: 'Após uma quantidade de eventos', value: 'events'},
        {key: 2, text: 'Em uma data específica', value: 'date'},
    ]), []);

    const every_options = useMemo(() => ([
        {key: 0, text: 'Uma semana', value: 1},
        {key: 1, text: 'Duas semanas', value: 2},
    ]), []);

    const {field: every} = useController({name: "every", control});
    const {field: start} = useController({name: "start", control});
    const {field: end} = useController({name: "end", control});
    const {field: store_id} = useController({name: "store_id", control});
    const {field: interval} = useController({name: "interval", control});
    const {field: recurrent} = useController({name: "recurrent", control});
    const {field: recurrent_end} = useController({name: "recurrent_end", control});
    const {field: recurrent_events} = useController({name: "recurrent_events", control});

    const fields = watch("days");

    /**
     * callbacks
     */
    const selectDays = useCallback((days = [0, 1, 2, 3, 4, 5, 6]) => {
        fields.map((item, index) => {
            let checked = false
            if (days.includes(index)) {
                checked = true;
            }
            update(index, {...item, checked});
        });
    }, []);

    const handleFetchStores = useCallback(async (q) => {
        const checked = storeFilterOptions.filter((o) => o.checked).map((o) => o.type);

        let params = {q, "limit": 100, "active": 1, "group_by_store": 1};
        if (checked.includes("group")) {
            params.zone_id = item.event.origin.zone_id;
        }

        if (checked.includes("attendance")) {
            params.unattended = 1;
        }

        if (checked.includes("trade")) {
            params.without_hierarchy = 1;
        }

        if (checked.includes("all")) {
            params.all = 1;
        }

        try {
            const res = await dispatch(fetchStores(params));
            if (res.success) {
                const data = res.data.map((item, i) => {
                    const {id, code, pdv, name, formatted_address} = item;
                    return {
                        "key": i,
                        "value": id,
                        "search": `${id} ${code} ${pdv} ${name} ${formatted_address}`,
                        "text": pdv,
                        "description": () => <StoreOption item={item}/>,
                    }
                });
                setStores(data);
            }
        } catch (e) {
            console.error(e);
        }
    }, [storeFilterOptions]);

    const handleSearch = useCallback(debounce((value) => {
        handleFetchStores(value);
    }, 500), []);

    const customSearch = useCallback((options, query) => {
        return options.filter((o) => o.search.toLowerCase().includes(query.toLowerCase()));
    }, []);

    useEffect(() => {
      fields.map((field, index) => {
        const {day, label, checked} = field;
        const path = `days[${index}]`;
        register(`${path}.day`);
        register(`${path}.checked`);
        register(`${path}.label`);
        setValue(`${path}.day`, day);
        setValue(`${path}.checked`, checked);
        setValue(`${path}.label`, label);
      });
    }, []);

    /**
     * render
     */
    return (
        <RepeatWrapper>
            {/*<input type={"hidden"} {...register("every")}/>*/}
            {
                isNew && <SemanticForm.Group style={{alignItems: "flex-end"}}>
                    <SemanticForm.Dropdown
                        label={"Selecione um PDV"}
                        fluid
                        selection
                        search={customSearch}
                        clearable
                        selectOnBlur={false}
                        selectOnNavigation={false}
                        noResultsMessage={"Nenhum resultado encontrado"}
                        options={stores}
                        onSearchChange={(e, {searchQuery}) => handleSearch(searchQuery)}
                        value={store_id.value}
                        onChange={(e, {value}) => {
                            setValue("store_id", value, setValueOptions);
                        }}
                        width={"16"}
                        className={"with_options"}
                        placeholder={"digite aqui dados do PDV para pesquisa"}
                    />
                    <GroupCheckboxPopup
                        basic
                        options={storeFilterOptions}
                        style={{
                            border: "1px solid transparent"
                        }}
                    />
                </SemanticForm.Group>
            }
            <SemanticForm.Group>
                {
                    item.direct && <React.Fragment>
                        <SemanticForm.Input
                            width={3}
                            label={"Início"}
                            error={!!errors.start}
                            input={() => <ReactInputMask
                                mask={"99:99"}
                                maskChar={null}
                                value={start.value}
                                onChange={(e) => setValue("start", e.target.value, setValueOptions)}
                                className={"time"}
                            />}
                        />
                        <SemanticForm.Input
                            width={3}
                            label={"Término"}
                            error={!!errors.end}
                            input={() => <ReactInputMask
                                mask={"99:99"}
                                maskChar={null}
                                value={end.value}
                                onChange={(e) => setValue("end", e.target.value, setValueOptions)}
                                className={"time"}
                            />}
                        />
                        {
                            errors.end && <div className={"input-error"}>
                                <Popup
                                    basic
                                    content={`Deve ser posterior ao início e ter ao menos ${default_event_interval} minutos.`}
                                    trigger={<Icon name={"warning sign"} color={"red"}/>}
                                />
                            </div>
                        }
                    </React.Fragment>
                }
                <SemanticForm.Select
                    fluid
                    label='Qual a frequência da repetição?'
                    options={interval_options}
                    placeholder='Selecione'
                    value={interval.value}
                    onChange={(e, {value}) => setValue("interval", value, setValueOptions)}
                    width={item.direct ? 10 : 16}
                />
            </SemanticForm.Group>
            <SemanticForm.Group inline className={"days"}>
                <label>Dias da Semana</label>
                {
                    fields.map((item, index) => {
                        const {day, label, checked} = item;
                        return (
                            <SemanticForm.Checkbox
                                key={index}
                                value={day}
                                label={label}
                                checked={checked}
                                onChange={(e, {checked}) => update(index, {...item, checked})}
                            />
                        )
                    })
                }
            </SemanticForm.Group>
            <SemanticForm.Field>
                <Button.Group basic fluid size={"mini"}>
                    <Button type={"button"} onClick={() => selectDays()} content={"Todos os dias"}/>
                    <Button type={"button"} onClick={() => selectDays([1, 2, 3, 4, 5])} content={"Dias úteis"}/>
                    <Button type={"button"} onClick={() => selectDays([0, 6])} content={"Finais de semana"}/>
                </Button.Group>
            </SemanticForm.Field>
            <SemanticForm.Group>
                <SemanticForm.Select
                    label={"Repetir a cada"}
                    width={"6"}
                    options={every_options}
                    placeholder="Selecione"
                    value={every.value}
                    onChange={(e, {value}) => setValue("every", value, setValueOptions)}
                    disabled={interval.value !== "week"}
                />
                <SemanticForm.Select
                    width={"10"}
                    label="Quando a repetição termina?"
                    options={recurrent_options}
                    placeholder="Selecione"
                    value={recurrent.value}
                    onChange={(e, {value}) => {
                        setValue("recurrent", value, setValueOptions)
                        if (value !== "events") {
                            setValue("recurrent_events", "");
                        }
                        if (value !== "date") {
                            setValue("recurrent_end", "");
                        }
                    }}
                    disabled={interval.value !== "week"}
                />
            </SemanticForm.Group>
            <SemanticForm.Group widths='equal'>
                {
                    <SemanticForm.Input
                        label={"Quantos eventos?"}
                        type={"text"}
                        value={recurrent_events.value}
                        onChange={(e, {value}) => setValue("recurrent_events", value, setValueOptions)}
                        disabled={recurrent.value !== "events"}
                    />
                }
                {
                    <SemanticForm.Input
                        label={"Qual a data final?"}
                        type={"date"}
                        value={recurrent_end.value}
                        min={window["NOW"]}
                        onChange={(e, {value}) => setValue("recurrent_end", value, setValueOptions)}
                        disabled={recurrent.value !== "date"}
                    />
                }
            </SemanticForm.Group>
        </RepeatWrapper>
    );
}

const Questions = ({isNew, direct, control, setValue}) => {

    const {field: overwrite} = useController({name: "overwrite", control});
    const {field: strict} = useController({name: "strict", control});
    const {field: reorder} = useController({name: "reorder", control});

    return (
        <React.Fragment>
            <Header as='h3' icon textAlign='center' className={"mb-1"}>
                <Icon name='info circle'/>
                <Header.Content>Atenção as opções abaixo!</Header.Content>
            </Header>
            <CheckboxWrapper>
                <SemanticForm.Checkbox
                    toggle
                    label={"Remover todos os atendimentos do dia"}
                    checked={overwrite.value}
                    onChange={(e, {checked}) => setValue("overwrite", checked, setValueOptions)}
                />
                <div>Serão removidos todos os atendimentos existentes nos dias selecionados.</div>
                <SemanticForm.Checkbox
                    toggle
                    label={`Remover outros atendimentos ${direct ? "do PDV" : "dos PDVs"}`}
                    checked={strict.value}
                    onChange={(e, {checked}) => setValue("strict", checked, setValueOptions)}
                />
                <div>Esta ação irá remover os atendimentos nos outros dias que não foram selecionados.</div>
                <SemanticForm.Checkbox
                    toggle
                    label={"Obedecer ordenação atual"}
                    checked={reorder.value}
                    onChange={(e, {checked}) => setValue("reorder", checked, setValueOptions)}
                    disabled={overwrite.value}
                />
                <div>O sistema irá reordenar os atendimentos nos dias em que já existem eventos, caso contrário serão
                    adicionados após o último evento.
                </div>
            </CheckboxWrapper>
        </React.Fragment>
    );
}

const Repeat = () => {

    const {default_event_interval, item, setDirt, handleSave, defaultValues} = useContext(EventManagerContext);
    if(!defaultValues.start || !defaultValues.days) {
      return <React.Fragment/>;
    }

    const values = useMemo(() => {
        let data = {...defaultValues};
        data.days = DAYS.map((item, index) => ({...item, checked: defaultValues.days[index] || false}));

        return data;
    }, [defaultValues]);

    const rules = {
        "store_id": item.new ? yup.number().required() : yup.number().nullable(),
        "start": item.direct ? yup.string().required().length(5).test('lt', 'lt', (value, context) => {
            const check = timeToMoment(value);
            if (!check.isValid()) {
                return false;
            }
            return isBefore(value, context.parent.end);
        }) : yup.string().nullable(),
        "end": item.direct ? yup.string().required().length(5).test('gt', 'gt', (value, context) => {
            const check = timeToMoment(value);
            if (!check.isValid()) {
                return false;
            }

            return isAfter(value, context.parent.start, undefined, default_event_interval);
        }) : yup.string().nullable(),
        "days": yup.array().required().test('empty', 'message', (items) => {
            return Boolean(filter(items, (o) => o.checked).length);
        }),
    };

    const schema = yup.object(rules).required();

    /**
     * form
     */
    const {control, register, setValue, handleSubmit, formState, watch} = useForm({
      "defaultValues": values,
      "mode": "onChange",
      "resolver": yupResolver(schema)
    });

    const onSubmit = useCallback((data) => {
        handleSave(data);
    }, []);

    const update = useCallback(async (index, value) => {
      setValue(`days[${index}].checked`, value.checked, setValueOptions);
    }, []);

    /**
     * effects
     */
    useEffect(() => {
        let status = formState.isValid;
        if (status) {
            status = formState.isDirty;
        }
        setDirt(status);
    }, [formState.isValid, formState.isDirty]);

    useEffect(() => {
      setValue('start', values.start, setValueOptions)
      setValue('end', values.end, setValueOptions)
      values.days.map((item, index) => {
        update(index, item).then()
      })
    }, [values])

    /**
     * render
     */
    return (
        <Segment basic className={"mt-0 pb-0"}>
            <SemanticForm id={"details-form"} onSubmit={handleSubmit(onSubmit)} loading={formState.isSubmitted}>
                <Grid>
                    <Grid.Row columns={2}>
                        <Grid.Column width={"8"}>
                            <Form
                                isNew={item.new}
                                control={control}
                                setValue={setValue}
                                errors={formState.errors}
                                register={register}
                                update={update}
                                watch={watch}
                            />
                        </Grid.Column>
                        <Grid.Column width={"8"}>
                            <Questions
                                isNew={item.new}
                                direct={item.direct || false}
                                control={control}
                                setValue={setValue}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </SemanticForm>
        </Segment>
    );
}

export default Repeat;
