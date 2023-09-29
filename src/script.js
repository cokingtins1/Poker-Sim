import checkCombos from "./checkHand.js"
import { players, NUM_PLAYERS, deck } from "./createPlayers.js"
import { getCardImage } from "./renderCardImg.js"

const setUpButton = document.querySelector("[data-button-setup]")
const flopButton = document.querySelector("[data-button-flop]")
const playerTemplate = document.getElementById("mytemplate")
const playerDiv = document.querySelector("[data-players]")
const communityCards = document.querySelector("[data-community-cards]")

setUpButton.addEventListener("click", () => {
	for (let i = 0; i < NUM_PLAYERS; i++) {
		const element = playerTemplate.content.cloneNode(true)

		const imageMap = getCardImage(players[i].hand)
		setValue("playerHandImg", null, { parent: element }, imageMap)

		setValue("playerNum", players[i].name, { parent: element })
		setValue("playerHand", players[i].hand, { parent: element })
		setValue("playerChips", players[i].chips, { parent: element })

		playerDiv.appendChild(element)
	}
})
flopButton.addEventListener("click", () => {
	communityCards.append(deck.communityCards)
})

function setValue(
	selector,
	value = "",
	{ parent = document } = {},
	imageMap = []
) {
	const targetElement = parent.querySelector(`[data-${selector}]`)

	if (!targetElement) {
		console.warn("element with selector is not found")
	}

	if (value !== null) {
		targetElement.textContent = value
		// console.log(targetElement)
	} else {
		targetElement.querySelector("[data-card1]").src = imageMap[0]
		targetElement.querySelector("[data-card2]").src = imageMap[1]

	}
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
