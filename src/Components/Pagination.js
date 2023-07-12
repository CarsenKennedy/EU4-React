import React from "react";

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5; // Number of visible page buttons
    const ellipsisThreshold = 2; // Minimum number of pages required to show ellipsis
    const pages = [];
  
    if (totalPages <= maxVisiblePages) {
      // Show all page buttons if the total number of pages is less than or equal to maxVisiblePages
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }
    } else {
        const isStartEllipsisVisible = currentPage > ellipsisThreshold + 1;
        const isEndEllipsisVisible = currentPage < totalPages - ellipsisThreshold;
    
        // Calculate the start and end of the visible range
        let startPage, endPage;
    
        if (isStartEllipsisVisible && isEndEllipsisVisible) {
            startPage = currentPage - Math.floor((maxVisiblePages - 3) / 2);
            endPage = currentPage + Math.ceil((maxVisiblePages - 3) / 2);
            pages.push(1, "...");
        } else if (isStartEllipsisVisible) {
            startPage = totalPages - (maxVisiblePages - 2);
            endPage = totalPages;
            pages.push(1,"...");
        } else if (isEndEllipsisVisible) {
            startPage = 1;
            endPage = maxVisiblePages - 2;
        } else {
            startPage = 1;
            endPage = totalPages;
        }
    
        // Add the visible page buttons
        for (let page = startPage; page <= endPage; page++) {
            pages.push(page);
        }
    
        if (isEndEllipsisVisible) {
            // Show ellipsis and the last page
            pages.push("...", totalPages);
        }
    }
    
        return pages;
    };

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        &lt;
      </button>
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`pagination__button ${page === currentPage ? "pagination__button--active" : ""}`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination__arrow"
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;