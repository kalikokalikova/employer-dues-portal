import React, { useState } from "react";
import PropTypes from "prop-types";

function TablePreview({ dataset }) {
  const [rowLimit, setRowLimit] = useState(5);

  let displayedrows = dataset.slice(0, rowLimit);

  return (
    <>
      <table className="table">
        <tbody>
          {displayedrows.map((row, rowindex) => (
            <tr key={rowindex}>
              {row.map((cell, cellindex) => (
                <td key={cellindex}>{String(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {displayedrows.length < dataset.length ? (
        <>
          <div>
            <strong>
              {dataset.length - displayedrows.length} more rows are hidden.
            </strong>
          </div>
          <div className="btn-group">
            <button
              className="btn btn-primary"
              onClick={() => setRowLimit(rowLimit + 5)}
            >
              Show 5 More
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setRowLimit(dataset.length)}
            >
              Show All Rows
            </button>
          </div>
        </>
      ) : null}
    </>
  );
}

TablePreview.propTypes = {
  dataset: PropTypes.array,
};

export default TablePreview;
