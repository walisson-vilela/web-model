import * as PropTypes from 'prop-types';
import React, { Component } from 'react';

import { isEmpty } from 'lodash';
import ReactCalendar from "react-calendar";
import { Popup } from "semantic-ui-react";

import moment from "moment";
import { InputMask } from ".";
import { Icomoon } from "..";

const localeData = () => moment.localeData().longDateFormat('L');

export class InputDate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open = () => {
        this.setState({
            open: true
        });
    };

    close = () => {
        this.setState({
            open: false
        });
    };

    render() {
        const {open} = this.state;
        const {input, meta, minDate, maxDate, tomorrow, year} = this.props;

        let dateBetween = {};
        let _date_ = new Date();

        if (year) {
            dateBetween = {
                minDate: new Date(year, 0, 1),
                maxDate: new Date(year, 11, 31),
            };
        }

        if (meta.valid) {
            let newMinDate = false;
            let newMaxDate = false;

            if (!isEmpty(minDate)) {
                let _newMinDate = moment(minDate, localeData(), true);
                if (_newMinDate.isValid()) {
                    newMinDate = _newMinDate.toDate();
                }
            }

            if (!isEmpty(maxDate)) {
                let _newMaxDate = moment(maxDate, localeData(), true);
                if (_newMaxDate.isValid()) {
                    newMaxDate = _newMaxDate.toDate();
                }
            }
            /*
                        if(newMinDate && newMaxDate){
                            alert('juntos');
                            if(newMinDate.isSameOrBefore(newMaxDate)){
                                dateBetween['minDate'] = newMinDate.toDate();
                            }

                            if(newMaxDate.isSameOrAfter(newMinDate)){
                                dateBetween['maxDate'] = newMaxDate.toDate();
                            }
                        }
            */

            if (newMinDate && newMinDate < dateBetween['maxDate']) {
                dateBetween['minDate'] = newMinDate;
            }

            if (newMaxDate) {
                dateBetween['maxDate'] = newMaxDate;
            }
        }

        let newDate = moment(input.value, localeData(), true).utc();
        if (newDate.isValid()) {
            _date_ = newDate.toDate();
        }

        const today = new Date();

        let tomorrow_ = undefined;
        if (tomorrow) {
            tomorrow_ = new Date();
            tomorrow_.setDate(today.getDate() + 1);
        }

        return (
            <React.Fragment>
                <Popup
                    trigger={
                        <InputMask
                            {...this.props}
                            icon={true}
                            mask={'99/99/9999'}
                        />
                    }
                    on={'click'}
                    open={open}
                    onOpen={this.open}
                    onClose={this.close}
                    position={'right center'}
                    content={
                        <ReactCalendar
                            value={_date_}
                            minDate={tomorrow_}
                            calendarType={'US'}
                            {...dateBetween}
                            onClickDay={
                                (date) => {
                                    input.onChange(moment(date).utc().format('L'));
                                    this.close();
                                }
                            }
                            formatMonthYear={
                                (locale, date) => {
                                    return moment(date).utc().format('MMMM YYYY')
                                }
                            }
                            formatShortWeekday={
                                (locale, date) => {
                                    return moment(date).utc().format('ddd')
                                }
                            }
                            showNeighboringMonth={false}
                            prevLabel={
                                <Icomoon name={'chevron-left'} direct />
                            }
                            nextLabel={
                                <Icomoon name={'chevron-right'} direct />
                            }
                            className={year ? ['year'] : null}
                        />
                    }
                    flowing
                    hoverable
                />
            </React.Fragment>
        );
    }
}

InputDate.propTypes = {
    year: PropTypes.number
};

InputDate.defaultProps = {
    year: 0
};
