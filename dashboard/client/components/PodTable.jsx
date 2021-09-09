/*
 * *****************************************************************************
 * @description ????????
 * *****************************************************************************
 */

import React from 'react';
import { useTable } from 'react-table';
import lineColors from '../assets/colors';

export default function PodTable({ columns, data, newClick, clickedArray }) {
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable({
    columns,
    data,
  });

  function changeColor(id) {
    const row = document.getElementById(id);
    if (row.style.color === 'orange') {
      row.style.color = 'gray';
    } else row.style.color = 'orange';
  }

  return (
    <div className='pod-table'>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                className='table-row'
                id={index}
                {...row.getRowProps()}
                onClick={() => changeColor(index)}>
                {row.cells.map((cell, i) => {
                  return (
                    <td
                      className={`column${i}`}
                      onClick={() => {
                        newClick(row.original.podName);
                      }}
                      {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
