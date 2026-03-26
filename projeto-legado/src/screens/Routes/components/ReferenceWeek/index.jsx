import Moment from 'moment';
import { extendMoment } from 'moment-range';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Form, Modal } from 'semantic-ui-react';
import { Icomoon } from '../../../../components';
import { Container, Header } from './style';

import ViewDates from './ViewDates';

const moment = extendMoment(Moment);

class ReferenceWeek extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            props: {},
            dates: []
        };
    }

    /**
     * Toggle modal.
     *
     * @param props
     * @returns {Promise<void>}
     */
    toggleModal = async (props = {}) => {
        const {open} = this.state;

        await this.setState({
            open: !open,
            dates: [],
            props
        });

        if (!open) {
            await this.handleSearchDaysOfTheWeek();
        }
    };

    /**
     * Busca dia especifico da semana e salva dados no state local.
     *
     * @returns {Promise<void>}
     */
    handleSearchDaysOfTheWeek = async () => {
        const now = Moment(this.state.props.date).utc();

        const start = now.clone().startOf('month').startOf('week').toDate();
        const end = now.clone().endOf('month').endOf('week').toDate();
        const range = moment.range(start, end);

        let dates = [];

        for (let day of range.by('day')) {
            if (now.weekday() === day.weekday()) {
                await dates.push({
                    date: day.format('YYYY-MM-DD'),
                    checked: false
                })
            }
        }

        await this.setState({dates});
    };

    render() {
        const {open, props, dates} = this.state;

        return (
            <Modal open={open} size={'small'}>
                <Form>
                    <Container>
                        <Header>
                            Remoção de Eventos
                            <Icomoon
                                name={'x link'}
                                onClick={() => this.toggleModal()}
                            />
                        </Header>
                        <ViewDates
                            reference={props.date}
                            items={dates}
                            toggle={() => this.toggleModal()}
                            version_id={this.props.version_id}
                            events={() => this.props.events()}
                        />
                    </Container>
                </Form>
            </Modal>
        )
    }
}

ReferenceWeek.propTypes = {
    version_id: PropTypes.string.isRequired,
    events: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(undefined, mapDispatchToProps, undefined, {forwardRef: true})(ReferenceWeek);
