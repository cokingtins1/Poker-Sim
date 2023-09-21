import checkCombos from "./checkHand.js"

class Player {
	constructor(name, hand) {
		this.name = name
		this.hand = hand
	}
}

const player1 = new Player("Sean", ["7H", "AD"])

const communityCards = ["5H", "3H", "2C", "4H", "QS"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["6H", "JH"]

const fullCards = [...communityCards, ...playerCards]

console.log(checkCombos(fullCards))
