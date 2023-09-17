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

describe("#Check Two-Pair", () => {
	test("it tests for pairs", () => {
		const communityCards = ["2H", "2D", "10H", "KD", "QS"]
		const playerCards = ["KS", "5D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		const combos = checkCombos(parsedFullCards)
		expect(combos.twoPair.has).toBe(true)
	})
})

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

// describe("#Check Straight", () => {
// 	test("it tests for straight", () => {
// 		const communityCards = ["2H", "9C", "10H", "JD", "QS"]
// 		const playerCards = ["KS", "5D"]
// 		const fullCards = [...communityCards, ...playerCards]
// 		const parsedFullCards = parseCards(fullCards)
// 		const combos = checkCombos(parsedFullCards)
// 		expect(combos.straight.has).toBe(true)
// 	})
// })

describe("#Check Flush", () => {
	test("it tests for flush", () => {
		const communityCards = ["2H", "2D", "10H", "KH", "QH"]
		const playerCards = ["KH", "5D"]
		const fullCards = [...communityCards, ...playerCards]
		const parsedFullCards = parseCards(fullCards)
		const combos = checkCombos(parsedFullCards)
		expect(combos.flush.has).toBe(true)
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
