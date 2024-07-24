import React, { useEffect, useState } from "react";
import SelectDataset from "./SelectDataset.mjs";
import TablePreview from "./TablePreview.mjs";
import { validation } from "./validator.js";

export default function App() {
  const [dataset, setDataset] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    if (dataset) {
      let result = validation(dataset);
      setDisplayData(result);
    }
  }, [dataset]);

  return (
    <>
      <h1>cut-mailing-list</h1>
      <p>
        A program that accepts a spreadsheet file, then produces separate output
        files segmented by a column in the data. Current implementation is csv
        only.
      </p>
      <SelectDataset dataset={dataset} setDataset={setDataset} />
      {displayData !== null ? <TablePreview dataset={displayData} /> : null}
    </>
  );
}
