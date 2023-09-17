// import { Players, testHand }  from "./Players"

// import Players from "./script.js"
const { parseCards, checkCombos, groupBy } = require("./script.js")

describe("#Check Pair", () => {
	test("it tests for pairs", () => {
		const communityCards = ["2H", "9C", "9H", "JD", "QS"]
		const playerCards = ["10H", "5D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		const combos = checkCombos(parsedFullCards)
		expect(combos.pair.has).toBe(true)
	})
})

// describe("#Check Two-Pair", () => {
// 	test("it tests for pairs", () => {
// 		const communityCards = ["2H", "9C", "9H", "JD", "QS"]
// 		const playerCards = ["10H", "5D"]
// 		const fullCards = [...communityCards, ...playerCards]
// 		const parsedFullCards = parseCards(fullCards)
// 		const combos = checkCombos(parsedFullCards)
// 		expect(combos.pair.__has).toBe(true)
// 	})
// })

describe("#Check Trips", () => {
	test("it tests for trips", () => {
		const communityCards = ["2H", "9C", "9H", "JD", "QS"]
		const playerCards = ["9S", "5D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		const combos = checkCombos(parsedFullCards)
		expect(combos.trip.has).toBe(true)
	})
})

describe("#Check Quads", () => {
	test("it tests for quads", () => {
		const communityCards = ["9D", "9C", "9H", "JD", "QS"]
		const playerCards = ["9S", "5D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		const combos = checkCombos(parsedFullCards)
		expect(combos.quad.has).toBe(true)
	})
})

describe("#Check Full House", () => {
	test("it tests for full house", () => {
		const communityCards = ["2H", "9C", "9H", "JD", "QS"]
		const playerCards = ["2D", "2S"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		const combos = checkCombos(parsedFullCards)
		expect(combos.fullHouse.has).toBe(true)
	})
})
