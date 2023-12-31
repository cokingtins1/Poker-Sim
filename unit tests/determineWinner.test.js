const { checkCombos, determineWinner } = require("./unitTests.js")

// const comCards = ["2H", "9C", "10H", "JD", "QS"]
// const playerCards = ["KS", "5D"]

// console.log(checkCombos(playerCards, comCards))

// 1. If tie, collect players who have same order
// 2. Check if 'Community Player' has a hand that is higher than tying players
// 	2a. If true ---> CHOP

class Player {
	constructor(
		name,
		hand,
		handInfo,
		handValue,
		playerHandVal,
		communityHand,
		communityHandVal,
		chips
	) {
		this.name = name
		this.hand = hand
		this.handInfo = handInfo
		this.handValue = handValue
		this.playerHandVal = playerHandVal
		this.communityHand = communityHand
		this.communityHandVal = communityHandVal
		this.chips = chips
	}
}

// Create clone of players array to be used in determineWinner
// function to create players array given their hand values

// loop through the testArray and stop at each test -> test.name

describe("Check Winner", () => {
	const expectedWinner = "Player 1"
	const chopMessage = "Chop between Player 1,Player 2"
	const testArray = [
		{
			name: "1. High Card vs High Card",
			communityCards: ["2D", "4H", "5S", "8C", "JS"],
			players: [
				["QD", "KC"],
				["9H", "10D"],
			],
		},
		{
			name: "2. Pair vs Pair",
			communityCards: ["2D", "4H", "8C", "9D", "QS"],
			players: [
				["QD", "KC"],
				["9H", "10D"],
			],
		},
		{
			name: "3. Two Pair vs Two Pair",
			communityCards: ["7D", "9S", "10S", "QH", "KH"],
			players: [
				["QD", "KC"],
				["9H", "10D"],
			],
		},
		{
			name: "4. 3Kind vs 3Kind",
			communityCards: ["2D", "7D", "9S", "JS", "QH"],
			players: [
				["QD", "QC"],
				["9C", "9H"],
			],
		},
		{
			name: "5. Straight vs Straight",
			communityCards: ["3D", "8C", "9H", "10H", "JC"],
			players: [
				["QD", "KC"],
				["QH", "AH"],
			],
		},
		{
			name: "6. Straigh w Ace",
			communityCards: ["8D", "9C", "10C", "JC", "QH"],
			players: [
				["KH", "AS"],
				["6C", "7D"],
			],
		},
		{
			name: "7. Flush vs Flush",
			communityCards: ["3D", "4S", "8C", "9S", "JS"],
			players: [
				["QS", "KS"],
				["6S", "7S"],
			],
		},

		{
			name: "8. Full House",
			communityCards: ["3D", "3C", "3H", "5S", "AC"],
			players: [
				["JC", "JH"],
				["8C", "8H"],
			],
		},
		{
			name: "9. Full House Reversed",
			communityCards: ["2S", "6H", "QD", "AC", "AH"],
			players: [
				["QS", "AS"],
				["QC", "QH"],
			],
		},
		{
			name: "10. 4Kind",
			communityCards: ["9D", "9S", "QH", "QS", "AD"],
			players: [
				["QD", "QC"],
				["9C", "9H"],
			],
		},
		{
			name: "11. Straight Flush",
			communityCards: ["7D", "8D", "9D", "10D", "JD"],
			players: [
				["QD", "KD"],
				["5D", "6D"],
			],
		},
		{
			name: "12. Straight Flush Ace",
			communityCards: ["2C", "3C", "5C", "6C", "7C"],
			players: [
				["8C", "9C"],
				["4C", "AC"],
			],
		},
		{
			name: "13. Royal",
			communityCards: ["6H", "7H", "10C", "JC", "QC"],
			players: [
				["KC", "AC"],
				["8C", "9C"],
			],
		},
		{
			name: "14. Chop - Pair w Counterfeited King",
			communityCards: ["2S", "7D", "JC", "KD", "KS"],
			players: [
				["2H", "7H"],
				["3C", "7S"],
			],
			expect: chopMessage,
		},
		{
			name: "15. Chop - Counterfeited Straight",
			communityCards: ["10S", "JD", "QH", "KD", "AS"],
			players: [
				["JS", "AH"],
				["JC", "AC"],
			],

			expect: chopMessage,
		},
		{
			name: "16. Chop - Counterfeited Flush",
			communityCards: ["5H", "7H", "9H", "10H", "QH"],
			players: [
				["2H", "3H"],
				["KD", "KC"],
			],

			expect: chopMessage,
		},
		{
			name: "17. Higher Kicker ",
			communityCards: ["4H", "8C", "KC", "AH", "JS"],
			players: [
				["2D", "10H"],
				["2S", "9D"],
			],
		},
		{
			name: "18. Comm Trips with Kicker ",
			communityCards: ["2C", "3C", "JD", "JC", "JH"],
			players: [
				["6D", "7D"],
				["4D", "5D"],
			],
		},
		{
			name: "19. better FH ",
			communityCards: ["10D", "10H", "10S", "JH", "JS"],
			players: [
				["3S", "JC"],
				["4D", "QD"],
			],
		},
		{
			name: "20. Chop - Full House ",
			communityCards: ["2D", "2H", "QD", "QH", "QS"],
			players: [
				["6S", "AS"],
				["JC", "KC"],
			],

			expect: chopMessage,
		},
		{
			name: "21. Pair Kicker - Comm has pair ",
			communityCards: ["3D", "3C", "6H", "9H", "JC"],
			players: [
				["7D", "AD"],
				["8S", "KS"],
			],
		},
		{
			name: "22. Pair Kicker - Players share pair ",
			communityCards: ["2C", "3D", "7H", "9H", "JC"],
			players: [
				["7D", "AD"],
				["7C", "KS"],
			],
		},
		{
			name: "23. Trip Kicker - Comm has trip ",
			communityCards: ["2C", "3D", "7D", "7C", "7H", "AC"],
			players: [
				["10C", "JD"],
				["9S", "10S"],
			],
		},
		{
			name: "24. Two Pair - Comm has Two Pair ",
			communityCards: ["6D", "6C", "8H", "8S", "KH"],
			players: [
				["3C", "QD"],
				["3H", "10S"],
			],
		},
		{
			name: "25. Two Pair - Comm shares Two Pair ",
			communityCards: ["6D", "8H", "8S", "AH", "AC"],
			players: [
				["6C", "JC"],
				["3H", "6H"],
			],
		},
		{
			name: "26. Two Pair - Comm has no two pair ",
			communityCards: ["2S", "4C", "6D", "8D", "AH"],
			players: [
				["6C", "8C"],
				["6H", "8H"],
			],
			expect: chopMessage,
		},
		{
			name: "27. Flush - Board has flush, player 1 best kicker ",
			communityCards: ["9D", "JD", "2S", "KD", "AD"],
			players: [
				["AC", "7D"],
				["QS", "6D"],
			],
		},
		{
			name: "27. Flush - Board has flush ",
			communityCards: ["QS", "10S", "3S", "4S", "2D"],
			players: [
				["JS", "JD"],
				["9S", "6D"],
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
				const playerHandVal = result.playerHandVal
				const communityHand = testcase.communityCards
				const communityHandVal = result.communityHandVal
				const playerChips = 1000

				const player = new Player(
					playerName,
					playerHand,
					handInfo,
					handValue,
					playerHandVal,
					communityHand,
					communityHandVal,
					playerChips
				)
				players.push(player)
			}
			const winner = determineWinner(players)
			expect(winner).toBe(
				testcase.expect ? testcase.expect : expectedWinner
			)
		})
	})
})

// kicker plays in pair holdings:
// 	high card, pair, two-pair, 3kind, 4kind
// (1,2,3,4,8)

// Higher holding situations:
// Higher flush, straight, SF, RF
// (5,6,9,10)
// Better full house - Good
// (7)
