// import { Players, testHand }  from "./Players"

// import Players from "./script.js"
import { testHand } from "./script.js"

describe("#check", () => {
	// test("it tests", () => {
	// 	const player1 = new Players("Sean")
	// 	player1.myHand = "AH 2S"
	// 	expect(testHand(player1.hand)).toBe("AH")
	// })

	test("it tests", () => {
		const value = 2
		expect(testHand(value)).toBe(3)
	})
})
