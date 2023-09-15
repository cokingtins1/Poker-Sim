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

const communityCards = ["2H", "8C", "9H", "JD", "QS", "10H", "9D"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["10H", "9D"]

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

const parsedComCards = parseCards(communityCards)

function checkPair(cards) {
	let pair
}

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

console.log("community cards:", parsedComCards)
const valueMap = { J: 9, Q: 10, K: 11, A: 12 }

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
