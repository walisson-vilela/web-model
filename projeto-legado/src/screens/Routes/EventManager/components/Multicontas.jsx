import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { Button, Form as SemanticForm, Grid, Icon, Input, List, Menu, Segment } from "semantic-ui-react";

import { filter } from "lodash";

import { getContractorGroup } from "../../../../redux/actions/ContractorsActions";

import { EventManagerContext } from "..";
import { DAYS } from "../../EventsManager/utils";
import { WrapperMulticontas } from "./style";

const ListItem = ({o, i, u, s}) => {
    const {value, label, checked} = o
    return (
        <List.Item>
            <SemanticForm.Checkbox
                checked={checked}
                onChange={(e, {checked}) => u(i, {...o, checked})}
                value={value}
                label={label}
                disabled={s.includes(value)}
            />
        </List.Item>
    );
}

const getSourceData = async (token, dispatch) => {
    let items = [];

    const {contractor} = token.payload;

    const res = await dispatch(getContractorGroup(contractor, contractor));
    if (res.success) {
        items = res.data.subcontractors.map((o) => {
            const {id: value, name: label} = o.detail;
            return {value, label, checked: false};
        });
    }

    return items;
};

const Container = ({type, source, destiny}) => {

    const [loading, setLoading] = useState(type === "source");
    const [search, setSearch] = useState("");

    const {token, handleInterval: {dispatch}} = useContext(EventManagerContext);

    const {fields, replace, update} = (type === "source") ? source : destiny;

    const all = fields.length;

    const checked = useMemo(() => {
        let items = filter(fields, {"checked": true});
        return items;
    }, [fields]);

    const selected = useMemo(() => {
        if (type !== "source") {
            return [];
        }
        return destiny.fields.map((o) => o.value);
    }, [destiny]);

    const count = useMemo(() => {
        return checked.length;
    }, [checked]);

    /**
     * Toogle select
     */
    const toggleSelect = useCallback((checked) => {
        let items = fields.map((o) => {
            let item = {...o, checked}
            if (selected.includes(o.value)) {
                item.checked = false;
            }
            return item;
        });
        replace(items);
    }, [fields]);

    /**
     * Remove selected items
     */
    const handleRemove = useCallback(() => {
        if (!count) {
            return;
        }
        let items = filter(fields, {"checked": false});
        replace(items);
    }, [count]);

    const handleAppend = useCallback(() => {
        if (!count) {
            return;
        }

        let items = checked.map((o) => ({...o, checked: false}));
        destiny.append(items);

        items = fields.map((o) => ({...o, checked: false}));
        replace(items);

    }, [checked]);

    /**
     * get source data
     */
    useEffect(() => {
        if (type !== "source") {
            return;
        }

        async function get() {
            replace(await getSourceData(token, dispatch));
            setLoading(false);
        }

        get();
    }, []);

    /**
     * Render
     */
    return (
        <React.Fragment>
            <Menu attached={"top"} style={{flexGrow: 0}}>
                {/*<Menu.Item>{type} - {count} - {JSON.stringify(selected)}</Menu.Item>*/}
                <Menu.Item>
                    <SemanticForm.Checkbox
                        disabled={!all}
                        onChange={(e, {checked}) => toggleSelect(checked)}
                    />
                </Menu.Item>
                {
                    type === "destiny" &&
                    <Menu.Item icon disabled={!count} onClick={() => handleRemove()}>
                        <Icon name={"trash alternate outline"}/>
                    </Menu.Item>
                }
                {
                    type === "source" &&
                    <Button primary disabled={!count} onClick={() => handleAppend()} className={"item"} style={{
                        color: "#FFF",
                        borderRadius: "inherit",
                    }}>
                        Adicionar
                    </Button>
                }
                <Menu.Menu position='right' className={"search"}>
                    <Input
                        transparent
                        icon={"search"}
                        placeholder={"Pesquisar"}
                        value={search}
                        onChange={(e, {value}) => setSearch(value)}
                    />
                </Menu.Menu>
            </Menu>
            <Segment attached={"top"} className={"mt-0 p-0 mc-content"} loading={loading}>
                <List divided celled>
                    {
                        fields.map((o, i) => {
                            if (search !== "" && !o.label.toLowerCase().includes(search)) {
                                return;
                            }
                            return <ListItem key={o.id} o={o} i={i} u={update} s={selected}/>;
                        })
                    }
                </List>
            </Segment>
        </React.Fragment>
    );
};

export const Multicontas = () => {
    const {defaultValues, setDirt, handleSave} = useContext(EventManagerContext);

    const values = useMemo(() => {
        if (!defaultValues.days) {
            return defaultValues;
        }
        let data = {...defaultValues};
        data.days = DAYS.map((item, index) => ({...item, checked: defaultValues.days[index] || false}));

        return data;
    }, [defaultValues]);

    /**
     * form
     */
    const sourceMethos = useForm();
    const methods = useForm({
        "defaultValues": values,
        "mode": "onChange",
    });

    const {control, handleSubmit, formState} = methods;

    const onSubmit = useCallback((data) => {
        handleSave(data);
    }, []);

    const source = useFieldArray({control: sourceMethos.control, "name": "subcontractors.source"});
    const destiny = useFieldArray({control, "name": "subcontractors.destiny"});

    /**
     * effects
     */
    useEffect(() => setDirt(formState.isDirty), [formState.isDirty]);

    /**
     * render
     */
    return (
        <FormProvider {...methods}>
            <WrapperMulticontas basic className={"mt-0 pb-0"} style={{height: 344}}>
                <SemanticForm id={"details-form"} onSubmit={handleSubmit(onSubmit)} loading={formState.isSubmitted}>
                    <Grid style={{height: "100%"}}>
                        <Grid.Row stretched columns={2} className={"pb-0"}>
                            <Grid.Column className={"source"}>
                                <Container type={"source"} source={source} destiny={destiny}/>
                            </Grid.Column>
                            <Grid.Column className={"destiny"}>
                                <Container type={"destiny"} destiny={destiny}/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </SemanticForm>
            </WrapperMulticontas>
        </FormProvider>
    );
}
