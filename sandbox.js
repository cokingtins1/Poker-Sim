console.log(convertValue([11, 7])) //[10,9] [9,10]

function convertValue(fullHouseVal) {
	let num1, num2;

	if (fullHouseVal[0] > 9) {
		num1 = (fullHouseVal[0] / 10).toFixed(1).toString();
	} else {
		num1 = (fullHouseVal[0] / 10).toFixed(1);
	}
	
	num2 = (fullHouseVal[1] > 9) ? fullHouseVal[1].toString() : "0" + fullHouseVal[1].toString();
	
	const sum = num1 + num2;
	return sum;
}

console.log(1.01 > -1)


