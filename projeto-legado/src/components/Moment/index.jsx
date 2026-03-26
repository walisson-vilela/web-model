import { isArray, isString } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Component } from "react";

export class Moment extends Component {
    render() {

        const {date, glue, format, test, start, end, utc} = this.props;

        if (!test)
        {
            return null;
        }

        if (isString(date))
        {
            return (
                <time>
                    {start}
                    {moment(date).utc(utc).format(format)}
                    {end}
                </time>
            );
        }

        if (isArray(date))
        {
            return (
                <time>
                    {start}
                    {moment(date[0]).utc(utc).format(format)}
                    {` ${glue} `}
                    {moment(date[1]).utc(utc).format(format)}
                    {end}
                </time>
            );
        }

    }
}

Moment.propTypes = {
    date: PropTypes.any,
    format: PropTypes.string,
    glue: PropTypes.string,
    test: PropTypes.bool,
    start: PropTypes.string,
    end: PropTypes.string,
    utc: PropTypes.bool
};

Moment.defaultProps = {
    date: '',
    format: 'L',
    glue: 'à',
    test: true,
    start: '',
    end: '',
    utc: false
};
