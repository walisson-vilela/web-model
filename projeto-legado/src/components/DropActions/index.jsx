import { isEmpty } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Dropdown } from 'semantic-ui-react';

import { Icomoon } from '..';

const DropActions = (props) => {
  const {icon, text, menu, options} = props;

  const [open, setOpen] = useState(false);

  /**
   * Toggle Dropdown
   *
   * @returns {Promise<void>}
   */
  const handleToggleDropdown = async () => {
    await setOpen(!open);
  };

  /**
   * Change action item
   *
   * @param action
   * @returns {Promise<void>}
   */
  const handleChangeAction = async (action) => {
    await action();
    await handleToggleDropdown();
  };

  if (menu) {
    return (
      <Dropdown
        text={text}
        icon={!isEmpty(icon) && <Icomoon name={icon}/>}
        className={'item link'}
        onOpen={() => handleToggleDropdown()}
        onClose={() => handleToggleDropdown()}
        open={open}
      >
        <Dropdown.Menu>
          {
            options.map((option) => (
              <Dropdown.Item
                key={option.key}
                text={option.text}
                onClick={() => handleChangeAction(option.action)}
                disabled={option.disabled || false}
              />
            ))
          }
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  return <React.Fragment/>
};

DropActions.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  menu: PropTypes.bool,
  options: PropTypes.array.isRequired,
  maintain: PropTypes.bool
};

DropActions.defaultProps = {
  menu: false,
  maintain: false
};

export default DropActions;
