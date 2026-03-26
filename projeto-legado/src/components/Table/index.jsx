import PropTypes from 'prop-types';
import { Component } from 'react';
import { Container, Segment, Table as ReactTable } from 'semantic-ui-react';

import { PaginationMW } from '..';
import { Filter } from './components';
import { EmptyData } from './components/EmptyData';
import { ContentPagination } from './style';

export default class Table extends Component {
  render() {
    const { isLoading, sortable, classname, result, onGetFilters, onRemoveFilters, reset } = this.props;


    return (

      <Segment
        attached
        loading={isLoading}
        style={{
          padding: 0,
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          height: 0,
        }}
      //className={'h-100'}
      >
        <Segment
          basic
          id='fixedHeader'
          // placeholder={(result.data && result.data.length === 0)}
          className={'h-100 p-0'}
        >
          {[
            (result.data && result.data.length > 0) &&
            <ReactTable
              sortable={sortable}
              key={'table-fill'}
              basic='very'
              fixed
              selectable
              celled={this.props.celled}
              headerRow={this.props.headerRow}
              tableData={result.data}
              renderBodyRow={this.props.renderBodyRow}
              className={classname}
            />,
            (result.data && result.data.length === 0) &&
            <>
              <ReactTable
                sortable={sortable}
                key={'table-fill'}
                basic='very'
                fixed
                selectable
                celled={this.props.celled}
                headerRow={this.props.headerRow}
                tableData={result.data}
                className={classname}
                renderBodyRow={this.props.renderBodyRow}
              />
              <Container text key={'empty-table'} style={{ marginTop: '2rem' }}>
                <EmptyData />
              </Container>
            </>
          ]}

        </Segment>
        {
          result.pagination &&
          <ContentPagination>
            {
              this.props.filterTags
                ? <>{this.props.filterTags}</>
                : <Filter
                  records={onGetFilters}
                  handleRemove={id => onRemoveFilters(id)}
                  reset={() => reset()}
                />
            }
            <PaginationMW
              pagination={result.pagination}
              onPageChange={this.props.onPageChange}
              onLimitChange={(limit) => this.props.onChangeLimit(limit)}
              style={{ padding: '1rem .4rem' }}
            />
          </ContentPagination>
        }
      </Segment>
    );
  }
}

Table.propTypes = {
  sortable: PropTypes.bool,
  vertical: PropTypes.bool,
  celled: PropTypes.bool,
  onGetFilters: PropTypes.array,
  onClearFiltersPopup: PropTypes.func,
};

Table.defaultProps = {
  sortable: false,
  vertical: false,
  celled: true,
  onGetFilters: [],
  onClearFiltersPopup: () => {
  },
  filterTags: false
};


