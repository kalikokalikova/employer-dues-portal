// This validator expects First Name, Last Name, Id #, Employer, Job status, Dues, COPE

// Things that can be blank: Dues, COPE

// 40 char limit on first name, 50 char limit on last name

// Dues, COPE, should be "moneyish"
// strip $
// use Mike's regex to check to be numeric
//('/^[0-9]{1,3}+(?:\.[0-9]{0,2})?$/', INPUT)

// Job status value should match one of the values in an array
const validStatuses = new Set(["active", "inactive"]);

const isBlank = (data) => {
  return data.length === 0;
};

const isInvalidCurrency = (data) => {
  return !isNaN(data);
};

const isTooLong = (data) => {
  return data.length > 50;
};

export function validation(dataset) {
  let dataToValidate = dataset.rawdata.slice(1);
  dataToValidate.forEach((row) => {
    console.log("row: ", row);
    if (row.length === 7) {
      let errors = "";
      if (isBlank(row[0])) {
        errors = errors + "Id row can't be blank. ";
      }
      if (isBlank(row[1]) || isBlank(row[2])) {
        errors = errors + "Name rows can't be blank. ";
      }
      if (isTooLong(row[1]) || isTooLong(row[2])) {
        errors = errors + "Name rows need to be fewer than 50 characters. ";
      }
      if (!validStatuses.has(row[4])) {
        errors = errors + "Invalid job status. ";
      }
      if (isInvalidCurrency(row[5]) || isInvalidCurrency(row[6])) {
        errors = errors + "Invalid currency amount. ";
      }
      row.push(errors);
    }
  });

  console.log("whoo");
  return dataToValidate;
}
