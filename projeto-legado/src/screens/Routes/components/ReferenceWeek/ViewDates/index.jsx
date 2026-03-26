import { isUndefined } from 'lodash';
import moment from 'moment';
import * as Proptypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-semantic-toasts';
import { bindActionCreators } from 'redux';
import { change, Field, FieldArray, reduxForm } from 'redux-form';
import { renderDays, renderDaysRadio } from './utils';

import { Button, Dimmer, Form, Loader } from 'semantic-ui-react';
import { Checkbox } from '../../../../../components';
import { Container, Footer } from './style';

import { deleteRouteEventsByDates } from '../../../../../redux/actions/RoutesVersionEventsActions';

class ViewDates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    /**
     * Envia formulário para API.
     *
     * @returns {Promise<void>}
     */
    handleSubmit = async () => {
        await this.setState({loading: true});

        const values = {...this.props.forms.values};
        const dates = await values.dates.filter((date) => date.checked).map((date) => (date.date));
        const send_object = {
            future: values.future_events,
            dates: values.future_events ? [values.date] : [...dates]
        };

        try {
            await this.props.deleteRouteEventsByDates(this.props.version_id, send_object);
            await toast({
                type: 'success',
                title: 'Sucesso!',
                description: 'Itens removidos com sucesso!',
                animation: 'bounce',
                time: 5000
            });
            await this.setState({loading: false});
            await this.props.toggle();
            await this.props.events();
        } catch (e) {
            await this.setState({loading: false});
            console.error(e);
        }
    };

    /**
     * Reset form.
     *
     * @param checked
     * @returns {Promise<void>}
     */
    handleClearDate = async (checked = false) => {
        const {form, items} = this.props;

        if (checked === false) {
            this.props.dispatch(change(form, 'date', ''));
        }

        this.props.dispatch(change(form, 'future_events', checked));
        this.props.dispatch(change(form, 'dates', items));
    };

    render() {
        const {reference, toggle, pristine, submitting, valid} = this.props;
        const {values} = this.props.forms ? this.props.forms : {};

        return (
            <Form onSubmit={this.handleSubmit}>
                <Dimmer inverted active={this.state.loading}>
                    <Loader inverted/>
                </Dimmer>

                <Container>
                    <h5>
                        {moment.utc(reference).format('dddd')}
                        {(values && !isUndefined(values.dates)) && `(${values.dates.length})`}
                    </h5>

                    <FieldArray
                        name={'dates'}
                        component={(values && values.future_events) ? renderDaysRadio : renderDays}
                    />
                </Container>
                <Footer>
                    <div>
                        <p>Remover todos os eventos de repetição futuros.</p>
                        <Field
                            name={'future_events'}
                            component={Checkbox}
                            type={'text'}
                            toggle
                            onChange={(e) => this.handleClearDate(e)}
                        />
                    </div>
                    <div>
                        <Button
                            type={'button'}
                            onClick={() => toggle()}
                            content={'Voltar'}
                            className={'bg-transparent text-underline'}
                        />

                        <Button
                            color={'red'}
                            content={'Remover'}
                            disabled={Boolean(pristine || submitting || !valid)}
                        />
                    </div>
                </Footer>
            </Form>
        )
    }
}

ViewDates.propTypes = {
    reference: Proptypes.object.isRequired,
    version_id: Proptypes.string.isRequired,
    events: Proptypes.func.isRequired,
    items: Proptypes.array,
    toggle: Proptypes.func
};

ViewDates.defaulProps = {
    items: [],
    toggle: (() => {})
};

ViewDates = reduxForm({
    form: 'ViewDates',
    enableReinitialize: true
})(ViewDates);

const mapStateToProps = (state, ownProps) => {
    const {ViewDates} = state.form;

    return {
        forms: ViewDates,
        initialValues: {
            future_events: false,
            dates: ownProps.items,
            date: ''
        }
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({deleteRouteEventsByDates}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ViewDates);
