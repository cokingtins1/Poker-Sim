// Create Cards

import { NUM_PLAYERS } from "./createPlayers.js"

class Deck {
	constructor() {
		this.cards = this.setUpGame()
		this.playerCards = this.deal()
		// this.playerCards = this.deal()
	}

	setUpGame() {
		const suits = ["D", "C", "H", "S"]
		const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A"]
		let deck = []

		for (let s = 0; s < suits.length; s++) {
			for (let v = 0; v < values.length; v++) {
				deck.push(values[v] + suits[s])
			}
		}

		let currentIndex = deck.length,
			randomIndex

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--
			;[deck[currentIndex], deck[randomIndex]] = [
				deck[randomIndex],
				deck[currentIndex],
			]
		}

		return deck
	}

	// get playerCards() {
	// 	if (this.cards.length !== 0) {
	// 		const playerCards = []

	// 		for (let i = 1; i <= NUM_PLAYERS; i++) {
	// 			playerCards[i] = []
	// 			playerCards[i][1] = deck.cards.pop()
	// 		}

	// 		for (let i = 1; i <= NUM_PLAYERS; i++) {
	// 			playerCards[i][2] = deck.cards.pop()
	// 		}

	// 		return playerCards.map((subArray) =>
	// 			subArray.filter((item) => item !== undefined)
	// 		)
	// 	} else {
	// 		return null // Deck is empty
	// 	}
	// }

	deal(cards) {
		// console.log(deck.cards)
		if (cards.length !== 0) {
			const playerCards = []

			for (let i = 1; i <= NUM_PLAYERS; i++) {
				playerCards[i] = []
				playerCards[i][1] = deck.cards.pop()
			}

			for (let i = 1; i <= NUM_PLAYERS; i++) {
				playerCards[i][2] = deck.cards.pop()
			}

			return playerCards.map((subArray) =>
				subArray.filter((item) => item !== undefined)
			)
		} else {
			return null // Deck is empty
		}
	}
}

// export const deck = new Deck()

// small blind anti
// big blind anti
// deal P1-1
// deal P2-1
// ... deal Pn-1
// deal P1-2
// deal P2-2
// ... deal Pn-2
// dealer +1 bet
// dealer +2 bet
// ... dealer +n bet
