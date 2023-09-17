// import { Players, testHand }  from "./Players"

// import Players from "./script.js"
const { parseCards, checkCombos, groupBy } = require("./script.js")

describe("Check Poker Hands", () => {
	const testCases = [
		{
			description: "Pair",
			communityCards: ["2H", "9C", "9H", "JD", "QS"],
			playerCards: ["10H", "5D"],
			hand: "pair",
		},
		{
			description: "Two Pair",
			communityCards: ["2H", "2D", "10H", "KD", "QS"],
			playerCards: ["KS", "5D"],
			hand: "twoPair",
		},
		{
			description: "Trips",
			communityCards: ["2H", "9C", "9H", "JD", "QS"],
			playerCards: ["9S", "5D"],
			hand: "trip",
		},
		{
			description: "Straight",
			communityCards: ["2H", "9C", "10H", "JD", "QS"],
			playerCards: ["KS", "5D"],
			hand: "straight",
		},
		{
			description: "Flush",
			communityCards: ["2H", "2D", "10H", "KH", "QH"],
			playerCards: ["KH", "5D"],
			hand: "flush",
		},
		{
			description: "Full House",
			communityCards: ["2H", "9C", "9H", "JD", "QS"],
			playerCards: ["2D", "2S"],
			hand: "fullHouse",
		},
		{
			description: "Quads",
			communityCards: ["9D", "9C", "9H", "JD", "QS"],
			playerCards: ["9S", "5D"],
			hand: "quad",
		},
		{
			description: "Straight Flush",
			communityCards: ["5D", "8C", "7C", "4C", "QH"],
			playerCards: ["6C", "5C"],
			hand: "straightFlush",
		},
		{
			description: "Royal Flush",
			communityCards: ["5D", "10H", "JC", "JH", "QH"],
			playerCards: ["KH", "AH"],
			hand: "royalFlush",
		},
	]

	testCases.forEach((testCase) => {
		test(testCase.description, () => {
			const fullCards = [
				...testCase.communityCards,
				...testCase.playerCards,
			]
			const parsedFullCards = parseCards(fullCards)
			const combos = checkCombos(parsedFullCards)
			expect(combos[testCase.hand].has).toBe(true)
		})
	})
})
