import React from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { RiSearchLine } from "react-icons/ri";
import Pagination from "../../PaginationTable/Pagination";



export function GlobalFilter({ filter, setFilter }) {
    return (
        <>
            <div className="flex  items-center   py-1 px-2 rounded-lg  shadow-sm border-[1px] border-bgclr">
                <RiSearchLine className="text-2xl mr-2  text-primary bg-white" />
                <input
                    type="text"
                    placeholder="Search"
                    value={filter || ""} onChange={(e) => setFilter(e.target.value)}
                    className=" rounded-md outline-none py-2 p-1 bg-cardBg text-primary " />
            </div>
        </>
    );
}


function SmallTable({ columns, data, headline }) {
    const memoisedColumns = React.useMemo(() => {
        return columns;
    }, [columns]);

    const memoisedData = React.useMemo(() => {
        return data;
    }, [data]);

    const tableInstance = useTable({
        columns: memoisedColumns,
        data: memoisedData,
    });

    // const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize, globalFilter },
        setGlobalFilter
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        useSortBy,
        usePagination,

    )

    // console.log(pageOptions.length)
    // console.log(page)

    return (
        <div className="bg-white py-1 rounded-md   w-full">
            


            <div className="p-1 bg-white rounded-md mt-1  w-auto lg:w-full overflow-hidden overflow-x-auto flex items-center justify-center">
                <table {...getTableProps()} className="w-auto lg:w-full pt-3  h-auto rounded-md ">
                    <thead className="rounded-lg">
                        {headerGroups.map((headerGroup, ind) => (
                            <tr {...headerGroup.getHeaderGroupProps()} key={ind} >
                                {headerGroup.headers.map((column, i) => (
                                    <th key={i} {...column.getHeaderProps(column.getSortByToggleProps())} className="bg-bgclr text-primary  text-center    p-2 ">{column.render('Header')}
                                        <span>
                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>


                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row, i)
                            return (
                                (i % 2 == 1) ? <tr {...row.getRowProps()} key={i} className="m-2 p-1.5 text-center  ">
                                    {row.cells.map((cell, i) => {
                                        return <td key={i} {...cell.getCellProps()} className="m-2 p-1.5 text-center bg-bgclr  text-primary  ">{cell.render('Cell')}</td>
                                    })}
                                </tr> :
                                    <tr {...row.getRowProps()} key={i} className="m-2 p-1.5 text-center ">
                                        {row.cells.map((cell, i) => {
                                            return <td key={i} {...cell.getCellProps()} className="m-2 p-1.5 text-center  text-primary  ">{cell.render('Cell')}</td>
                                        })}
                                    </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

           
        </div>
    );
}

export default SmallTable;



