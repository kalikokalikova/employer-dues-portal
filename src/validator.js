// This basic and fragile validator expects a csv with the following columns:
// Id, First Name, Last Name, Employer, Job status, Dues, COPE

// Employer, Dues, and COPE can be blank, but if they exist they should be "moneyish"

// 50 char limit on first and last name

// Job status value should match one of the values in this set
const STATUSES = new Set(["active", "inactive"]);

const isBlank = (data) => {
  return data.length === 0;
};

const isInvalidCurrency = (data) => {
  // This is super basic, needs to also handle strings like "$12.34"
  return isNaN(data);
};

const isTooLong = (data) => {
  return data.length > 50;
};

export const validation = (dataset) => {
  let dataToValidate = dataset.modifieddata.slice(1); // remove header before validating

  dataToValidate.forEach((row) => {
    if (row.length === 7) {
      // check is row has expected number of cells
      let errors = "";
      if (isBlank(row[0])) {
        // Id
        errors = errors + "Id row can't be blank. ";
      }
      if (isBlank(row[1]) || isBlank(row[2])) {
        // first and last name
        errors = errors + "Name rows can't be blank. ";
      }
      if (isTooLong(row[1]) || isTooLong(row[2])) {
        // first and last name
        errors = errors + "Name rows need to be fewer than 50 characters. ";
      }
      if (!STATUSES.has(row[4])) {
        errors = errors + "Invalid job status. ";
      }
      if (isInvalidCurrency(row[5]) || isInvalidCurrency(row[6])) {
        errors = errors + "Invalid currency amount. ";
      }
      row.push(errors);
    }
  });
  return dataToValidate;
};
