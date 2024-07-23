import csv from "papaparse";

export default class Dataset {
  file;
  rawdata;
  printabledata;
  csvmetadata;

  constructor(file) {
    this.file = file;
  }

  parse() {
    return this.parseCSVFile();
  }

  parseCSVFile() {
    return new Promise((resolve, reject) => {
      csv.parse(this.file, {
        complete: (results) => {
          console.log("parse results: ", results);
          this.rawdata = results.data;
          this.printabledata = results.data;
          this.csvmetadata = {
            delimiter: results.meta["delimiter"],
            linebreak: results.meta["linebreak"],
          };
          resolve();
        },
        error: reject,
      });
    });
  }

  segmentCSV(coordinateIndex) {
    let headers = this.rawdata.slice(0, coordinateIndex[0] + 1);
    let body = this.rawdata.slice(coordinateIndex[0] + 1);

    let segments = {};
    body.forEach((row) => {
      let indexvalue = row[coordinateIndex[1]];
      if (indexvalue in segments) {
        segments[indexvalue].push(row);
      } else {
        segments[indexvalue] = [row];
      }
    });

    let match = /^(.+)(\.\w+)$/g.exec(this.file.name);
    let output = [];
    for (let key in segments) {
      let contents = headers.concat(segments[key]);
      output.push({
        segment: key,
        headerrows: headers.length,
        bodyrows: segments[key].length,
        file: new File(
          [csv.unparse(contents, this.csvmetadata)],
          match[1] + ` - ${key.replace(/[^0-9a-zA-Z-\._ ]/g, "")}` + match[2],
          { type: this.file.type }
        ),
      });
    }
    return output;
  }
}
