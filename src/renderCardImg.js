export function renderCards(selector, value, { parent = document } = {}) {
	const targetElement = parent.querySelector(`[data-${selector}]`)

	// let imageCards = []
	// value.forEach((card) => {
	// 	imageCards.push(`./cards/${card}.svg `)
	// })

	let communityImageCards = []
	value.forEach((card) => {
		communityImageCards.push(`./cards/${card}.svg `)
	})

	const dataSelectors = ["[data-card1]", "[data-card2]"]
	const communitySelectors = ["[data-card1]", "[data-card2]"]

	placeCard(dataSelectors, value)

	function placeCard(selector, cards) {
		let cardLocation = []
		cards.forEach((card) => {
			cardLocation.push(`./cards/${card}.svg `)
		})

		targetElement.querySelector(selector[0]).src = cardLocation[0]
		targetElement.querySelector(selector[1]).src = cardLocation[1]
		// targetElement.querySelector("[data-card2]").src = imageCards[1]
	}
}
