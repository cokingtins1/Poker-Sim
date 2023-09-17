// import Players from './Players.js'

class Players {
	constructor(name, hand) {
		this.name = name
		this.hand = hand
	}

	set myHand(value) {
		const [card1, card2] = value.split(" ")
		this.hand = [card1, card2]
	}
}

const player1 = new Players("Sean")

player1.myHand = "AH 2S"

function testHand(player) {
	return player.hand[0]
}

const communityCards = ["10D", "9C", "9H", "JD", "QS"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["10H", "9D"]

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

	parsedCards.sort((a, b) => a.value - b.value)
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
	let pair = {
		value: undefined,
		has: false,
	}
	let twoPair = {
		value: undefined,
		has: false,
	}
	let trip = {
		value: undefined,
		has: false,
	}
	let fullHouse = {
		value: undefined,
		has: false,
	}

	let quad = {
		value: undefined,
		has: false,
	}

	const valueArray = array.map((card) => card.value) // create array of only values
	const unique = [...new Set(valueArray)] //create array of unique values

	const groupedByValue = groupBy(array, (card) => card.value) // group cards by value
	const groupedBySuit = groupBy(array, (card) => card.suitCode) // group cards by suit

	// return(groupedByValue[0].length)

	// return(unique)

	// Check for pair, two pair, trips, quads
	for (const index of unique) {
		if (groupedByValue[index].length === 2) {
			pair.value = index
			pair.has = true
		} else if (groupedByValue[index].length === 3) {
			trip.value = index
			trip.has = true
		} else if (groupedByValue[index].length === 4) {
			quad.value = index
			quad.has = true
		}
	}

	// Check for Full House
	if (trip.has === true && pair.has === true) {
		fullHouse.has = true
		fullHouse.value = [trip.value, pair.value]
	}

	const handRanks = { pair, twoPair, trip, fullHouse, quad }
	return handRanks
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

console.log("card array:", parsedFullCards)

module.exports = {
	parseCards,
	checkCombos,
	groupBy,
}
