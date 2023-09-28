// Create Cards

export default class Deck {
	constructor() {
		this.cards = this.setUpGame()
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

	deal(){
		if(this.cards.length === 0){
			return null // Deck is empty
		} return this.cards.pop()
	} 
}

const deck = new Deck
console.log(deck.deal(), deck.length)


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



