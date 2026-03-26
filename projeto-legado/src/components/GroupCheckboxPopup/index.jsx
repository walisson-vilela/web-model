import * as PropTypes from 'prop-types';
import { Button, Checkbox, Popup } from 'semantic-ui-react';

import { Icomoon } from '..';
import { Content } from './style';

const GroupCheckboxPopup = ({on, basic, position, options, style = {}}) => {
  return (
    <Popup
      on={on}
      basic={basic}
      position={position}
      trigger={
        <Button icon style={{marginRight: 0, ...style}} type={"button"}>
          <Icomoon name={'filter link'}/>
        </Button>
      }
    >
      <Content>
        {
          options.map((option, index) => (
            <Checkbox
              toggle
              key={index}
              checked={option.checked}
              label={option.text}
              onChange={(e, {checked}) => option.onChange(checked, option)}
            />
          ))
        }
      </Content>
    </Popup>
  )
};

GroupCheckboxPopup.propTypes = {
  on: PropTypes.oneOf(['click', 'hover']),
  basic: PropTypes.bool,
  position: PropTypes.oneOf(['top center', 'top left', 'top right', 'bottom center', 'bottom left', 'bottom right', 'right center', 'left center']),
  options: PropTypes.array.isRequired
};

GroupCheckboxPopup.defaultProps = {
  on: 'click',
  basic: false,
  position: 'bottom right',
};

export default GroupCheckboxPopup;
