// Create Cards

export default function setUpGame() {
	const suits = ["D", "C", "H", "S"]
	const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "K", "Q", "A"]
	let deck = []

	for (let s = 0; s < suits.length; s++) {
		for (let v = 0; v < values.length; v++) {
			deck.push(values[v] + suits[s])
		}
	}

	const shuffledDeck = shuffle(deck)

	return shuffledDeck
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex--
		;[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		]
	}

	return array
}


