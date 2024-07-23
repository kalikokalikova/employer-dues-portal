import React, { useState } from "react";
import SelectDataset from "./SelectDataset.mjs";
import TablePreview from "./TablePreview.mjs";

export default function App() {
    const [dataset, setDataset] = useState(null);

    return <>
        <h1>cut-mailing-list</h1>
        <p>A program that accepts a spreadsheet file, then produces separate output files segmented by a column in the data. Current implementation is csv only.</p>
        <SelectDataset dataset={dataset} setDataset={setDataset} />
        {dataset !== null ? <TablePreview dataset={dataset} /> : null}
    </>;
}