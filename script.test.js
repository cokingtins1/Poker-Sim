import { Players, testHand }  from "./Players"

describe("#check", () => {
	test("it tests", () => {
		const player1 = new Players("Sean")
		player1.myHand = "AK 2S"
		expect(testHand(player1.hand)).toBe("AK")
	})
})
