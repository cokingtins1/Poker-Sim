







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

function setValue(selector, value, { parent = document } = {}) {
	parent.querySelector(`[data-${selector}]`).textContent = value
}

function updateHandValue() {
	players.forEach((player, index) => {
		const playerDiv = document.querySelector(
			`[data-playerNum="Player ${index + 1}"]`
		)
		if (playerDiv) {
			const playerHandValueElement = playerDiv.querySelector(
				"[data-playerHandValue]"
			)
			if (playerHandValueElement) {
				playerHandValueElement.textContent = player.handValue
			}
		}
	})
}