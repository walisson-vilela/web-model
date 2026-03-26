import * as PropTypes from 'prop-types';
import { Component, createRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProfiles } from '../../redux/actions/ProfilesActions';

import { Tab } from 'semantic-ui-react';
import { Multiselect } from '../../components';
import { General, PlanningWindow } from './components';
import { Container } from './style';

const multiselectRef = createRef();

class Configure extends Component {
    /**
     * Constructor.
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {}
    }

    /**
     * componentDidMount
     * Executa funções ao iniciar componente.
     */
    componentDidMount() {
        const didMount = async () => {
            await this.handleChangeTitleTab('Configurações');
        };

        didMount().then();
    }

    /**
     * Altera título da TAB.
     *
     * @param title
     * @returns {Promise<void>}
     */
    handleChangeTitleTab = async (title) => {
        await this.props.setTitle(this.props.location.pathname, title, 'map');
    };

    render() {
        const configurePanes = [
            {
                menuItem: 'Geral',
                render: () => <Tab.Pane attached={false}>
                    <General/>
                </Tab.Pane>
            }, {
                menuItem: 'Janela de Planejamento',
                render: () => <Tab.Pane attached={false}>
                    <PlanningWindow toggleModal={() => multiselectRef.current.toggleModal()}/>
                </Tab.Pane>
            }
        ];

        return (
            <Fragment>
                <Container>
                    <Tab menu={{secondary: true, pointing: true}} panes={configurePanes}/>
                </Container>

                <Multiselect
                    ref={multiselectRef}
                    header={[
                        {
                            key: 0,
                            text: 'Usuários',
                            data: (param) => this.props.fetchProfiles(param)
                        }
                    ]}
                    content={{
                        0: (row) => (
                            <Fragment>{row.id} | {row.name}</Fragment>
                        )
                    }}
                    applied={{
                        0: () => console.log('Aplicar dados')
                    }}
                    subtitle={'Configuração/Janela de planejamento.'}
                    getStarter={() => this.props.fetchProfiles({page: 2})}
                />
            </Fragment>
        )
    }
}

Configure.propTypes = {
    setTitle: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    closeCurrent: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchProfiles
}, dispatch);

export default connect(undefined, mapDispatchToProps)(Configure);
