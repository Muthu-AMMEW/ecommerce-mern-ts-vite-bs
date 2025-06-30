declare module 'react-js-pagination' {
  import * as React from 'react';

  interface PaginationProps {
    activePage: number;
    itemsCountPerPage: number;
    totalItemsCount: number;
    pageRangeDisplayed?: number;
    onChange(pageNumber: number): void;
    itemClass?: string;
    linkClass?: string;
    activeClass?: string;
    activeLinkClass?: string;
    disabledClass?: string;
    hideDisabled?: boolean;
    hideNavigation?: boolean;
    hideFirstLastPages?: boolean;
    prevPageText?: string | React.ReactNode;
    nextPageText?: string | React.ReactNode;
    firstPageText?: string | React.ReactNode;
    lastPageText?: string | React.ReactNode;
  }

  export default class Pagination extends React.Component<PaginationProps> {}
}
