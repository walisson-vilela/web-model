import JWTDecode from 'jwt-decode';
import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Dimmer, Dropdown, Loader } from 'semantic-ui-react';
import { MultiContractor } from '..';
import { Empty, Icomoon } from '../../../../../components';
import { STORAGE } from '../../../../../constants/AppTypesConstants';
import { getContractorGroup } from '../../../../../redux/actions/ContractorsActions';
import { Container, Content, Contractor } from './style';

const ManageSubcontractors = (props) => {
    const cookies = new Cookies();

    const {
        onSubmit,
        getContractorGroup,
        contractor
    } = props;

    const [subcontractors, setSubcontractors] = useState([]);
    const [loading, setLoading] = useState(false);

    /**
     * register contractor
     *
     * @param contractors
     * @returns {Promise<void>}
     */
    const handleSubmitContractor = async (contractors) => {
        const defParams = {
            subcontractors: {
                _ids: [
                    ...contractors.map((contract) => contract.id),
                    ...subcontractors.map((contracts) => contracts.id)
                ]
            }
        };

        await setLoading(true);

        try {
            await onSubmit(defParams);
            await handleGetEvents();
        } catch (e) {
            await console.error(e)
        } finally {
            await setLoading(false);
        }
    };

    /**
     * remove contractor
     *
     * @param id
     * @returns {Promise<void>}
     */
    const handleRemoveContractor = async (id) => {
        const defParams = {
            subcontractors: {
                _ids: subcontractors.filter((contract) => contract.id !== id).map((contract) => contract.id)
            }
        };

        await setLoading(true);

        try {
            await onSubmit(defParams);
            await handleGetEvents();
        } catch (e) {
            console.error(e);
        } finally {
            await setLoading(false);
        }
    };

    const handleGetEvents = async () => {
        const group = JWTDecode(cookies.get(STORAGE.USER).token).payload;

        await setLoading(true);

        try {
            const request = await getContractorGroup(contractor, group.contractor);
            await setSubcontractors(request.data.subcontractors);
        } catch (e) {
            await console.error(e)
        } finally {
            await setLoading(false);
        }
    };

    /**
     * get subcontractors in mount component
     */
    useEffect(() => {
        // noinspection JSIgnoredPromiseFromCall
        handleGetEvents();
    }, []);

    return (
        <Container>
            <MultiContractor
                onAdded={(contractors) => handleSubmitContractor(contractors)}
                contractors={subcontractors}
            />

            <Content>
                <Dimmer inverted active={loading}>
                    <Loader inverted/>
                </Dimmer>

                <h1>multicontas adicionadas ({subcontractors.length})</h1>

                <div className="__articles">
                    {
                        isEmpty(subcontractors) &&
                        <div className="__empty">
                            <Empty
                                title={'Nenhum registro encontrado'}
                                description={'Utilize o campo acima para cadastrar multicontas.'}
                                image={''}
                            />
                        </div>
                    }

                    {
                        subcontractors.map((contractor, index) => (
                            <Contractor key={index}>
                                <img src="https://react.semantic-ui.com/images/wireframe/image.png" alt="Logo"/>
                                {contractor.detail.name}
                                <Dropdown icon={<Icomoon name={'more-vertical'}/>}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => handleRemoveContractor(contractor.id)}
                                            content={'Excluir'}
                                        />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Contractor>
                        ))
                    }
                </div>
            </Content>
        </Container>
    )
};

ManageSubcontractors.propTypes = {
    onSubmit: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    contractor: state.Users.content.result.data.user.contractor.id
});

const mapDispatchToProps = dispatch => bindActionCreators({getContractorGroup}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageSubcontractors);


