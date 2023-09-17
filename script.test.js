// import { Players, testHand }  from "./Players"

// import Players from "./script.js"
const { parseCards, checkCombos, groupBy } = require("./script.js")

describe("#Check Pair", () => {
	test("it tests for pairs", () => {
		const communityCards = ["2H", "9C", "9H", "JD", "QS"]
		const playerCards = ["10H", "5D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		expect(checkCombos(parsedFullCards).pair.has).toBe(true)
	})
})

describe("#Check Trips", () => {
	test("it tests for trips", () => {
		const communityCards = ["2H", "9C", "9H", "JD", "QS"]
		const playerCards = ["10H", "9D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		expect(checkCombos(parsedFullCards).trip.has).toBe(true)
	})
})

describe("#Check Full House", () => {
	test("it tests for full house", () => {
		const communityCards = ["10D", "9C", "9H", "JD", "QS"]
		const playerCards = ["10H", "9D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		expect(checkCombos(parsedFullCards).fullHouse.has).toBe(true)
	})
})

describe("#Check Quads", () => {
	test("it tests for quads", () => {
		const communityCards = ["9S", "9C", "9H", "JD", "QS"]
		const playerCards = ["10H", "9D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		expect(checkCombos(parsedFullCards).quad.has).toBe(true)
	})
})
