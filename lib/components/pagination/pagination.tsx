'use client';

import Image from 'next/image';
import ReactPaginate from 'react-paginate';

import './pagination.scss'

interface IPaginationProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: ({ selected }: { selected: number }) => void;
}

export default function Pagination ({ totalPages, currentPage, handlePageChange }: IPaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      className='pagination'
      pageClassName='pagination-page'
      previousClassName='pagination-previous'
      previousLabel={
        currentPage === 1
        ? <></>
        : <Image
          src="/icons/caret-left.svg"
          alt="Caret left icon"
          width={30}
          height={30}
        />
      }
      nextClassName='pagination-next'
      nextLabel={
        currentPage === totalPages
        ? <></>
        : <Image
          src="/icons/caret-right.svg"
          alt="Caret right icon"
          width={30}
          height={30}
        />
      }
      activeClassName='pagination-page-active'
      breakClassName='pagination-break'
    />
  )
}