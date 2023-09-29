// export const imageMap = getCardImage(cards)

export function getCardImage(cards) {
	let imageCards = []
	cards.forEach((card) => {
		imageCards.push(`./cards/${card}.svg `)
	})

	return imageCards
}
