import React from "react";
import PropTypes from "prop-types";
import Dataset from "./Dataset.mjs";
import Result from "./Result.mjs";

function ResultSet({ dataset, segmentIndex, setSegmentIndex }) {
    let output = dataset.segmentCSV(segmentIndex);

    return <>
        <h5>Use the links below to download your output files</h5>
        <button className="btn btn-secondary" onClick={() => setSegmentIndex(null)}>Reset Header/Column Selection</button>
        {output.map(result => <Result key={result["segment"]} result={result} />)}
    </>;
}

ResultSet.propTypes = {
    dataset: PropTypes.instanceOf(Dataset),
    segmentIndex: PropTypes.arrayOf(PropTypes.number)
};

export default ResultSet;