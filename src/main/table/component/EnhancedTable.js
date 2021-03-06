import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import MaUTable from '@material-ui/core/Table'
import PropTypes from 'prop-types'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './TablePaginationActions'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableToolbar from './TableToolbar'
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'
import styled from "styled-components";

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, total, selected, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);

    return <Checkbox ref={resolvedRef} {...rest}
                indeterminate={selected > 0 && selected < total}
                checked={total > 0 && selected === total} />
  }
);

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
  outlineColor: 'hsl(0 0% 83% / 1)', /* for focus state */
};

const MaUTableStyled = styled(MaUTable)`
    table-layout: fixed;
    min-width: 856px;
    width: calc(100% - 70px);   /* First with drawer menu collapsed, adjust screen width at the minimum viewable width (f.e. it will depend on how many columns you have) and fill the adequate pixels to substract so there is no horizontal scroll. Then see how width you table is and with that value fill min-width */
    tr > th, tr > td {
      padding: 0 10px;    
    }
    tr > td > input {
      max-width: -webkit-fill-available;
    }    
`;

const TableHeadStyled = styled(TableHead)`
    white-space: nowrap; 
    tr > th:nth-child(7) {
      width: 131px;    
    }
`;

// Create an editable cell renderer
const EditableCell = ({
                        value: initialValue,
                        row: { index },
                        column: { id },
                        updateMyData, // This is a custom function that we supplied to our table instance
                      }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value)
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue]);

  return (
    <input
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  )
};

EditableCell.propTypes = {
  value: PropTypes.any.isRequired,
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  updateMyData: PropTypes.func.isRequired,
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

const EnhancedTable = ({
                         columns,
                         data,
                         setData,
                         updateMyData,
                         skipPageReset,
                       }) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 10 },
      defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push((columns, { instance }) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({ getToggleAllRowsSelectedProps }) => {
            const { rows, state: { selectedRowIds }} = instance;
            return <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} total={rows.length} selected={Object.keys(selectedRowIds).length} />
          },
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
        },
        ...columns,
      ])
    }
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value))
  };

  const removeByIndexes = (array, indexes) =>
    array.filter((_, i) => !indexes.includes(i));

  const deleteUserHandler = _event => {
    const newData = removeByIndexes(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10))
    );
    setData(newData)
  };

  const addUserHandler = user => {
    const newData = data.concat([user]);
    setData(newData)
  };

  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteUserHandler={deleteUserHandler}
        addUserHandler={addUserHandler}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTableStyled {...getTableProps()}>
        <TableHeadStyled>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHeadStyled>
        <TableBody>
          {page.map((row, _i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: 'All', value: data.length },
              ]}
              colSpan={5}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTableStyled>
    </TableContainer>
  )
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
};

export default EnhancedTable
