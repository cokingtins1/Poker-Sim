import { createPlayers, Deck, NUM_PLAYERS } from "./createPlayers.js"
import { renderCards } from "./renderCardImg.js"

const setUpButton = document.querySelector("[data-button-setup]")
const flopButton = document.querySelector("[data-button-flop]")
const turnButton = document.querySelector("[data-button-turn]")
const riverButton = document.querySelector("[data-button-river]")

const tableDiv = document.querySelector("[data-table")

const playerTemplate = document.getElementById("playerTemplate")
const playerDiv = document.querySelector("[data-players]")

export let deck = new Deck()
const players = createPlayers(NUM_PLAYERS, deck)

setUpButton.addEventListener("click", () => {
	deck.setUpGame()
	deck.deal(players)

	for (let i = 0; i < NUM_PLAYERS; i++) {
		const element = playerTemplate.content.cloneNode(true)

		setValue("playerNum", players[i].name, { parent: element })
		setValue("playerHand", players[i].hand, { parent: element })

		// setValue("playerHandValue", players[i].handValue, { parent: element })

		setValue("playerChips", players[i].chips, { parent: element })

		renderCards("playerHandImg", "card", players[i].hand, {
			parent: element,
		})

		playerDiv.appendChild(element)
	}

	updateHandValue()
	console.log(players.map((obj) => obj.handValue))
})
flopButton.addEventListener("click", () => {
	deck.flop(players)
	renderCards("communityCard", "card", deck.communityCards, {
		parent: tableDiv,
	})
	updateHandValue()

	console.log(players.map((obj) => obj.handValue))
})

turnButton.addEventListener("click", () => {
	deck.turn(players)
	renderCards("communityCard", "card", deck.communityCards, {
		parent: tableDiv,
	})
	updateHandValue()

	console.log(players.map((obj) => obj.handValue))
})

riverButton.addEventListener("click", () => {
	deck.river(players)
	renderCards("communityCard", "card", deck.communityCards, {
		parent: tableDiv,
	})
	updateHandValue()

	console.log(players.map((obj) => obj.handValue))
})

function setValue(selector, value, { parent = document } = {}) {
	parent.querySelector(`[data-${selector}]`).textContent = value
}

function updateHandValue() {
	players.forEach((player) => {
		setValue("playerHandValue", player.handValue, {
			parent: playerDiv,
		})
	})
}

// const communityCards = ["KD", "3H", "4H", "5H", "6H"]
// const playerCards = ["7D", "JH"]

// const fullCards = [...communityCards, ...playerCards]

// Initialize the Game
// const deck = setUpGame(); // Create a deck of cards and shuffle it

// export const NUM_PLAYERS = 3
// createPlayers(NUM_PLAYERS) // Create player objects

// // Deal the Hole Cards
// dealHoleCards() // Distribute two private cards to each player

// // Betting Round 1 (Pre-flop)
// postBlinds(SMALL_BLIND_AMOUNT, BIG_BLIND_AMOUNT) // Players post blinds
// bettingRound() // Players take turns betting, checking, folding, or raising

// // The Flop
// dealCommunityCards(3) // Reveal three community cards on the table

// // Betting Round 2 (Flop)
// bettingRound() // Players take turns betting, checking, folding, or raising

// // The Turn
// dealCommunityCards(1) // Reveal the fourth community card

// // Betting Round 3 (Turn)
// bettingRound() // Players take turns betting, checking, folding, or raising

// // The River
// dealCommunityCards(1) // Reveal the fifth and final community card

// // Betting Round 4 (River)
// bettingRound() // Players take turns betting, checking, folding, or raising

// console.log(deck.pop())

// console.log(checkCombos(fullCards))
// console.log(fullCards)
