import React from 'react'
import styled from 'styled-components'
import { useTable } from 'react-table'

import makeData from './makeData'
import {log} from '../../service/util';

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  /*console.log('getTableProps()', getTableProps());

  log({headerGroups});
  console.log('headerGroups[0].getHeaderGroupProps()', headerGroups[0].getHeaderGroupProps());
  console.log('headerGroups[0].headers', headerGroups[0].headers);
  console.log('headerGroups[0].headers[0].getHeaderProps()', headerGroups[0].headers[0].getHeaderProps());

  console.log('getTableBodyProps()', getTableBodyProps());
  log({rows});*/

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row);
        /*if (i === 0) {
          console.log('row.getRowProps()', row.getRowProps());
          console.log('row.cells', row.cells);
        }*/
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              //if (i === 0) {console.log('cell.getCellProps()', cell.getCellProps())}
              return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
            })}
          </tr>
        )
      })}
      </tbody>
    </table>
  )
}

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(20), []);

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default App
