import { findIndex, isEmpty } from "lodash";
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Grid, Header, List, Segment } from 'semantic-ui-react';

import { EventManagerContext } from "..";
import { fetchStoresAttendances } from '../../../../redux/actions/StoresActions';
import { dateDuration, timeDiff } from '../../../../utils/DateTime';
import { Wrapper } from "./style";

const Container = ({title, loading = false, style = {}, children}) => {
    return (
        <Segment.Group>
            <Header attached={"top"} content={title}/>
            <Segment loading={loading} style={style}>{children}</Segment>
        </Segment.Group>
    );
}

const StoreDetails = ({title, event}) => (
    <Container title={title}>
        {
            event.id
                ?
                <Fragment>
                    <h5>Código: {event.code}</h5>
                    <h4>{event.title}</h4>
                    <p>{event.formatted_address}</p>
                </Fragment>
                :
                <Fragment>
                    <h4>Sem destino</h4>
                </Fragment>
        }
    </Container>
);

const Others = ({event}) => {
    const distance = (parseInt(event.distance) / 1000).toFixed(2);
    const time_trip = dateDuration(event.time_trip);
    const ta = timeDiff(event.start, event.end);

    return (
        <Container title={"Outrans Informações"}>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header
                            size={"tiny"}
                            content={"Distância"}
                            subheader={`${distance}km`}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Header
                            size={"tiny"}
                            content={"Tempo de Deslocamento"}
                            subheader={time_trip}
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Header
                            size={"tiny"}
                            content={"Hist. de Visita"}
                            subheader={"---/--- (--%)"}
                        />
                    </Grid.Column>
                    <Grid.Column>
                        <Header
                            size={"tiny"}
                            content={"Tempo de Atendimento"}
                            subheader={ta}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

const BaseVisits = ({store_id, fetchStoresAttendances}) => {
    const [visits, setVisits] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            setLoading(true);
            try {
                const res = await fetchStoresAttendances(store_id, 'by-people', {});
                setVisits(res.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, []);

    return (
        <Container title={"Últimas Visitas"} loading={loading} style={{height: 128.19, overflow: "auto"}}>
            <List divided relaxed>
                {
                    visits.map((res, key) => (
                        <List.Item key={key}>
                            <List.Content>
                                <List.Header>{res.people.name}</List.Header>
                                <List.Description>
                                    {!isEmpty(res.people.profiles) && res.people.profiles[0].name}
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))
                }
            </List>
        </Container>
    );
}
const infoMapDispatchToProps = dispatch => bindActionCreators({fetchStoresAttendances}, dispatch);
const Visits = connect(undefined, infoMapDispatchToProps)(BaseVisits);
// export default connect(undefined, infoMapDispatchToProps)(Info);


export const Info = () => {

    const {item} = useContext(EventManagerContext);
    const {event, events} = item;

    const next = useMemo(() => {
        let items = events.filter((o) => o.start.getDay() === event.start.getDay());
        let index = findIndex(items, (o) => {
            return o.event_id === event.event_id;
        });

        let next = items[index+1] || {};

        return next;

    }, [item]);

    // const [visits, setVisits] = useState([]);
    // const [loading, setLoading] = useState(false);

    // useEffect(() => {
    //     async function getData() {
    //         setLoading(true);
    //         try {
    //             const res = await fetchStoresAttendances(event.id, 'by-people', {});
    //             setVisits(res.data);
    //         } catch (e) {
    //             console.log(e);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //
    //     getData();
    // }, []);
    //
    return (
        <Wrapper>
            <Segment basic className={"mt-0"}>
                <Grid>
                    <Grid.Row columns={2} stretched>
                        <Grid.Column>
                            <StoreDetails title={"Origem"} event={event}/>
                        </Grid.Column>
                        <Grid.Column>
                            <StoreDetails title={"Destino"} event={next}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={2} stretched>
                        <Grid.Column>
                            <Others event={event}/>
                        </Grid.Column>
                        <Grid.Column>
                            <Visits store_id={event.id}></Visits>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Wrapper>
    );
};
