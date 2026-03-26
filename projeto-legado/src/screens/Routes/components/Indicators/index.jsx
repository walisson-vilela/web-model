import { Component } from 'react';
import { Button, Container, Grid, Header, Popup, Progress, Segment } from 'semantic-ui-react';
import { Icomoon } from '../../../../components';

import './style.css';

export default class Indicators extends Component {
    render() {
        return (
            <Popup
                flowing
                on={'click'}
                position={'bottom right'}
                className={'popupMW'}
                trigger={
                    <Button
                        content={'Indicadores'}
                        floated={'right'}
                        size={'tiny'}
                        color={'blue'}
                        icon={
                            <Icomoon
                                name={'area-graph'}
                            />
                        }
                    />
                }
                content={
                    <Grid
                        columns={'equal'}
                    >
                        <Grid.Row>
                            <Grid.Column>
                                <Segment
                                    style={{backgroundColor: 'var(--black-80)'}}
                                    className={'segmentMW'}
                                >
                                    <Header
                                        as={'h6'}
                                        content={'PDA NÃO ROTEIRIZADOR'}
                                    />
                                    <Header
                                        as={'h2'}
                                        content={'31.72%'}
                                    />
                                    <Progress
                                        size={'tiny'}
                                        percent={11}
                                    />
                                    <Container
                                        text
                                        fluid
                                        content={'De 100. 020 PDA | 31.720 (31.72%), estão sem atendimento provicionado'}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment
                                    style={{backgroundColor: 'var(--blue)'}}
                                    className={'segmentMW'}
                                >
                                    <Header
                                        as={'h6'}
                                        content={'COLABORADORES SEM ROTA'}
                                    />
                                    <Header
                                        as={'h2'}
                                        content={'64.29%'}
                                    />
                                    <Progress
                                        size={'tiny'}
                                        percent={11}
                                    />
                                    <Container
                                        text
                                        fluid
                                        content={'De 1.000 colaborador(es) | 642 (64.29%), estão sem roteiro de visita'}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment
                                    style={{backgroundColor: 'var(--green)'}}
                                    className={'segmentMW'}
                                >
                                    <Header
                                        as={'h6'}
                                        content={'ROTEIRO INATIVOS'}
                                    />
                                    <Header
                                        as={'h2'}
                                        content={'30.88%'}
                                    />
                                    <Progress
                                        size={'tiny'}
                                        percent={11}
                                    />
                                    <Container
                                        text
                                        fluid
                                        content={'De 1.000 rotas configuradas | 308 (30.88%), encontra-se inativas'}
                                    />
                                </Segment>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row
                            centered
                            verticalAlign={'top'}
                        >
                            <Grid.Column>
                                <Segment
                                    style={{backgroundColor: 'var(--violet)'}}
                                    className={'segmentMW'}
                                >
                                    <Header
                                        as={'h6'}
                                        content={'TIPO DE ROTA (% / QTDE) - 1.000'}
                                    />
                                    <Grid
                                        divided
                                        columns={3}
                                        textAlign={'center'}
                                    >
                                        <Grid.Row>
                                            <Grid.Column>
                                                <Header
                                                    as={'h4'}
                                                    content={'Programada'}
                                                />
                                                <Header
                                                    as={'h2'}
                                                    content={'67,3 %'}
                                                    subheader={'670'}
                                                />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header
                                                    as={'h4'}
                                                    content={'Carteira'}
                                                />
                                                <Header
                                                    as={'h2'}
                                                    content={'30,1 %'}
                                                    subheader={'300'}
                                                />
                                            </Grid.Column>
                                            <Grid.Column>
                                                <Header
                                                    as={'h4'}
                                                    content={'Programada'}
                                                />
                                                <Header
                                                    as={'h2'}
                                                    content={'3.69 %'}
                                                    subheader={'37'}
                                                />
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column>
                                <Segment
                                    style={{backgroundColor: 'var(--headers-blue)'}}
                                    className={'segmentMW'}
                                >
                                    <Header
                                        as={'h6'}
                                        content={'TIPO DE ROTA (% / QTDE) - 1.000'}
                                    />
                                    <Header
                                        as={'h2'}
                                        content={'180%'}
                                    />
                                    <Container
                                        text
                                        fluid
                                        style={{margintop: 15}}
                                        content={'De 1.000 rotas | 200 (20%), estão acima dos 100% do tempo provicionado de trabalho de seu executor'}
                                    />
                                </Segment>
                            </Grid.Column>
                            <Grid.Column/>
                        </Grid.Row>
                    </Grid>
                }
            />
        );
    }
}
