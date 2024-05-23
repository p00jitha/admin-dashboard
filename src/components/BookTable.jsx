// import React, { useMemo, useState, useEffect } from 'react';
// import { useTable, useSortBy, usePagination } from 'react-table';
// import { fetchBooks } from '../Api';
// import { CSVLink } from 'react-csv';
// import { Container, Row, Col, Form, Button, Table as BSTable, Pagination } from 'react-bootstrap';
// import './BookTable.css';
// const BookTable = () => {
//   const [data, setData] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [author, setAuthor] = useState('');

//   const columns = useMemo(
//     () => [
//       { Header: 'Title', accessor: 'title' },
//       { Header: 'Author Name', accessor: 'author_name' },
//       { Header: 'First Publish Year', accessor: 'first_publish_year' },
//       { Header: 'Subject', accessor: 'subject' },
//       { Header: 'Ratings Average', accessor: 'ratings_average' },
//       { Header: 'Author Birth Date', accessor: 'author_birth_date' },
//       { Header: 'Author Top Work', accessor: 'author_top_work' },
//     ],
//     []
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     gotoPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     state: { pageIndex, pageSize, sortBy },
//   } = useTable(
//     {
//       columns,
//       data,
//       manualPagination: true,
//       manualSortBy: true,
//       initialState: { pageIndex: 0, pageSize: 10 },
//       pageCount,
//     },
//     useSortBy,
//     usePagination
//   );

//   useEffect(() => {
//     const loadBooks = async () => {
//       setLoading(true);
//       const result = await fetchBooks(pageIndex + 1, pageSize, author);
//       setData(result.docs);
//       setPageCount(Math.ceil(result.numFound / pageSize));
//       setLoading(false);
//     };
//     loadBooks();
//   }, [pageIndex, pageSize, author]);

//   return (
//     <>
//       <Container>
//         <Row className="justify-content-center my-3">
//           <Col md={6}>
//             <Form.Control
//               type="text"
//               placeholder="Search by author and press enter"
//               value={author}
//               onChange={(e) => setAuthor(e.target.value)}
//             />
//           </Col>
//         </Row>
//         <BSTable striped bordered hover {...getTableProps()}>
//           <thead>
//             {headerGroups.map(headerGroup => (
//               <tr {...headerGroup.getHeaderGroupProps()}>
//                 {headerGroup.headers.map(column => (
//                   <th {...column.getHeaderProps(column.getSortByToggleProps())}>
//                     {column.render('Header')}
//                     {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {rows.map(row => {
//               prepareRow(row);
//               return (
//                 <tr {...row.getRowProps()}>
//                   {row.cells.map(cell => (
//                     <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </BSTable>
//         <div className='bottom'>
//         <Row className="my-3">
//           <Col>
//             <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
//               {'<<'}
//             </Button>{' '}
//             <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
//               {'<'}
//             </Button>{' '}
//             <Button onClick={() => nextPage()} disabled={!canNextPage}>
//               {'>'}
//             </Button>{' '}
//             <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
//               {'>>'}
//             </Button>{' '}
//             <span>
//               Page{' '}
//               <strong>
//                 {pageIndex + 1} of {pageOptions.length}
//               </strong>{' '}
//             </span>
//             <Form.Select
//               value={pageSize}
//               onChange={e => setPageSize(Number(e.target.value))}
//               style={{ width: 'auto', display: 'inline-block', marginLeft: '10px' }}
//             >
//               {[10, 20, 30, 40, 50, 100].map(pageSize => (
//                 <option key={pageSize} value={pageSize}>
//                   Show {pageSize}
//                 </option>
//               ))}
//             </Form.Select>
//             <CSVLink
//               data={data}
//               headers={columns.map(col => ({ label: col.Header, key: col.accessor }))}
//               className="btn btn-primary ml-2"
//             >
//               Download CSV
//             </CSVLink>
//           </Col>
//         </Row>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default BookTable;

import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import { fetchBooks } from '../Api';
import { CSVLink } from 'react-csv';
import toast from 'react-hot-toast'
import { Container, Row, Col, Form, Button, Table as BSTable, Pagination } from 'react-bootstrap';
import './BookTable.css';

const BookTable = () => {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState('');

  const columns = useMemo(
    () => [
      { Header: 'Title', accessor: 'title' },
      { Header: 'Author Name', accessor: 'author_name' },
      { Header: 'First Publish Year', accessor: 'first_publish_year' },
      { Header: 'Subject', accessor: 'subject' },
      { Header: 'Ratings Average', accessor: 'ratings_average' },
      { Header: 'Author Birth Date', accessor: 'author_birth_date' },
      { Header: 'Author Top Work', accessor: 'author_top_work' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      manualSortBy: true,
      initialState: { pageIndex: 0, pageSize: 10 },
      pageCount,
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const loadBooks = async () => {
      setLoading(true);
      const toastId = toast.loading('Please wait...');
      try {
        const result = await fetchBooks(pageIndex + 1, pageSize, author);
        if(result)
          {
            toast.success("fetched records")
          }
        setData(result.docs);
        setPageCount(Math.ceil(result.numFound / pageSize));
      } catch (error) {
        toast.error('Failed to fetch author search again');
      } finally {
        toast.dismiss(toastId);
        setLoading(false);
      }
    };
    loadBooks();
  }, [pageIndex, pageSize, author]);

  return (
    <>
      <Container>
        <Row className="justify-content-center my-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="Search by author and press enter"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Col>
        </Row>
        <BSTable striped bordered hover {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </BSTable>
        <div className='bottom'>
        <Row className="my-3">
          <Col>
            <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </Button>{' '}
            <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </Button>{' '}
            <Button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </Button>{' '}
            <Button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
              {'>>'}
            </Button>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <Form.Select
              value={pageSize}
              onChange={e => setPageSize(Number(e.target.value))}
              style={{ width: 'auto', display: 'inline-block', marginLeft: '10px' }}
            >
              {[10, 20, 30, 40, 50, 100].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Form.Select>
            <CSVLink
              data={data}
              headers={columns.map(col => ({ label: col.Header, key: col.accessor }))}
              className="btn btn-primary ml-2"
            >
              Download CSV
            </CSVLink>
          </Col>
        </Row>
        </div>
      </Container>
    </>
  );
};

export default BookTable;
