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

const communityCards = ["2H", "9C", "9H", "JD", "QS"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
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
	let quad = {
		value: undefined,
		has: false,
	}

	const valueArray = array.map((card) => card.value)

	const duplicates = []
	const uniquValues = {}
	for (const value of valueArray) {
		if (uniquValues[value]) {
			console.log(uniquValues[value])
			duplicates.push(value)
		} else {
			uniquValues[value] = true
		}
	}
	return { duplicates, uniquValues }
}

console.log(checkCombos(parsedFullCards))

// function findDuplicates(array, property) {
// 	const duplicates = []
// 	const uniquValues = {}

// 	for (const obj of array) {
// 		const value = obj[property]
// 		if (uniquValues[value]) {
// 			duplicates.push(obj)
// 		} else {
// 			uniquValues[value] = true
// 		}
// 	}
// 	return duplicates
// }

// console.log(checkHand(parsedFullCards))

console.log("card array:", parsedFullCards)

// function createMatrix(community) {
// 	const matrix = []
// 	let element = {
// 		value: undefined,
// 		suit: undefined,
// 		filled: undefined,
// 	}
// 	for (let j = 0; j < 13; j++) {
// 		// value of the card
// 		const row = []
// 		for (let i = 0; i < 4; i++) {
// 			// suit of the card
// 			// ["0-2", "6-1","7-2", "9-0", "10-3" ]

// 			element = {
// 				value: j,
// 				suit: i,
// 				filled: false,
// 			}

// 			for (let index = 0; index < community.length; index++) {
// 				if (
// 					community[index].value === j &&
// 					community[index].suitCode === i
// 				) {
// 					element.filled = true
// 				}
// 			}

// 			matrix.push(element)
// 		}
// 	}
// 	return matrix
// }

// const matrix = createMatrix(parsedComCards)
// const reducedMatrix = matrix.filter((obj) => obj.filled !== false)

// console.log(matrix[6])

// parsedComCards.forEach((element) => {
// 	console.log(element.value)
// })

// Testing
// function checkEmpty(matrix) {
// 	if (matrix.length > 0) {
// 		return true
// 	} else {
// 		return false
// 	}
// }
// const balls = []
// console.log(checkEmpty(communityCards))

// module.exports = {
// 	checkEmpty,
// }
