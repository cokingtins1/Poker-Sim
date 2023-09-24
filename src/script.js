import checkCombos from "./checkHand.js"
// import defineHand from "./checkHand.js"

class Player {
	constructor(name, hand) {
		this.name = name
		this.hand = hand
	}
}

const player1 = new Player("Sean", ["7H", "AD"])

const communityCards = ["2C", "3H", "4H", "5H", "6H"]
const playerCards = ["9S", "JH"]

const fullCards = [...communityCards, ...playerCards]


console.log(checkCombos(fullCards))
console.log(fullCards)
