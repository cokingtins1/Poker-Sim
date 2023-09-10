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

const communityCards = ["2H", "QS", "JD", "8C", "9H"]
const playerCards = ["10H", "9D"]

function parseCards(hand) {
	const cards = hand.map((card) => {
		let value
		const tempVal = card.slice(0, -1)

		switch (tempVal) {
			case "J":
				value = 9
				break
			case "Q":
				value = 10
				break
			case "K":
				value = 11
				break
			case "A":
				value = 12
				break
			default:
				value = parseInt(card.slice(0, -1)) - 2
		}

		const suit = card.slice(-1)
		return { value, suit }
	})

	return cards
}

const parsedComCards = parseCards(communityCards)

function createMatrix(community) {
	const matrix = []
	for (let j = 0; j < 13; j++) {
		const row = []
		for (let i = 0; i < 4; i++) {
			const element = {
				value: i,
				suit: j,
			}

			// community.forEach((card) => {
			// 	if (card.value === j) {
			// 		element = {
			// 			value: true,
			// 			suit: i,
			// 		}
			// 	} else {
			// 		element = {
			// 			value: false,
			// 			suit: i,
			// 		}
			// 	}
			// })

			row.push(element)
		}
		matrix.push(row)
	}
	return matrix
}
const cardMatrix = parseCards(communityCards)

console.log("community cards:", parsedComCards)
console.log("populated matrix:", cardMatrix)
console.log("matrix:", createMatrix())

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
