export default class Players {
	constructor(name, hand) {
		this.name = name
		this.hand = hand
	}

	set myHand(value) {
		const [card1, card2] = value.split(" ")
		this.hand = [card1, card2]
	}
}

const player1 = new Players("Sean")

player1.myHand = "AK 2S"

function testHand(player){
    return player.hand[0]
}

console.log(testHand(player1))
