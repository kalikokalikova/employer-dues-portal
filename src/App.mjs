import React, { useState } from "react";
import SelectDataset from "./SelectDataset.mjs";
import TablePreview from "./TablePreview.mjs";
import ResultSet from "./ResultSet.mjs";

export default function App() {
    const [dataset, setDataset] = useState(null);
    const [segmentIndex, setSegmentIndex] = useState(null);
    function setDatasetSafe(value) {
        setDataset(value);
        setSegmentIndex(null);
    }

    return <>
        <h1>cut-mailing-list</h1>
        <p>A program that accepts a spreadsheet file, then produces separate output files segmented by a column in the data. Current implementation is csv only.</p>
        <SelectDataset dataset={dataset} setDataset={setDatasetSafe} />
        {dataset !== null && segmentIndex === null ? <TablePreview dataset={dataset} setSegmentIndex={setSegmentIndex} /> : null}
        {dataset !== null && segmentIndex !== null ? <ResultSet dataset={dataset} segmentIndex={segmentIndex} setSegmentIndex={setSegmentIndex} /> : null}
    </>;
}