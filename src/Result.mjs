import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FileSizeFormatter } from "./Formatters.mjs";

function Result({ result }) {
    const [downloadURL, setDownloadURL] = useState();
    useEffect(() => {
        let url = URL.createObjectURL(result.file);
        setDownloadURL(url);
        return () => {
            setDownloadURL(null);
            URL.revokeObjectURL(url);
        };
    }, [result.file]);

    return <div>
        <span className="badge text-bg-primary">{result["bodyrows"]} Rows</span> <strong>{downloadURL ? <a href={downloadURL} download={result.file.name}>{result.file.name}</a> : result.file.name}</strong> {result.file.type} {FileSizeFormatter.format(result.file.size)}
    </div>;
}

Result.propTypes = {
    result: PropTypes.object.isRequired
};

export default Result;