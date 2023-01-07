import { useEffect, useState} from 'react';
import eventStorage from "./EventStorage";
import React from 'react';
import { useTable } from 'react-table';

const EventsTable = ({columns, events}) => {
  // const [events, setEvents] = useState([]);
  // // retrieve list
  // useEffect(() => {
  //   eventStorage.emitter.addListener('GET_EVENTS_SUCCESS', () => {
  //       setEvents(eventStorage.data);
  //   });
  //   eventStorage.getEvents();

  // }, []); 
  events = ["aaaa","aaa"];
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
  } = useTable({
    columns, events,
  });

  return (
    <div>
      <h4>Events list</h4>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row,i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className ="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

    </div>
  )
}

export default EventsTable;