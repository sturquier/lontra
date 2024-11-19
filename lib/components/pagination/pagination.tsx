'use client';

import Image from 'next/image';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss'

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
      className={styles.pagination}
      pageClassName={styles['pagination-page']}
      previousClassName={styles['pagination-previous']}
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
      nextClassName={styles['pagination-next']}
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
      activeClassName={styles['pagination-page-active']}
      breakClassName={styles['pagination-break']}
    />
  )
}