import checkCombos from "./checkHand.js"
import setUpGame from "./setUpCards.js"

const NUM_PLAYERS = 5
const button = document.querySelector("[data-button]")
const playerTemplate = document.getElementById("mytemplate")
const playerDiv = document.querySelector("[data-players]")

button.addEventListener("click", () => {
	for (let i = 1; i <= NUM_PLAYERS; i++) {
		const element = playerTemplate.content.cloneNode(true)

		setValue("playerNum", `Player ${i}`, { parent: element })

		playerDiv.appendChild(element)
	}
})

function setValue(selector, value, { parent = document } = {}) {
	parent.querySelector(`[data-${selector}]`).textContent = value
}

const communityCards = ["KD", "3H", "4H", "5H", "6H"]
const playerCards = ["7D", "JH"]

const fullCards = [...communityCards, ...playerCards]

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
