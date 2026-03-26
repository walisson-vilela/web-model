import axios from 'axios';
import fileDownload from 'js-file-download';
import { isEmpty } from 'lodash';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Dimmer, Loader, Popup, Progress, Tab } from 'semantic-ui-react';

import { Empty, Icomoon } from '../../../../components';
import { dateCountdown, dateGet } from '../../../../utils/DateTime';
import { Container, ContainerPopup, ContentChildren, ProgressPopup, StepPopup, Without } from './style';

const MyCard = (props) => {
    const {id, proposed_by_user, approved_by_user, window, step, without, isLoading, progress, downloading} = props;
    const {profiles} = proposed_by_user;
    const {approval_end, proposal_end, proposal_start} = window;

    const [open, setOpen] = useState(false);

    /**
     * extract window
     *
     * @returns {Promise<void>}
     */
    const handleExtract = async () => {
        await downloading(true);
        await setOpen(false);

        try {
            const request = await axios({
                url: `https://itambe2018.${window['domain']}/extracao_roteiro_new/extrair_janela.php?route_window_id=${id}`,
                method: 'GET',
                responseType: 'blob'
            });

            await fileDownload(request.data, `roteiro${moment.utc().format('YYYYMMDDHHmmss')}.xls`);
        } catch (e) {
            await console.log(e);
        } finally {
            await downloading(false);
        }
    };

    const planning = dateCountdown(proposal_end, 24);
    const audit = dateCountdown(approval_end, 24);
    const title = `Etapa da ${step === 1 ? 'Planejamento' : 'Auditoria'}`;

    let responsible = {...approved_by_user, profiles: [{name: 'COORDENADOR'}]};

    if (step === 1) {
        responsible = proposed_by_user;
    }

    const panes = [
        {
            menuItem: 'Etapa de Planejamento',
            render: () => <Tab.Pane attached={false}>
                <ContainerPopup>
                    <h3>{title}</h3>

                    <StepPopup>
                        <div>
                            <div>
                                <p>ID: {id}</p>
                                <p>Responsável: {responsible.name}</p>
                                <p>{responsible.id} / {responsible.document}</p>
                            </div>
                            <div>
                                <p>Função: {!isEmpty(responsible.profiles) && responsible.profiles[0].name}</p>
                                <p>Hierarquia: {!isEmpty(profiles) && profiles[0].name}</p>
                            </div>
                            <div>
                                <p>Mês de
                                    referência: {dateGet(proposal_start, 'MMMM')}/{dateGet(proposal_start, 'YYYY')}</p>
                                <p>Período da
                                    Janela: {dateGet(proposal_start, 'DD/MM')} a {dateGet(approval_end, 'DD/MM')}</p>
                            </div>
                        </div>
                        <div>
                            <Progress percent={progress} size={'tiny'} color={'blue'}/>
                            <ProgressPopup disabled={(step === 2)}>
                                <h5>Planejamento</h5>
                                <p>Encerra: {dateGet(proposal_end, 'dddd')} - {dateGet(proposal_end, 'DD/MM/YYYY')}</p>
                                <p>Tempo restante: {planning.days} dia(s) {planning.hours}h e {planning.minutes}min</p>
                            </ProgressPopup>
                            <ProgressPopup disabled={(step === 1)}>
                                <h5>Auditoria</h5>
                                <p>Encerra: {dateGet(approval_end, 'dddd')} - {dateGet(approval_end, 'DD/MM/YYYY')}</p>
                                <p>Tempo restante: {audit.days} dia(s) {audit.hours}h e {audit.minutes}min</p>
                            </ProgressPopup>
                        </div>
                    </StepPopup>

                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', marginTop: '1rem'}}>
                        <Button
                            content={'Extrair Planejamento'}
                            color={'facebook'}
                            onClick={() => handleExtract()}
                        />
                    </div>
                </ContainerPopup>
            </Tab.Pane>
        }, {
            menuItem: 'Colaboradores',
            render: () => <Tab.Pane attached={false}>
                <ContainerPopup>
                    <h3>Colaboradores sem Rotas</h3>

                    <Without style={{height: 0, flex: 1}}>
                        <h5>Colaboradores sem rotas: <span>{without.length}</span></h5>
                        <ul>
                            {
                                without.length === 0 ?
                                    <Empty
                                        image={''}
                                        description={'Nenhum colaborador sem rota foi encontrado.'}
                                    /> :
                                    without.map((res, index) => (
                                        <li key={index}>
                                            <hgroup>
                                                <h1>{res.name}</h1>
                                                <h5>
                                                    {!isEmpty(res.profiles) && res.profiles[0].name}
                                                    {!isEmpty(res.profiles) && res.id ? ' / ' : ''}
                                                    {res.id}
                                                </h5>
                                            </hgroup>
                                        </li>
                                    ))
                            }
                        </ul>
                    </Without>
                </ContainerPopup>
            </Tab.Pane>
        }
    ];

    return (
        <Container>
            <Dimmer active={isLoading} inverted>
                <Loader inverted/>
            </Dimmer>

            <Popup
                basic
                on={'click'}
                position={'right center'}
                trigger={<Icomoon name={'external-link'} link onClick={() => setOpen(true)}/>}
                offset={'200px'}
                open={open}
                onClose={() => setOpen(false)}
            >
                <Tab menu={{secondary: true, pointing: true}} panes={panes}/>
            </Popup>

            <ContentChildren>
                <h3>{title}</h3>
                <p>ID: {id}</p>
                <p>Responsável: {responsible.name}</p>
                <p>{responsible.id} / {responsible.document}</p>
            </ContentChildren>
        </Container>
    )
};

MyCard.propTypes = {
    id: PropTypes.number,
    proposed_by_user: PropTypes.object,
    approved_by_user: PropTypes.object,
    window: PropTypes.object,
    step: PropTypes.number,
    without: PropTypes.array,
    isLoading: PropTypes.bool,
    progress: PropTypes.number,
    downloading: PropTypes.func.isRequired
};

MyCard.defaultProps = {
    id: 0,
    proposed_by_user: {},
    approved_by_user: {},
    window: {},
    step: 0,
    without: [],
    isLoading: false,
    progress: 0
};

export default MyCard;
