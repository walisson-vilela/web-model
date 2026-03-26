import faker from 'faker';
import { findIndex, indexOf, isArray, isEmpty, isFunction } from 'lodash';
import * as PropTypes from 'prop-types';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Checkbox, Dropdown, Header, Input, Menu, Segment, Table as ReactTable } from "semantic-ui-react";
import { Icomoon } from '..';
import { gridsCheck, gridsRefresh } from "../../redux/actions/GridsActions";
import Indicators from '../../screens/Routes/components/Indicators';
import Table from '../Table';

faker.locale = "pt_BR";

class Manager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      limit: 20,
      search: '',
      icon: 'search link',
      visible: false
    };

    this.onSearch = this.onSearch.bind(this);
    this.onChangeLimit = this.onChangeLimit.bind(this);
  }

  componentWillMount() {
    this.props.gridsRefresh(this.props.table);
  }

  onSearch = (value, key = null) => {
    if (key !== 'Enter') {
      return;
    }

    this.setState({
      search: value,
      icon: value ? 'x link' : 'search link'
    }, () => {
      this.props.onPageChange({
        page: 1,
        limit: this.state.limit,
        q: value ? value : null
      });
      // this.refs.search.focus();
    });
  };

  onChangeLimit = limit => this.setState({
    limit: parseInt(limit)
  }, () => this.props.onPageChange({ page: 1, limit: this.state.limit, q: this.state.search }));

  activeSearch = () => {
    this.setState({
      visible: true
    },
      // () => this.refs.search.focus()
    );
  };

  inactivateSearch = () => {
    const { search } = this.state;

    isEmpty(search) &&
      this.setState({
        visible: false
      })
  };

  handleRemove = async () => {
    const {crud, grid, table, gridsCheck} = this.props;
    const checks = [...grid[table]];

    if (isFunction(crud.delete)) {
      await crud.delete(checks[0]);
    }

    if (isFunction(crud.deleteMany)) {
      await crud.deleteMany(checks);
    }

    // await checks.shift();
    // await this.props.gridsCheck(table, checks, true);
    await gridsCheck(table, checks, true);
  };

  render() {
    const { search, icon } = this.state;
    const {
      sortable, header, subheader, result, isLoading,
      onPageChange, headerRow, renderBodyRow,
      haveSearch, crud, grid, table, label, indicators
    } = this.props;

    let checked = isArray(grid[table]) ? grid[table] : [];
    let all = isArray(result.data) && result.data.map((row) => {
      return row.id;
    });

    const itemView = result.data ? result.data[findIndex(result.data, (o) => {
      return o.id === checked[0]
    })] : {};

    return (
      <React.Fragment>
        <Segment
          className={`header_${table}`}
          attached={'top'}
          style={{ borderBottom: (crud.add || crud.edit || crud.view || crud.delete || crud.refresh) ? 0 : undefined, borderTop: 0 }}
        >
          <Header className={'mb-0'}>
            <Header.Content>
              {header}
              <Header.Subheader style={{ paddingTop: '4px', fontSize: 16, color: "#263046B3" }}>
                {subheader}
              </Header.Subheader>
            </Header.Content>
            {
              indicators &&
              <Indicators />
            }
            {
              this.props.complement && <>{this.props.complement}</>
            }
          </Header>
        </Segment>

        {
          (crud.add || crud.edit || crud.view || crud.delete || crud.refresh) && <Menu attached={'top'} icon style={{ height: 42 }}>
            {[
              (crud.add && typeof crud.add === "object") &&
              <Menu.Item key='add-object'>
                {crud.add}
              </Menu.Item>,
              (crud.add && typeof crud.add === "function") &&
              <Menu.Item
                link
                key='add-function'
                onClick={() => crud.add()}
              >
                <Icomoon name='plus-circle' title={!label.add ? 'Adicionar' : undefined} />
                {
                  label.add &&
                  <span style={{ marginLeft: '.5rem' }}>{label.add}</span>
                }
              </Menu.Item>,
              crud.view &&
              <Menu.Item
                link
                key='view'
                disabled={checked.length !== 1}
                onClick={() => crud.view(itemView)}
              >
                <Icomoon name='file-text' title={!label.view ? 'Visualizar' : undefined} />
                {
                  label.view &&
                  <span>{label.view}</span>
                }
              </Menu.Item>,
              crud.edit &&
              <Menu.Item
                link
                key='edit'
                disabled={checked.length !== 1}
                onClick={() => crud.edit(checked[0])}
              >
                <Icomoon name='edit' title={!label.edit ? 'Editar' : undefined} />
                {
                  label.edit &&
                  <span>{label.edit}</span>
                }
              </Menu.Item>,
              (crud.delete || crud.deleteMany) &&
              <Menu.Item
                link
                key='delete'
                disabled={crud.deleteMany ? !checked.length : checked.length !== 1}
                onClick={() => this.handleRemove()}
              >
                <Icomoon name='trash-2' title={!label.delete ? 'Excluir' : undefined}/>
                {
                  label.delete &&
                  <span>{label.delete}</span>
                }
              </Menu.Item>,
              crud.refresh &&
              <Menu.Item
                link
                key='refresh'
                disabled={isLoading}
                onClick={
                  () => {
                    crud.refresh();
                    this.props.gridsRefresh(table);
                  }
                }
              >
                <Icomoon name='rotate-cw' rotate={isLoading}
                  title={!label.refresh ? 'Atualizar' : undefined} />
                {
                  label.refresh &&
                  <span>{label.refresh}</span>
                }
              </Menu.Item>
            ]}

            {
              !isEmpty(this.props.handleOptions) &&
              <Dropdown
                icon={<Icomoon name={'more-vertical'} />}
                className={'link item'}
                selectOnBlur={false}
              >
                <Dropdown.Menu>
                  {
                    this.props.handleOptions.map(option => (
                      <Dropdown.Item
                        key={option.key}
                        onClick={() => this.props.handleActionOptions(option.value, checked)}
                        disabled={option.disabled ? isEmpty(checked) : false}
                      >
                        {option.text}
                      </Dropdown.Item>
                    ))
                  }
                </Dropdown.Menu>
              </Dropdown>
            }

            <Menu.Menu
              position='right'
            >
              {[
                // haveSearch && !visible &&
                // <Menu.Item
                //     key={'toggleSearch'}
                //     style={{marginTop: '1.5px', marginBottom: 1}}
                //     content={
                //         <Icomoon
                //             name={'search'}
                //             title={'Pesquisar'}
                //         />
                //     }
                //     onClick={
                //         () => this.activeSearch()
                //     }
                // />,
                haveSearch &&
                <Menu.Item
                  key='search'
                  className={'animated fadeIn'}
                >
                  <Input
                    transparent
                    // ref={'search'}
                    value={search}
                    onChange={(e, data) => this.setState({ search: data.value })}
                    onKeyPress={(e) => this.onSearch(e.target.value, e.key)}
                    onBlur={() => this.inactivateSearch()}
                    placeholder='Pesquisar...'
                    icon={
                      <Icomoon
                        name={icon}
                        onClick={
                          () => {
                            this.onSearch(icon === 'x link' ? '' : search, 'Enter');
                          }
                        }
                      />
                    }
                  />
                </Menu.Item>
              ]}
              {
                this.props.onFiltersToolbar &&
                this.props.onFiltersToolbar
              }
            </Menu.Menu>
          </Menu>
        }
        <Table
          celled={this.props.celled}
          sortable={sortable}
          result={result}
          isLoading={isLoading}
          onPageChange={onPageChange}
          classname={`manager_${table}`}
          headerRow={
            <ReactTable.Row>
              {
                !this.props.onlyView && <ReactTable.HeaderCell
                  textAlign={'center'}
                  verticalAlign={'middle'}
                  style={{ width: '48px' }}
                  content={
                    <Checkbox
                      style={{
                        verticalAlign: 'middle'
                      }}
                      checked={all.length > 0 && checked.length === all.length}
                      disabled={all.length === 0}
                      onChange={
                        (e, data) => {
                          this.props.gridsCheck(
                            table,
                            data.checked ? all : []
                            , true
                          );
                        }
                      }
                    />
                  }
                />
              }
              {headerRow}
            </ReactTable.Row>
          }
          renderBodyRow={(row) => {
            return (
              <ReactTable.Row
                key={row.id}
                className={this.props.className}
              //active={indexOf(checked, row.id) > -1}
              /*
              onClick={
                  (e) => {
                      (crud.view && ReactDom.findDOMNode(e.target).tagName !== 'LABEL') && crud.view(row.id);
                  }
              }
              */
              >
                {
                  !this.props.onlyView && <ReactTable.Cell
                    textAlign={'center'}
                    verticalAlign={'middle'}
                    content={
                      <Checkbox
                        style={{
                          verticalAlign: 'middle'
                        }}
                        checked={indexOf(checked, row.id) > -1}
                        onChange={
                          () => {
                            this.props.gridsCheck(table, row.id);
                          }
                        }
                      />
                    }
                  />
                }

                {renderBodyRow(row)}
              </ReactTable.Row>
            );
          }}
          onChangeLimit={(limit) => this.onChangeLimit(limit)}
          onGetFilters={this.props.onGetFilters}
          onRemoveFilters={(key) => this.props.onRemoveFilters(key)}
          reset={() => this.props.reset()}
          filterTags={this.props.filterTags}
        />
      </React.Fragment>
    );
  }
}

Manager.propTypes = {
  celled: PropTypes.bool,
  onlyView: PropTypes.bool,
  sortable: PropTypes.bool,
  table: PropTypes.string,
  header: PropTypes.string,
  subheader: PropTypes.string,
  result: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  isLoading: PropTypes.bool,
  onPageChange: PropTypes.func,
  headerRow: PropTypes.object,
  renderBodyRow: PropTypes.func,
  haveSearch: PropTypes.bool,
  crud: PropTypes.object,
  label: PropTypes.object,
  handleOptions: PropTypes.array,
  onFiltersToolbar: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  onRemoveFilters: PropTypes.func,
  indicators: PropTypes.bool,
  className: PropTypes.string,
  reset: PropTypes.func,
  handleActionOptions: PropTypes.func,
  filterTags: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  complement: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
};

Manager.defaultProps = {
  celled: true,
  onlyView: false,
  sortable: false,
  table: '',
  header: faker.lorem.word(),
  subheader: faker.lorem.sentence(),
  result: {},
  isLoading: false,
  onPageChange: () => {
  },
  headerRow: {},
  renderBodyRow: () => {
  },
  haveSearch: true,
  crud: {},
  label: {},
  handleOptions: [],
  onFiltersToolbar: false,
  indicators: false,
  className: '',
  reset: (() => {
  }),
  handleActionOptions: (() => { }),
  filterTags: false,
  complement: false,
};

const mapStateToProps = (state) => {
  return {
    grid: state.Grids
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gridsCheck: (key, value, toggle = null) => {
      dispatch(gridsCheck(key, value, toggle));
    },
    gridsRefresh: key => {
      dispatch(gridsRefresh(key));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
