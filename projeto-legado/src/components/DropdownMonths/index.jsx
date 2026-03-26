import moment from 'moment';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import ReactCalendar from 'react-calendar';
import { Icon, Menu, Popup } from 'semantic-ui-react';

import './index.css';

export class DropdownMonths extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            month: '',
            current: new Date(),
            popup: false
        };
    }

    onTogglePopup = () => this.setState(prevState => ({
        popup: !prevState.popup
    }));

    onSetValueMonth = month => {
        let current = new Date();
        current.setMonth(moment(month).month());

        this.setState({
            month: moment(month).format('MMMM'),
            current
        }, () => {
            this.props.onChange(moment(month).format(this.props.format));
            this.onTogglePopup();
        });
    };

    render() {
        const {month, current, popup} = this.state;

        return (
            <Popup
                basic
                on={'click'}
                position={'bottom center'}
                className={'dropdown-months'}
                open={popup}
                onOpen={() => this.onTogglePopup()}
                onClose={() => this.onTogglePopup()}
                content={
                    <ReactCalendar
                        value={current}
                        onClickMonth={(value) => this.onSetValueMonth(value)}
                        maxDetail={'year'}
                        className={'year'}
                    />
                }
                trigger={
                    <Menu.Item className={'dropdown-months'} link>
                        <strong>{month && month}</strong>
                        <span style={{fontWeight: '700', color: 'var(--black-30)'}}>{!month && 'Mês'}</span>
                        <Icon name={'caret down'}/>
                    </Menu.Item>
                }
            />
        );
    }
}

DropdownMonths.propTypes = {
    onChange: PropTypes.func,
    format: PropTypes.string
};

DropdownMonths.defaultProps = {
    onChange: () => {
    },
    format: 'YYYY-MM-DD'
};
