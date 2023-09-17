const communityCards = ["2H", "9C", "10H", "JD", "QS"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["KS", "5D"]

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

	const highCard = createRank() // Order 1
	const pair = createRank() // Order 2
	const twoPair = createRank() // Order 3
	const trip = createRank() // Order 4
	const straight = createRank() // Order 5
	const flush = createRank() // Order 6
	const fullHouse = createRank() // Order 7
	const quad = createRank() // Order 8
	const straightFlush = createRank() // Order 9
	const royalFlush = createRank() // Order 10

	const valueArray = array.map((card) => card.value) // create array of only values
	const unique = [...new Set(valueArray)] //create array of unique values

	const groupedByValue = groupBy(array, (card) => card.value) // group cards by value
	const groupedBySuit = groupBy(array, (card) => card.suitCode) // group cards by suit

	// Check straight (should work if ace = 12)
	for (let i = 0; i < unique.length - 4; i++) {
		if (unique[i + 4] - unique[i] === 4) {
			straight.has = true
			straight.value = unique[i + 4] // log high card of straight
			straight.order = 5
		}
	}

	// if(unique[uni])

	// Check for pair, trips, quads
	let twoPairCombo = []
	for (const index of unique) {
		if (groupedByValue[index].length === 2) {
			pair.value = index
			pair.has = true
			pair.order = 2
			twoPairCombo.push(index)
		} else if (groupedByValue[index].length === 3) {
			trip.value = index
			trip.has = true
			trip.order = 4
		} else if (groupedByValue[index].length === 4) {
			quad.value = index
			quad.has = true
			quad.order = 8
		}
	}

	// Check for Two Pair
	if (twoPairCombo.length > 0) {
		twoPair.value = twoPairCombo
		twoPair.has = true
		twoPair.order = 3
	}

	// Check for Flush
	const keys = Object.keys(groupedBySuit).map(Number)
	for (const key of keys) {
		if (groupedBySuit[key].length >= 5) {
			flush.has = true
			flush.value = key
			flush.order = 6
		}
	}

	// Check for Full House
	if (trip.has === true && pair.has === true) {
		fullHouse.has = true
		fullHouse.value = [trip.value, pair.value]
		fullHouse.order = 7
	}

	const handRanks = { pair, twoPair, trip, straight, flush, fullHouse, quad }
	// return { pair, twoPair, trip, straight, fullHouse, quad }
	return handRanks
}

function createRank() {
	return {
		value: undefined,
		has: false,
		order: 0,
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
