const { checkCombos, determineWinner } = require("./unitTests.js")

// const comCards = ["2H", "9C", "10H", "JD", "QS"]
// const playerCards = ["KS", "5D"]

// console.log(checkCombos(playerCards, comCards))

class Player {
	constructor(name, hand, handInfo, handValue, chips) {
		this.name = name
		this.hand = hand
		this.handInfo = handInfo
		this.handValue = handValue
		this.chips = chips
	}
}

// Create clone of players array to be used in determineWinner
// function to create players array given their hand values

// loop through the testArray and stop at each test -> test.name

describe("Check Winner", () => {
	const testArray = [
		{
			name: "Check Pairs",
			communityCards: ["3S", "4D", "2S", "8H", "QS"],
			players: [
				["3H", "QD"], // highest kicker should win
				["6D", "JS"],
				["2C", "7H"],
				["5S", "2C"],
				["7H", "AS"],
				["JD", "KH"],
			],
			expect: "Player 1",
		},
		{
			name: "Check Straight",
			communityCards: ["3S", "4D", "2S", "8H", "QS"],
			players: [
				["3D", "JS"],
				["3C", "7H"],
				["3H", "QD"],
				["5S", "2C"],
				["7H", "AS"],
				["JD", "KH"],
			],
			expect: "Player 3",
		},
	]

	testArray.forEach((testcase) => {
		test("Check winner", () => {
			let handArray = []
			let players = []

			for (let i = 0; i < testcase.players.length; i++) {
				const result = checkCombos(
					testcase.players[i],
					testcase.communityCards
				)
				const playerName = `Player ${i + 1}`
				const playerHand = testcase.players[i]
				const handInfo = result.hand
				const handValue = result.handName
				const playerChips = 1000

				const player = new Player(
					playerName,
					playerHand,
					handInfo,
					handValue,
					playerChips
				)
				players.push(player)
			}
			const winner = determineWinner(players)
			expect(winner.tobe(testcase.expect))
			// console.log(determineWinner(players))
			// console.log(players)
		})
	})
})
//

// describe("Check Winner", (handArray) => {

//     handArray.map()

// 	testCases.forEach((testCase) => {
// 		test(testCase.description, () => {
// 			const fullCards = [
// 				...testCase.communityCards,
// 				...testCase.playerCards,
// 			]
// 			// const parsedFullCards = parseCards(fullCards)
// 			const combos = checkCombos(fullCards)
// 			expect(combos[testCase.hand].has).toBe(true)
// 		})
// 	})
// })
