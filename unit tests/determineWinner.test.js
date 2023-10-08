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
	const expectedWinner = "Player 1"
	const testArray = [
		{
			name: "High Card vs High Card",
			communityCards: ["2D", "4H", "5S", "8C", "JS"],
			players: [
				["QD", "KC"],
				["9H", "10D"],
			],
		},
		{
			name: "Pair vs Pair",
			communityCards: ["2D", "4H", "8C", "9D", "QS"],
			players: [
				["QD", "KC"],
				["9H", "10D"],
			],
		},
		{
			name: "Two Pair vs Two Pair",
			communityCards: ["7D", "9S", "10S", "QH", "KH"],
			players: [
				["QD", "KC"],
				["9H", "10D"],
			],
		},
		{
			name: "3Kind vs 3Kind",
			communityCards: ["2D", "7D", "9S", "JS", "QH"],
			players: [
				["QD", "QC"],
				["9C", "9H"],
			],
		},
		{
			name: "Straight vs Straight",
			communityCards: ["3C", "4H", "10D", "QC", "KC"],
			players: [
				["JD", "AH"],
				["2D", "AD"],
			],
		},
		{
			name: "Straigh w Ace",
			communityCards: ["9C", "10C", "JC", "QH"],
			players: [
				["10D", "KH"],
				["7D", "8D"],
			],
		},
		{
			name: "Flush vs Flush",
			communityCards: ["3D", "4S", "8C", "9S", "JS"],
			players: [
				["QS", "KS"],
				["6S", "7S"],
			],
		},
		{
			name: "Flush w Ace",
			communityCards: ["3D", "4S", "8C", "QS", "AS"],
			players: [
				["9S", "JS"],
				["6S", "7S"],
			],
		},
		{
			name: "Full House",
			communityCards: ["3D", "3C", "3H", "5S", "AC"],
			players: [
				["JC", "JH"],
				["8C", "8H"],
			],
		},
		{
			name: "Full House Reversed",
			communityCards: ["2S", "6H", "QD", "AC", "AH"],
			players: [
				["QS", "AS"],
				["QC", "QH"],
			],
		},
		{
			name: "4Kind",
			communityCards: ["9D", "9S", "QH", "QS", "AD"],
			players: [
				["QD", "QC"],
				["9C", "9H"],
			],
		},
		{
			name: "Straight Flush",
			communityCards: ["7D", "8D", "9D", "10D", "JD"],
			players: [
				["QD", "KD"],
				["5D", "6D"],
			],
		},
		{
			name: "Straight Flush Ace",
			communityCards: ["2C", "3C", "5C", "6C", "7C"],
			players: [
				["8C", "9C"],
				["4C", "AC"],
			],
		},
		{
			name: "Royal",
			communityCards: ["6H", "7H", "10C", "JC", "QC"],
			players: [
				["KC", "AC"],
				["8C", "9C"],
			],
		},
		{
			name: "Chop - Pair w Counterfeited King",
			communityCards: ["2S", "7D", "JC", "KD", "KS"],
			players: [
				["2H", "7H"],
				["3C", "7S"],
			],
		},
		{
			name: "Chop - 2",
			communityCards: ["4H", "8C", "KC", "AH", "AS"],
			players: [
				["2D", "10H"],
				["2S", "9D"],
                
			],
		},
	]

	testArray.forEach((testcase) => {
		test(testcase.name, () => {
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
			expect(winner).toBe(expectedWinner)
		})
	})
})
