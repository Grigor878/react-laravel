import React from "react";

export const Pagination = ({ currentPage, lastPage, setPage }) => {
  const renderButtons = () => {
    const buttons = [];
    for (let i = 1; i <= lastPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`bloginfo__pagination-button ${
            currentPage === i ? "bloginfo__pagination-buttonActive" : ""
          }`}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return <div className="bloginfo__pagination">{renderButtons()}</div>;
};
