import checkCombos from "./checkHand.js"
import setUpGame from './setUpCards.js'


class Player {
	constructor(name, hand) {
		this.name = name
		this.hand = hand
	}
}


const communityCards = ["KD", "3H", "4H", "5H", "6H"]
const playerCards = ["7D", "JH"]

const fullCards = [...communityCards, ...playerCards]

const deck = setUpGame()


// Number of players = 3
// 



console.log(deck.pop())



console.log(checkCombos(fullCards))
console.log(fullCards)
