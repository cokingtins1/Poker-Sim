import { HAND_MAP } from "./checkHand.js"

export function renderCards(
	selector,
	subSelector,
	value,
	{ parent = document } = {}
) {
	const targetElement = parent.querySelector(`[data-${selector}]`)
	const cardPath = value.map((card) => `./cards/${card}.svg `)

	cardPath.forEach((path, i) => {
		targetElement.querySelector(`[data-${subSelector}${i}]`).src = path
	})
}


export function convertToString(value) {
    const wordsMap = new Map([
        [1, "Deuce"],
        [2, "Three"],
        [3, "Four"],
        [4, "Five"],
        [5, "Six"],
        [6, "Seven"],
        [7, "Eight"],
        [8, "Nine"],
        [9, "Ten"],
        [10, "Jack"],
        [11, "Queen"],
        [12, "King"],
        [13, "Ace"]
    ]);

    if (Array.isArray(value)) {
        return value.map(card => wordsMap.get(card) || "Invalid card value");
    } else {
        return wordsMap.get(value) || "Invalid card value";
    }
}

export function getMessage(order, value) {

	const valueString = convertToString (value)
	
	let message = `${HAND_MAP.get(order)}`
	switch (order) {
		case 1:
			message += `, ${valueString}-high`
			break
		case 2:
			message += ` of ${valueString}'s`
			break
		case 3:
			let [value1, value2] = valueString
			message += `, ${value1}'s and ${value2}'s`
			break
		case 4:
		case 8:
			message += `, ${valueString}'s`
			break
		case 5:
		case 6:
		case 9:
			message += ` ${valueString}-high`
			break
		case 7:
			let [trip, pair] = valueString
			message += `, ${trip}'s full of ${pair}'s`
			break
		case 10:
			message
			break
		default:
			message = "balls"
	}
	return message
}