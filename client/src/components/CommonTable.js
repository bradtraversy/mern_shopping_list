import React, { useEffect, useMemo, useRef } from 'react'
import { useTable, usePagination, useSortBy, useFilters } from 'react-table'
import ReactPaginate from 'react-paginate'

const AVAILABLE_PAGE_SIZES = [10, 20, 50, 100]
export const DEFAULT_PAGE_SIZE = 100
const CommonTable = ({
  columns,
  data,
  count,
  controlledTableState,
  fetchData,
  loading
}) => {
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  )
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    // Get the state from the instance
    state: { pageIndex, pageSize, filters, sortBy }
  } = useTable(
    {
      defaultColumn,
      manualPagination: true,
      manualFilters: true,
      initialState: {
        pageIndex: controlledTableState.pageIndex,
        filters: controlledTableState.filters,
        pageSize: controlledTableState.pageSize,
        sortBy: controlledTableState.sortBy
      },
      columns,
      data,
      pageCount: controlledTableState.pageCount
    },
    useFilters,
    useSortBy,
    usePagination
  )
  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    fetchData({ pageIndex, pageSize, filters, sortBy })
  }, [fetchData, pageIndex, pageSize, filters, sortBy])

  // Render the UI for your table
  return (
    <div className='surf-table-container'>
      <div className='overflow-auto'>
        <table className='table common-table' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, hgi) => (
              <tr key={hgi} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, hi) => (
                  <th
                    key={hi}
                    {...column.getHeaderProps([
                      column.getSortByToggleProps(),
                      {
                        ...(typeof column.width === 'string' && {
                          width: column.width
                        })
                      }
                    ])}
                  >
                    <div className='d-flex flex-column'>
                      <span
                        className={
                          column.headerConfig && column.headerConfig.className
                            ? column.headerConfig.className
                            : 'text-center'
                        }
                        {...(column.headerConfig && {
                          style: column.headerConfig
                        })}
                      >
                        {column.render('Header')}
                        {column.canSort ? (
                          <span
                            className={`sort-icon mx-1 fa ${
                              column.isSorted
                                ? column.isSortedDesc
                                  ? 'fa-sort-down'
                                  : 'fa-sort-up'
                                : 'fa-sort sort-inactive'
                            }`}
                          />
                        ) : null}
                      </span>
                      <div
                        className='filter-container'
                        onClick={e => e.stopPropagation()}
                      >
                        {column.canFilter ? column.render('Filter') : null}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, ri) => {
              prepareRow(row)
              return (
                <tr
                  key={ri}
                  {...row.getRowProps({
                    className: 'surf-list-row'
                  })}
                >
                  {row.cells.map((cell, ci) => {
                    return (
                      <td
                        key={ci}
                        {...cell.getCellProps({
                          className: 'position-relative'
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
            <tr>
              {loading ? (
                // Use our custom loading state to show a loading indicator
                <td colSpan='10000'>Loading...</td>
              ) : (
                <td colSpan='10000'>{count} total</td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
      <div className='d-flex'>
        <div className='flex-fill' />
        <ReactPaginate
          previousLabel='previous'
          nextLabel='next'
          breakLabel='...'
          breakClassName='break-me'
          forcePage={pageIndex}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={d => gotoPage(d.selected)}
          containerClassName='pagination m-0'
          subContainerClassName='pages pagination'
          previousClassName='page-item'
          nextClassName='page-item'
          pageClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          pageLinkClassName='page-link'
          activeClassName='active'
        />
        <div className='mx-1 align-self-center'>
          <Select2
            style={{ width: '100%' }}
            onChange={e => setPageSize(e.target.value)}
            value={pageSize}
            data={AVAILABLE_PAGE_SIZES}
            options={{
              minimumResultsForSearch: -1
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CommonTable

const DefaultColumnFilter = ({ column: { filterValue, _, setFilter } }) => {
  return (
    <input
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
    />
  )
}

export const CommonTableStatusIconCss = {
  color: 'red',
  fontSize: '1.5em',
  position: 'absolute',
  top: 'calc(50% - 1em/2)',
  right: 'calc(50% - 1em/2)'
}
