import React, { useState } from "react";
import PropTypes from "prop-types";
import Dataset from "./Dataset.mjs";

function TablePreview({ dataset, setSegmentIndex }) {
    const [rowLimit, setRowLimit] = useState(5);
    const [hoverCoordinates, setHoverCoordinates] = useState([-1, -1]);

    let displayedrows = dataset.printabledata.slice(0, rowLimit);

    return <>
        <h5>Hover your mouse over the table below. Rows in <span className="badge text-bg-primary">blue</span> will be headers, and appear in every output file. The values of cells in <span className="badge text-bg-success">green</span> will be used to segment the output files. Click on the cell to finalize your selection.</h5>
        <table className="table" onMouseLeave={() => setHoverCoordinates([-1, -1])}>
            <tbody>
                {displayedrows.map((row, rowindex) =>
                    <tr key={rowindex}>
                        {row.map((cell, cellindex) => <td
                            key={cellindex}
                            onMouseEnter={() => setHoverCoordinates([rowindex, cellindex])}
                            onClick={() => setSegmentIndex([rowindex, cellindex])}
                            className={hoverCoordinates[0] >= rowindex ? "bg-primary text-white fw-bold" : (hoverCoordinates[1] == cellindex ? "bg-success text-white fw-bold" : null)}
                        >{String(cell)}</td>)}
                    </tr>
                )}
            </tbody>
        </table>
        {displayedrows.length < dataset.printabledata.length ? <>
            <div><strong>{dataset.printabledata.length - displayedrows.length} more rows are hidden.</strong></div>
            <div className="btn-group">
                <button className="btn btn-primary" onClick={() => setRowLimit(rowLimit + 5)}>Show 5 More</button>
                <button className="btn btn-primary" onClick={() => setRowLimit(dataset.printabledata.length)}>Show All Rows</button>
            </div>
        </> : null}
    </>;
}

TablePreview.propTypes = {
    dataset: PropTypes.instanceOf(Dataset),
    setSegmentIndex: PropTypes.func
};

export default TablePreview;