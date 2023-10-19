import { checkCombos } from "./checkHand.js"

export const NUM_PLAYERS = 6

export class Player {
	constructor(
		name,
		hand,
		handInfo,
		handValue,
		playerHandVal,
		communityHand,
		communityHandVal,
		chips
	) {
		this.name = name
		this.hand = hand
		this.handInfo = handInfo
		this.handValue = handValue
		this.playerHandVal = playerHandVal
		this.communityHand = communityHand
		this.communityHandVal = communityHandVal
		this.chips = chips
	}
}

export class Deck {
	constructor() {
		this.cards = []
		this.playerCards = []
		this.burnCards = []
		this.communityCards = []
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
		this.cards = deck
		return this.cards
	}

	deal(players) {
		if (this.cards.length !== 0) {
			const playerCards = []

			for (let i = 1; i <= NUM_PLAYERS; i++) {
				playerCards[i] = []
				playerCards[i][1] = this.cards.pop()
				players[i - 1].hand = playerCards[i].filter(
					(item) => item !== undefined
				)
			}

			for (let i = 1; i <= NUM_PLAYERS; i++) {
				playerCards[i][2] = this.cards.pop()
				players[i - 1].hand = playerCards[i].filter(
					(item) => item !== undefined
				)
			}

			this.checkHandVal(players)
		} else {
			return null // Deck is empty
		}
	}

	flop(players) {
		let communityCards = []
		let burnCards = []

		burnCards.push(this.cards.pop())

		for (let i = 1; i <= 3; i++) {
			communityCards.push(this.cards.pop())
		}

		this.burnCards = burnCards
		this.communityCards = communityCards

		this.checkHandVal(players)
	}

	turn(players) {
		this.burnCards.push(this.cards.pop())
		this.communityCards.push(this.cards.pop())
		this.checkHandVal(players)
	}
	river(players) {
		this.burnCards.push(this.cards.pop())
		this.communityCards.push(this.cards.pop())
		this.checkHandVal(players)
	}

	checkHandVal(players) {
		for (let i = 0; i < NUM_PLAYERS; i++) {
			const result = checkCombos(players[i].hand, this.communityCards)
			players[i].handValue = result.handName
			players[i].playerHandVal = result.playerHandVal
			players[i].communityHandVal = result.communityHandVal
			players[i].handInfo = result.hand
			
		}
	}
}

export function createPlayers(NUM_PLAYERS) {
	const players = []

	for (let i = 1; i <= NUM_PLAYERS; i++) {
		const playerName = `Player ${i}`
		const playerHand = []
		const handInfo = []
		const handValue = null
		const playerHandVal = null
		const communityHand = []
		const communityHandVal = null
		const playerChips = 1000

		const player = new Player(
			playerName,
			playerHand,
			handInfo,
			handValue,
			playerHandVal,
			communityHand,
			communityHandVal,
			playerChips
		)
		players.push(player)
	}

	return players
}
