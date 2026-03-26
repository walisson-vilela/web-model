import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form as SemanticForm, Label, List, Popup, Segment } from 'semantic-ui-react';

import { fetchHierarchies, getHierarchiesLinksByParams } from '../../../../redux/actions/HierarchiesActions';

import { SelectWrapper } from './style';

const RenderPeoples = ({items}) => {
    if (!items.length) {
        return "Nenhum Vínculo"
    } else if (items.length === 1) {
        return items[0].name;
    } else {
        const count = items.length - 1;
        return <React.Fragment>
            {items[0].name}<Popup
            basic
            inverted
            content={
                <React.Fragment>
                    <List inverted divided relaxed={"very"}>
                        {items.slice(1).map((o, i) => (
                            <List.Item key={i}>
                                <List.Content>
                                    <List.Header content={o.name}/>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </React.Fragment>
            }
            trigger={<Label as={"a"} circular style={{marginLeft: 4}}>+{count}</Label>}
        />
        </React.Fragment>
    }
}

const RenderItems = ({items}) => {
    return items.map((o, i) => {

        return <List.Item key={i} style={{paddingLeft: `${i * 1}rem`}}>
            <List.Icon name='folder open'/>
            <List.Content>
                <List.Header content={o.name} style={{marginBottom: 2}}/>
                <List.Description content={<RenderPeoples items={o.peoples || []}/>}/>
            </List.Content>
        </List.Item>;
    });
}

let HierarchyStructure = (props) => {

    const [loading, setLoading] = useState(false);
    const [hierarchies, setHierarchies] = useState([]);
    const [elements, setElements] = useState([]);

    /**
     * Search hierarchies and save in state local.
     * @returns {Promise<void>}
     */
    const handleFetchHierarchies = async () => {
        const {people_id, fetchHierarchies} = props;

        try {
            setLoading(true);
            const res = await fetchHierarchies({people_id});
            if (res.success) {
                const items = await res.data.map((row, index) => ({
                    key: index,
                    text: row.name,
                    value: row.id
                }));

                setHierarchies(items);

                if (items.length) {
                    await getElements(items[0].value);
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Search structures according to the informed hierarchy.
     * @param hierarchy_id
     * @returns {Promise<void>}
     */
    const getElements = async (hierarchy_id) => {
        const {getHierarchiesLinksByParams, people_id} = props;
        try {
            setLoading(true);
            const params = {
                "people_id": people_id,
                "with_people": 1,
                "limit": 1,
            }
            const res = await getHierarchiesLinksByParams(hierarchy_id, params);
            if (res.success) {
                setElements(res.data);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchHierarchies();
    }, []);

    return (
        <SemanticForm loading={loading}>
            <SelectWrapper>
                {
                    hierarchies.length && <SemanticForm.Select
                        inline
                        label={"Hierarquias Associadas:"}
                        options={hierarchies}
                        defaultValue={hierarchies[0].value}
                        onChange={(e, {value}) => getElements(value)}
                    />
                }
            </SelectWrapper>
            <Segment>
                {
                    elements.map((o, i) => {
                        return <List
                            key={i}
                            divided
                            relaxed={"very"}
                            content={<RenderItems items={o.paths}/>}
                        />
                    })
                }
            </Segment>
        </SemanticForm>
    )
}

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchHierarchies,
    getHierarchiesLinksByParams,
}, dispatch);

export default connect(undefined, mapDispatchToProps)(HierarchyStructure);
