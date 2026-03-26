import { isNull } from 'lodash';
import * as PropTypes from 'prop-types';
import { Component } from 'react';

import { Dropdown, Menu, Pagination } from 'semantic-ui-react';
import { Icomoon } from '..';
import './index.css';

const options = [
  {
    key: '20',
    text: '20 por página',
    value: '20',
    content: '20',
  }, {
    key: '40',
    text: '40 por página',
    value: '40',
    content: '40',
  }, {
    key: '60',
    text: '60 por página',
    value: '60',
    content: '60',
  }, {
    key: '80',
    text: '80 por página',
    value: '80',
    content: '80',
  }, {
    key: '100',
    text: '100 por página',
    value: '100',
    content: '100',
  }
];

// const order = [
//   {
//     key: 'Todos',
//     text: 'Todos de A/Z',
//     value: 'Todos',
//     content: 'Todos',
//   }, {
//     key: '0-9',
//     text: 'Todos de 0/9',
//     value: '0-9',
//     content: '0-9',
//   }, {
//     key: 'A/B',
//     text: 'A/B',
//     value: 'A/B',
//     content: 'A/B',
//   }, {
//     key: 'C/D',
//     text: 'C/D',
//     value: 'C/D',
//     content: 'C/D',
//   }, {
//     key: 'E/F',
//     text: 'E/F',
//     value: 'E/F',
//     content: 'E/F',
//   }, {
//     key: 'G/H',
//     text: 'G/H',
//     value: 'G/H',
//     content: 'G/H',
//   }, {
//     key: 'I/J',
//     text: 'I/J',
//     value: 'I/J',
//     content: 'I/J',
//   }, {
//     key: 'K/L',
//     text: 'K/L',
//     value: 'K/L',
//     content: 'K/L',
//   }, {
//     key: 'M/N',
//     text: 'M/N',
//     value: 'M/N',
//     content: 'M/N',
//   }, {
//     key: 'O/P',
//     text: 'O/P',
//     value: 'O/P',
//     content: 'O/P',
//   }, {
//     key: 'Q/R',
//     text: 'Q/R',
//     value: 'Q/R',
//     content: 'Q/R',
//   }, {
//     key: 'S/T',
//     text: 'S/T',
//     value: 'S/T',
//     content: 'S/T',
//   }, {
//     key: 'U/V',
//     text: 'U/V',
//     value: 'U/V',
//     content: 'U/V',
//   }, {
//     key: 'W/Y',
//     text: 'W/Y',
//     value: 'W/Y',
//     content: 'W/Y',
//   }, {
//     key: 'X/Z',
//     text: 'X/Z',
//     value: 'X/Z',
//     content: 'X/Z',
//   }
// ];

export class PaginationMW extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popup: false,
      pagination: {
        count: 0,
        current_page: 1,
        limit: 20,
        page_count: 1
      }
    };
  }

  componentDidMount() {
    const pagination = {
      count: this.props.pagination.count,
      current_page: this.props.pagination.current_page,
      limit: this.props.pagination.limit !== null ? this.props.pagination.limit : 20,
      page_count: this.props.pagination.page_count
    };

    this.setState({ pagination })
  }

  onPageChange = current_page => this.setState(prevState => {
    return {
      pagination: {
        ...prevState.pagination,
        current_page
      }
    }
  }, () => this.props.onPageChange({ page: current_page, limit: this.state.pagination.limit }));

  onLimitChange = limit => this.setState(prevState => {
    return {
      popup: false,
      pagination: {
        ...prevState.pagination,
        limit
      }
    }
  }, () => this.props.onLimitChange(limit));

  onTogglePopup = () => this.setState(prevState => {
    return {
      popup: !prevState.popup
    }
  });

  render() {
    const { dark, transparent, size, position, pagination, menu } = this.props;
    const { count, current_page, page_count, limit } = pagination;

    return (
      <Menu size={size} className={`pagination-mw ${dark ? 'dark' : ''} ${transparent ? 'transparent' : ''} ${this.props.className}`} style={this.props.style}>
        <Menu.Menu position={position}>
          {/*<Dropdown text='Shopping' pointing className='link item'>*/}
          {/*    <Dropdown.Menu>*/}
          {/*        <Dropdown.Header>Categories</Dropdown.Header>*/}
          {/*        <Dropdown.Item>*/}
          {/*            <Dropdown text='Clothing'>*/}
          {/*                <Dropdown.Menu>*/}
          {/*                    <Dropdown.Header>Mens</Dropdown.Header>*/}
          {/*                    <Dropdown.Item>Shirts</Dropdown.Item>*/}
          {/*                    <Dropdown.Item>Pants</Dropdown.Item>*/}
          {/*                    <Dropdown.Item>Jeans</Dropdown.Item>*/}
          {/*                    <Dropdown.Item>Shoes</Dropdown.Item>*/}
          {/*                    <Dropdown.Divider />*/}
          {/*                    <Dropdown.Header>Womens</Dropdown.Header>*/}
          {/*                    <Dropdown.Item>Dresses</Dropdown.Item>*/}
          {/*                    <Dropdown.Item>Shoes</Dropdown.Item>*/}
          {/*                    <Dropdown.Item>Bags</Dropdown.Item>*/}
          {/*                </Dropdown.Menu>*/}
          {/*            </Dropdown>*/}
          {/*        </Dropdown.Item>*/}
          {/*        <Dropdown.Item>Home Goods</Dropdown.Item>*/}
          {/*        <Dropdown.Item>Bedroom</Dropdown.Item>*/}
          {/*        <Dropdown.Divider />*/}
          {/*        <Dropdown.Header>Order</Dropdown.Header>*/}
          {/*        <Dropdown.Item>Status</Dropdown.Item>*/}
          {/*        <Dropdown.Item>Cancellations</Dropdown.Item>*/}
          {/*    </Dropdown.Menu>*/}
          {/*</Dropdown>*/}
          <Menu.Item>{count} Registros</Menu.Item>
          <Menu.Item>
            <Pagination size={size} boundaryRange={0} activePage={current_page} ellipsisItem={null} siblingRange={1} totalPages={page_count} onPageChange={(e, { activePage }) => this.onPageChange(activePage)} />
          </Menu.Item>
          {/*{menu &&*/}
          {/*<Popup*/}
          {/*    basic*/}
          {/*    on={'click'}*/}
          {/*    className={'popup-pagination-mw'}*/}
          {/*    open={this.state.popup}*/}
          {/*    onOpen={() => this.onTogglePopup()}*/}
          {/*    onClose={() => this.onTogglePopup()}*/}
          {/*    trigger={*/}
          {/*        <Menu.Item link><Icomoon name={'more-vertical'}/></Menu.Item>*/}
          {/*    }*/}
          {/*    content={*/}
          {/*        <Menu secondary vertical>*/}
          {/*            <Dropdown item inline options={options} defaultValue={isNull(limit) ? '20' : String(limit)} direction={'left'} onChange={(e, {value}) => this.onLimitChange(value)}/>*/}
          {/*            <Dropdown item inline scrolling options={order} defaultValue={order[0].value} direction={'left'}/>*/}

          {/*        </Menu>*/}
          {/*    }*/}
          {/*/>*/}
          {/*}*/}

          {menu && <Dropdown
            trigger={<Menu.Item link><Icomoon name={'more-vertical'} /></Menu.Item>}
            options={options}
            icon={false}
            onChange={(e, { value }) => this.onLimitChange(value)}
            defaultValue={isNull(limit) ? '20' : String(limit)}
            header={'Registros por Página'}
            className={"no-before"}
          // pointing
          />}
        </Menu.Menu>
      </Menu>
    );
  }
}

PaginationMW.propType = {
  pagination: PropTypes.shape({
    count: PropTypes.number,
    current_page: PropTypes.number,
    limit: PropTypes.number,
    page_count: PropTypes.number
  }),
  transparent: PropTypes.bool,
  dark: PropTypes.bool,
  onPageChange: PropTypes.func,
  className: PropTypes.string,
  position: PropTypes.string,
  size: PropTypes.oneOf(['mini', 'tiny', 'small', 'large', 'huge', 'massive']),
  style: PropTypes.object,
  menu: PropTypes.bool
};

PaginationMW.defaultProps = {
  pagination: {
    count: 0,
    current_page: 1,
    limit: 20,
    page_count: 0
  },
  transparent: false,
  dark: false,
  className: '',
  position: 'right',
  size: 'small',
  style: {},
  menu: true
};
