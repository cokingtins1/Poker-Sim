import checkCombos from "./checkHand.js"

class Player {
	constructor(name, hand) {
		this.name = name
		this.hand = hand
	}
}

const player1 = new Player("Sean", ["7H", "AD"])

const communityCards = ["5C", "5D", "2S", "8H", "QS"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["7H", "AD"]

const fullCards = [...communityCards, ...playerCards]

console.log(checkCombos(fullCards))
