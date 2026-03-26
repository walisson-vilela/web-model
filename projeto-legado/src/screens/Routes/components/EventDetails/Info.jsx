import { isEmpty } from 'lodash';
import { Fragment, useContext, useEffect, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Header, List, Segment, SegmentGroup } from 'semantic-ui-react';

import { fetchStoresAttendances } from '../../../../redux/actions/StoresActions';
import { dateDuration, timeDiff } from '../../../../utils/DateTime';
import { EventManagerContext } from "../../EventManager";

import { Wrapper } from "./style";

const StoreDetails = ({title, event}) => (
    <Segment.Group>
        <Header attached={"top"} content={title}/>
        <Segment>
            {
                event.id
                    ?
                    <Fragment>
                        <h5>Matricula: {event.id} {event.code ? ` / Código: ${event.code}` : null}</h5>
                        <h4>{event.title}</h4>
                        <p>{event.formatted_address}</p>
                    </Fragment>
                    :
                    <Fragment>
                        <h4>Sem destino</h4>
                    </Fragment>
            }
        </Segment>
    </Segment.Group>
);

let Info = ({fetchStoresAttendances}) => {

    // const {event, next} = useContext(DetailsContext);
    const {item} = useContext(EventManagerContext);
    const event = item.event;

    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const res = await fetchStoresAttendances(event.id, 'by-people', {});
                setVisits(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    const distance = (parseInt(event.distance) / 1000).toFixed(2);
    const time_trip = dateDuration(event.time_trip);
    const ta = timeDiff(event.start, event.end);

    return (
        <Wrapper>
            <Segment basic>
                <Grid>
                    <Grid.Row columns={2} stretched>
                        <Grid.Column>
                            <StoreDetails title={"Origem"} event={event}/>
                        </Grid.Column>
                        <Grid.Column>
                            <StoreDetails title={"Destino"} event={event}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} stretched>
                        <Grid.Column>
                            <Segment.Group>
                                <Header attached={"top"} content={"Outras Informações"}/>
                                <Segment.Group horizontal>
                                    <Segment style={{width: "50%"}}>
                                        <Header
                                            size={"tiny"}
                                            content={"Distância"}
                                            subheader={`${distance}km`}
                                        />
                                    </Segment>
                                    <Segment style={{width: "50%"}}>
                                        <Header
                                            size={"tiny"}
                                            content={"Tempo de Deslocamento"}
                                            subheader={time_trip}
                                        />
                                    </Segment>
                                </Segment.Group>
                                <Segment.Group horizontal>
                                    <Segment style={{width: "50%"}}>
                                        <Header
                                            size={"tiny"}
                                            content={"Hist. de Visita"}
                                            subheader={"---/--- (--%)"}
                                        />
                                    </Segment>
                                    <Segment style={{width: "50%"}}>
                                        <Header
                                            size={"tiny"}
                                            content={"Tempo de Atendimento"}
                                            subheader={ta}
                                        />
                                    </Segment>
                                </Segment.Group>
                            </Segment.Group>
                        </Grid.Column>
                        <Grid.Column>
                            <SegmentGroup>
                                <Header attached={"top"} content={"Últimas Visitas"}/>
                                <Segment style={{height: 130, overflow: "auto"}} loading={loading}>
                                    <List divided relaxed>
                                        {
                                            visits.map((res, key) => (
                                                <List.Item key={key}>
                                                    <List.Content>
                                                        <List.Header>{res.people.name}</List.Header>
                                                        <List.Description>{!isEmpty(res.people.profiles) && res.people.profiles[0].name}</List.Description>
                                                    </List.Content>
                                                </List.Item>
                                            ))
                                        }
                                    </List>
                                </Segment>
                            </SegmentGroup>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Wrapper>
    );
};

const infoMapDispatchToProps = dispatch => bindActionCreators({fetchStoresAttendances}, dispatch);

export default connect(undefined, infoMapDispatchToProps)(Info);
