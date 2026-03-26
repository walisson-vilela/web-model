import moment from 'moment';
import { Field } from 'redux-form';

import { Checkbox, InputRadio } from '../../../../../components';
import { required } from '../../../../../utils/Validate';
import { Item } from './style';

export const renderDays = ({fields}) => (
    fields.map((field, index) => {
        const {date} = fields.get(index);

        return (
            <Item key={index}>
                <Field
                    name={`${field}.checked`}
                    component={Checkbox}
                    type={'text'}
                    label={moment(date).format('DD/MM/YYYY')}
                />
            </Item>
        )
    })
);

export const renderDaysRadio = ({fields}) => (
    fields.map((field, index) => {
        const {date} = fields.get(index);

        return (
            <Item key={index}>
                <Field
                    name={'date'}
                    component={InputRadio}
                    type={'radio'}
                    label={moment(date).format('DD/MM/YYYY')}
                    value={date}
                    validate={[required]}
                />
            </Item>
        )
    })
);
