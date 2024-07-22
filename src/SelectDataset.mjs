import React, { createRef } from "react";
import PropTypes from "prop-types";
import Dataset from "./Dataset.mjs";
import { FileSizeFormatter } from "./Formatters.mjs";

function SelectDataset({ dataset, setDataset }) {
    const fileinputref = createRef();

    function loadFile(event) {
        event.preventDefault();

        let filearray = Array.from(fileinputref.current.files);

        if (filearray.length > 0) {
            let newdataset = new Dataset(filearray[0]);
            newdataset.parse().then(() => setDataset(newdataset));
        }
    }

    return <>
        {dataset instanceof Dataset ?
            <>
                <div><strong>{dataset.file.name}</strong> {dataset.file.type} {FileSizeFormatter.format(dataset.file.size)}</div>
                <button onClick={() => setDataset(null)} className="btn btn-secondary">Select a Different File</button>
            </>
            : <form className="form" onSubmit={loadFile}>
                <label className="form-label" htmlFor="file-input">Select a File</label>
                <input type="file" id="file-input" ref={fileinputref} className="form-control" onChange={loadFile} accept="text/csv,.csv" />
            </form>
        }
    </>;
}

SelectDataset.propTypes = {
    dataset: PropTypes.instanceOf(Dataset),
    setDataset: PropTypes.func.isRequired
};

export default SelectDataset;