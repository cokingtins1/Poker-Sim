const communityCards = ["2H", "8C", "9H", "JD", "QS", "10H", "9D"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS

function parseCards(card) {
	return card.map((card) => {
		const valueMap = { J: 9, Q: 10, K: 11, A: 12 }
		const value =
			valueMap[card.slice(0, -1)] || parseInt(card.slice(0, -1)) - 2
		const suitMap = { D: 0, C: 1, H: 2, S: 3 }
		const suitCode = suitMap[card.slice(-1)]
		return { value, suitCode }
	})
}

const test1 = [4, 9, 10, 10, 11, 12, 13]
const test2 = [0, 2, 1, 2, 2, 2, 2]

function checkSequenceAndEqualValues(arr1, arr2, sequenceLength) {
	for (let i = 0; i <= arr1.length - sequenceLength; i++) {
		let isSequence = true
		let targetValue = arr1[i]

		// Check if the next 'sequenceLength - 1' values form a sequence
		for (let j = 1; j < sequenceLength; j++) {
			if (arr1[i + j] !== targetValue + j) {
				isSequence = false
				break
			}
		}

		if (isSequence) {
			// Check if corresponding values in arr2 are all equal
			const subArray = arr2.slice(i, i + sequenceLength)
			const allEqual = subArray.every((value) => value === subArray[0])

			if (allEqual) {
				return true
			}
		}
	}

	return false
}

const sequenceLength = 5
const result = checkSequenceAndEqualValues(test1, test2, sequenceLength)

if (result) {
	console.log(
		`There is a sequence of ${sequenceLength} values in test1 with corresponding equal values in test2.`
	)
} else {
	console.log(`No such sequence found.`)
}
