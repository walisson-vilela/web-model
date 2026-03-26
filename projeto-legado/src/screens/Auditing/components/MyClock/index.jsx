import * as PropTypes from 'prop-types';
import React, { Fragment } from 'react';

import { dateCountdown, dateGet } from '../../../../utils/DateTime';

const MyClock = ({time}) => {
    const duration = dateCountdown(time, 24);

    return (
        <Fragment>
            <span style={{display: 'block'}}>
                Encerra em: {duration.days} dia(s), {duration.hours}h e {duration.minutes}min
            </span>

            {dateGet(time)} - {dateGet(time, 'dddd')}
        </Fragment>
    )
};

MyClock.propTypes = {
    time: PropTypes.string
};

MyClock.defaultProps = {
    time: '2019-07-17T00:00:00+00:00'
};

export default MyClock;
