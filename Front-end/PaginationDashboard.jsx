import next from '../assets/Icons/next.svg';
import left_arrow from '../assets/Icons/left-arrow.svg';
import right_arrow from '../assets/Icons/right-arrow.svg';

const PaginationDashboard = ({ currentPage, totalPages, onPageChange }) => {
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-dashboard">
      <div className="next-page-button">
        <button
          type="button"
          className="next-page"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
          <img src={next} alt="next" className="next" />
        </button>
      </div>
      <div className="pagination-control">
        <div className="current-page">
          <p className="page">Page</p>
          <button type="button">{currentPage}</button>
          <p className="total-pages">of {totalPages}</p>
        </div>
        <div className="pagination-controls">
          <button
            type="button"
            className="next-page-arrow"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <img src={left_arrow} alt="previous" />
          </button>
          <button
            type="button"
            className="next-page-arrow"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <img src={right_arrow} alt="next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationDashboard;
