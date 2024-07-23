import React, { useState } from "react";
import PropTypes from "prop-types";
import Dataset from "./Dataset.mjs";

function TablePreview({ dataset }) {
    const [rowLimit, setRowLimit] = useState(5);

    let displayedrows = dataset.printabledata.slice(0, rowLimit);

    return <>
        <table className="table">
            <tbody>
                {displayedrows.map((row, rowindex) =>
                    <tr key={rowindex}>
                        {row.map((cell, cellindex) => <td
                            key={cellindex}
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
    dataset: PropTypes.instanceOf(Dataset)
};

export default TablePreview;