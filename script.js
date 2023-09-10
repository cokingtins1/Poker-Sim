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

console.log(testHand(player1))

const communityCards = ["2H", "QS", "JD", "8C", "9H"]
const playerCards = ["10H", "9D"]

function parseCards(hand) {
	const cards = hand.map((card) => {
		const value = card.slice(0, -1)
		const suit = card.slice(-1)
		return { value, suit }
	})

	return cards
}

// const cards = communityCards.map((card) => {
// 	const value = card.slice(0, -1)
// 	const suit = card.slice(-1)
// 	return { value, suit }
// })

console.log(parseCards(playerCards))
