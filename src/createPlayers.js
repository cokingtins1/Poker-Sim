// import { deck } from "./setUpCards.js"

export const NUM_PLAYERS = 4

class Player {
	constructor(name, hand, chips) {
		this.name = name
		this.hand = hand
		this.chips = chips
	}
}

class Deck {
	constructor() {
		this.cards = this.setUpGame()
		this.playerCards = this.deal()
        this.burnCards = this.flop().burnCards
        this.communityCards = this.flop().communityCards
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

	deal() {
		// console.log(deck.cards)
		if (this.cards.length !== 0) {
			const playerCards = []

			for (let i = 1; i <= NUM_PLAYERS; i++) {
				playerCards[i] = []
				playerCards[i][1] = this.cards.pop()
			}

			for (let i = 1; i <= NUM_PLAYERS; i++) {
				playerCards[i][2] = this.cards.pop()
			}

			return playerCards.map((subArray) =>
				subArray.filter((item) => item !== undefined)
			)
		} else {
			return null // Deck is empty
		}
	}

	flop() {
		let communityCards = []

		const burnCards = this.cards.pop()

		for (let i = 1; i <= 3; i++) {
			communityCards.push(this.cards.pop())
		}

        return  {communityCards, burnCards}
	}
}

export const deck = new Deck()
function createPlayers(NUM_PLAYERS) {
	const players = []
	// const playerCards = deck.playerCards

	for (let i = 1; i <= NUM_PLAYERS; i++) {
		const playerName = `Player ${i}`
		const playerHand = deck.playerCards[i]
		const playerChips = 1000

		const player = new Player(playerName, playerHand, playerChips)
		players.push(player)
	}

	return players
}

console.log(deck.burnCards, deck.communityCards)

export const players = createPlayers(NUM_PLAYERS)




