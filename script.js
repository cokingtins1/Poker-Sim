const communityCards = ["2H", "2D", "10H", "KH", "QH"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["KH", "5D"]

const fullCards = [...communityCards, ...playerCards]

function parseCards(card) {
	const parsedCards = card.map((card) => {
		const valueMap = { J: 9, Q: 10, K: 11, A: 12 }
		const value =
			valueMap[card.slice(0, -1)] || parseInt(card.slice(0, -1)) - 2
		const suitMap = { D: 0, C: 1, H: 2, S: 3 }
		const suitCode = suitMap[card.slice(-1)]
		return { value, suitCode }
	})

	parsedCards.sort((a, b) => a.value - b.value) // Sort cards by value
	return parsedCards
}

const parsedFullCards = parseCards(fullCards)

function checkHand(array) {
	let handValue = {
		highCard: false,
		onePair: false,
		twoPair: false,
		threeOfKind: false,
		straight: false,
		flush: false,
		fullHouse: false,
		fourOfKind: false,
		straightFlush: false,
		royalFlush: false,
	}

	// return findDuplicates(array, "value")
}

function checkCombos(array) {
	// Each rank should display what pair, twoPair, etc. they actually are to compare against other players

	const pair = createRank()
	const twoPair = createRank()
	const trip = createRank()
	const straight = createRank()
	const flush = createRank()
	const fullHouse = createRank()
	const quad = createRank()

	const valueArray = array.map((card) => card.value) // create array of only values
	const unique = [...new Set(valueArray)] //create array of unique values

	const groupedByValue = groupBy(array, (card) => card.value) // group cards by value
	const groupedBySuit = groupBy(array, (card) => card.suitCode) // group cards by suit

	// if (unique.length > 4) {
	// 	let count = 0
	// 	debugger
	// 	for (let i = 0; i < unique.length - 1; i++) {
	// 		if (unique[i] + 1 === unique[i + 1]) {
	// 			count = count + 1
	// 		}
	// 	}
	// 	if (count >= 4) {
	// 		straight.value = unique
	// 		straight.has = true
	// 	}
	// }

	// Check for pair, trips, quads
	let twoPairCombo = []
	for (const index of unique) {
		if (groupedByValue[index].length === 2) {
			pair.value = index
			pair.has = true
			twoPairCombo.push(index)
		} else if (groupedByValue[index].length === 3) {
			trip.value = index
			trip.has = true
		} else if (groupedByValue[index].length === 4) {
			quad.value = index
			quad.has = true
		}
	}

	// Check for Two Pair
	if (twoPairCombo.length > 0) {
		twoPair.value = twoPairCombo
		twoPair.has = true
	}

	// Check for Flush
	const keys = Object.keys(groupedBySuit).map(Number)
	for (const key of keys) {
		if (groupedBySuit[key].length >= 5) {
			flush.has = true
			flush.value = key
		}
	}

	// Check for Full House
	if (trip.has === true && pair.has === true) {
		fullHouse.has = true
		fullHouse.value = [trip.value, pair.value]
	}

	const handRanks = { pair, twoPair, trip, straight, flush, fullHouse, quad }
	// return { pair, twoPair, trip, straight, fullHouse, quad }
	return handRanks
}

function createRank() {
	return {
		value: undefined,
		has: false,
	}
}

function groupBy(array, func) {
	return array.reduce((grouping, element) => {
		const key = func(element)
		if (grouping[key]) {
			grouping[key].push(element)
		} else {
			grouping[key] = [element]
		}
		return grouping
	}, {})
}

console.log(checkCombos(parsedFullCards))

// console.log("card array:", parsedFullCards)

module.exports = {
	parseCards,
	checkCombos,
	groupBy,
}
