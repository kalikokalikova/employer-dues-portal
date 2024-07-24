import csv from "papaparse";

export default class Dataset {
  file;
  originaldata;
  modifieddata;
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
          this.originaldata = results.data;
          this.modifieddata = results.data;
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

  exportCSVFile() {
    //Split original filename into name and extension parts
    let match = /^(.+)(\.\w+)$/g.exec(this.file.name);
    return new File(
      [csv.unparse(this.modifieddata, this.csvmetadata)],
      `${match[1]} - validated${match[2]}`, //Generate a new filename
      { type: this.file.type }
    );
  }
}
