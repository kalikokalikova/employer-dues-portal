// This validator expects First Name, Last Name, Id #, Employer, Job status, Dues, COPE

// Things that can be blank: Dues, COPE

// 40 char limit on first name, 50 char limit on last name

// Dues, COPE, should be "moneyish"
// strip $
// use Mike's regex to check to be numeric
//('/^[0-9]{1,3}+(?:\.[0-9]{0,2})?$/', INPUT)
var str = "$12.565";
if (str.match(/^[0-9]{1,3}+(?:\.[0-9]{0,2})?$/)) {
    // contains illegal characters
	alert('Good');
} else {
	alert('Bad');
}

// Job status value should match one of the values in an array

export function validator(dataFile) {
  console.log("whoo");
}
