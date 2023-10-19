// need to log the kicker - kicker is the card that is not involved with the hand.
// Pair - card that is not the pair/three kind/four kind

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

const HAND_MAP = new Map()
addMapping(1, "High Card")
addMapping(2, "Pair")
addMapping(3, "Two Pair")
addMapping(4, "Three of a Kind")
addMapping(5, "Straight")
addMapping(6, "Flush")
addMapping(7, "Full House")
addMapping(8, "Four of a Kind")
addMapping(9, "Straight Flush")
addMapping(10, "Royal Flush")

function addMapping(values, hand) {
	HAND_MAP.set(values, hand)
}

// add export default
function checkCombos(playerHand = [], community = []) {
	if (!playerHand) return

	const inputArray = [...playerHand, ...community]

	const __playerHand = parseCards(playerHand)
	const __playerHandVal = __playerHand.map((card) => card.value)
	const __communityHand = parseCards(community)
	const __communityHandVal = __communityHand.map((card) => card.value)

	const array = parseCards(inputArray)

	const highCard = createRank() // Order 1
	const pair = createRank() // Order 2
	const twoPair = createRank() // Order 3
	const trip = createRank() // Order 4
	const straight = createRank() // Order 5
	const flush = createRank() // Order 6
	const fullHouse = createRank() // Order 7
	const quad = createRank() // Order 8
	const straightFlush = createRank() // Order 9
	const royalFlush = createRank() // Order 10

	const valueArray = array.map((card) => card.value) // create array of only values
	const unique = [...new Set(valueArray)] //create array of unique values

	const suitArray = array.map((card) => card.suitCode) // create array of only values

	const groupedByValue = groupBy(array, (card) => card.value) // group cards by value
	const groupedBySuit = groupBy(array, (card) => card.suitCode) // group cards by suit

	// Check for pair, trips, quads
	let twoPairCombo = []
	let falseTrip = {
		count: 0,
		tripOne: [],
		tripTwo: [],
		kicker: [],
	}
	for (const index of unique) {
		if (groupedByValue[index].length === 2) {
			pair.value = index
			pair.has = true
			pair.order = 2
			// pair.kicker = returnKicker(pair.value, pair.order)
			twoPairCombo.push(index)
		} else if (groupedByValue[index].length === 3) {
			trip.value = index
			trip.has = true
			trip.order = 4

			// trip.kicker = returnKicker(trip.value, trip.order)
			twoPairCombo.push(index)
			falseTrip.count += 1
			falseTrip.count === 1 ? (falseTrip.tripOne = index) : []
			falseTrip.count === 2 ? (falseTrip.tripTwo = index) : []

			falseTrip.count === 2
				? (falseTrip.kicker = [falseTrip.tripOne, falseTrip.tripTwo])
				: []
		} else if (groupedByValue[index].length === 4) {
			quad.value = [index]
			quad.has = true
			quad.order = 8
		}
	}

	// Check for Two Pair
	if (twoPairCombo.length > 1) {
		twoPair.value = twoPairCombo
		twoPair.has = true
		twoPair.order = 3
		twoPair.kicker = returnKicker(twoPair.value, twoPair.order)
	}

	function returnKicker(cardInvolved, order) {
		// FOR HIGH CARD:
		// Kickers do not play at all. Split if high cards are the same

		// 	FOR PAIR: 2
		// 	// if count === 0, player contains the pair, no kicker
		// 	// if count === 1, player shares the pair, kicker is greatest card that is not in pair
		// 	// if count === 2, comm owns the pair, kicker is greatest card in HAND (not combined - comm can have the ace, doesn't matter)

		// 	FOR TRIPS - kicker only plays if comm owns trips (two players can't have same trip)
		// 	// if count === 0, comm owns the trip, kicker is greatest card in HAND
		// else, kicker = null

		// FOR TWO-PAIR
		// if comm owns two pair, kicker plays -> kicker = highest playerHandVal
		// check if remaining comm card is greater than either tying player card.
		// if yes, split
		// if no, winner is higher kicker
		// If comm owns one pair and splits with player, kicker plays
		// if comm owns one pair and player owns the other, split pot

		let kicker = null
		let count = null

		// console.log("player hand val:", __playerHandVal)
		// console.log("community hand val:", __communityHandVal)

		if (order === 2 || order === 4) {
			count = __communityHandVal.reduce(
				(acc, num) => acc + (num === cardInvolved),
				0
			)
		}

		if (order === 2) {
			if (count === 0) {
				//player contains the pair, no kicker
				kicker = 0
			} else if (count === 1) {
				// player shares the pair, kicker is greatest card that is not in pair
				kicker = __playerHandVal.filter((value) => {
					return value !== cardInvolved
				})[0]
			} else if (count === 2) {
				// comm owns the pair, kicker is greatest card in HAND
				kicker = Math.max(...__playerHandVal)
			}
		}

		if (order === 3) {
			let notUsed = []
			notUsed = __playerHandVal.filter((value) => {
				return __communityHandVal.indexOf(value) === -1
			})

			if (notUsed.length === 0) {
				// Both player cards are involved in the two pair - no kicker
				kicker = 0
			}

			if (notUsed.length === 1) {
				// One player card is involved in the two pair - kicker
				__playerHandVal.filter((value) => {
					return notUsed.includes(value)
				})
			}

			if (notUsed.length === 2) {
				// No player cards are involved in the two pair (comm owns) - kicker
				kicker = Math.max(...__playerHandVal)
			}
		}

		return kicker
	}

	// Check Straight
	checkStraight(unique, suitArray) // Always run checkStraight in case there is Ace-high straight

	if (unique[unique.length - 1] === 13) {
		const checkAce = [0, ...unique.slice(0, -1)]
		checkStraight(checkAce, suitArray)
	}

	function checkStraight(straightArray, suitArray) {
		let straightStart
		let straightEnd

		for (let i = 0; i < straightArray.length - 4; i++) {
			if (straightArray[i + 4] - straightArray[i] === 4) {
				straightStart = straightArray[i]
				straightEnd = straightArray[i + 4]

				straight.has = true
				straight.value = straightEnd // log high card of straight
				straight.order = 5
			}
		}

		if (straight.has) {
			const flushCount = {}

			for (
				let i = valueArray.indexOf(straightStart);
				i < valueArray.indexOf(straightEnd) + 1;
				i++
			) {
				if (flushCount[suitArray[i]]) {
					flushCount[suitArray[i]]++
				} else {
					flushCount[suitArray[i]] = 1
				}
			}

			if (Math.max(...Object.values(flushCount)) >= 5) {
				straightFlush.has = true
				straightFlush.value = straightEnd
				straightFlush.order = 9
			}

			if (
				Math.max(...Object.values(flushCount)) >= 5 &&
				straightEnd === 13
			) {
				royalFlush.has = true
				royalFlush.value = straightEnd
				royalFlush.order = 10
			}
		}
	}

	// Check for Flush

	const keys = Object.keys(groupedBySuit).map(Number)

	for (const key of keys) {
		if (groupedBySuit[key].length >= 5) {
			const flushArray = groupedBySuit[key]
			flush.has = true
			flush.value = flushArray[flushArray.length - 1].value
			flush.order = 6
		}
	}

	// Check for Full House
	if (falseTrip.count === 2) {
		fullHouse.has = true
		fullHouse.value = [
			Math.max(...falseTrip.kicker),
			Math.min(...falseTrip.kicker),
		] //higher of the trip
		fullHouse.order = 7
	}

	if (trip.has === true && pair.has === true) {
		fullHouse.has = true
		fullHouse.value = [
			trip.value,
			twoPair.has
				? Math.max(...twoPair.value) !== trip.value
					? Math.max(...twoPair.value)
					: Math.min(...twoPair.value)
				: undefined,
		]
		fullHouse.order = 7
	}

	const handRanks = {
		highCard,
		pair,
		twoPair,
		trip,
		straight,
		flush,
		fullHouse,
		quad,
		straightFlush,
		royalFlush,
	}

	// Assign high card if no other hands are present
	if (Object.values(handRanks).every((rank) => rank.order === 0)) {
		highCard.has = true
		highCard.value = [Math.max(...valueArray)]
		highCard.order = 1
	}

	// Return hand that player has
	let hand = null
	for (const rankName in handRanks) {
		const rank = handRanks[rankName]
		// console.log(handRanks[rankName])
		if (rank.has && rank.order > (hand ? hand.order : -1)) {
			hand = handRanks[rankName]
		}
	}

	// return this for non testing

	const handResult = {
		handName: HAND_MAP.get(hand.order),
		hand: hand,
		playerHandVal: __playerHandVal, // array of values for kicker
		communityHandVal: __communityHandVal, // array of values for kicker
	}

	// return HAND_MAP.get(hand.order)
	return handResult

	// return this for testing
	// return handRanks
}

function parseCards(card) {
	const parsedCards = card.map((card) => {
		const valueMap = { J: 10, Q: 11, K: 12, A: 13 }
		const value =
			valueMap[card.slice(0, -1)] || parseInt(card.slice(0, -1)) - 1
		const suitMap = { D: 0, C: 1, H: 2, S: 3 }
		const suitCode = suitMap[card.slice(-1)]
		return { value, suitCode }
	})

	parsedCards.sort((a, b) => a.value - b.value) // Sort cards by value
	return parsedCards
}

function createRank() {
	return {
		value: undefined,
		has: false,
		order: 0,
		kicker: null,
	}
}

function groupBy(array, func) {
	return array.reduce((grouping, element) => {
		const key = func(element)
		if (grouping[key]) {
			grouping[key].push(element)
		} else {
			grouping[key] = [element]
		}
		return grouping
	}, {})
}

// Determine Winner -----------------------------------------------------
function determineWinner(players) {
	// Create fake player: 'Community Player' to eval hand against the players
	class CommunityPlayer extends Player {
		constructor(communityHand) {
			super(null, null, null, null, null, communityHand, null, null)
			this.handInfo = checkCombos(communityHand).hand
			this.handValue = checkCombos(communityHand).handName
			this.name = "Community Player"
			this.playerHandVal = checkCombos(communityHand).playerHandVal
		}
	}

	const communityCards = players[0].communityHand
	const communityClassInstance = new CommunityPlayer(communityCards)
	const allHands = [...players, communityClassInstance]

	let bestHandValue = 0
	let winningPlayers = []

	let bestHandValue2 = 0
	let winningPlayers2 = []

	// Part 1 - Determine winner with best hand value
	for (let player of allHands) {
		if (player.handInfo.order && player.handInfo.order > bestHandValue) {
			bestHandValue = player.handInfo.order
			winningPlayers = [player]
		} else if (
			player.handInfo.order &&
			player.handInfo.order === bestHandValue
		) {
			winningPlayers.push(player)
		}
	}

	if (winningPlayers.length > 1) {
		for (let player of winningPlayers) {
			if (
				player.handInfo.value &&
				player.handInfo.value > bestHandValue2
			) {
				bestHandValue2 = player.handInfo.value
				winningPlayers2 = [player]
			} else if (
				player.handInfo.value &&
				player.handInfo.value === bestHandValue2
			) {
				winningPlayers2.push(player)
			}
		}
	}
	console.log(winningPlayers2)

	// Part 2 - If players tie, determine best kicker

	const kickerPlaysVal = allHands[0].handInfo.order
	const sameHandOrder = allHands.every(
		(player) =>
			player.handInfo &&
			player.handInfo.order === allHands[0].handInfo.order
	)

	if (winningPlayers.length === 1) {
		return winningPlayers[0].name
	}

	if (winningPlayers2.length > 1) {
		if ([5, 6, 9, 10].includes(kickerPlaysVal)) {
			// hand is straight, flush, SF, RF or full house
			return sameHandOrder
				? evalKicker(allHands)
				: evalKicker(winningPlayers2)
		}

		if ([1, 2, 3, 4, 8].includes(kickerPlaysVal)) {
			// hand is high card, P, 2P, 3, 4
			return evalKicker(winningPlayers2, true)
		}

		if (kickerPlaysVal === 7) {
			return handleFullHouse(winningPlayers2)
		}
	}

	function handleFullHouse(players) {
		let tripsEqaulPlayers = []
		let choppingPlayers = []

		players.reduce(
			(maxObj, currentObj) => {
				if (currentObj.handInfo.value[0] > maxObj.handInfo.value[0]) {
					tripsEqaulPlayers.push(currentObj)
					return currentObj
				} else if (
					currentObj.handInfo.value[0] === maxObj.handInfo.value[0]
				) {
					tripsEqaulPlayers.push(currentObj)
				} else {
					return maxObj
				}
			},
			{ handInfo: { value: [-Infinity, -Infinity] } }
		)

		if (tripsEqaulPlayers.length > 1) {
			tripsEqaulPlayers.reduce(
				(maxObj, currentObj) => {
					if (
						currentObj.handInfo.value[1] > maxObj.handInfo.value[1]
					) {
						choppingPlayers = [currentObj]
						return currentObj
					} else if (
						currentObj.handInfo.value[1] ===
						maxObj.handInfo.value[1]
					) {
						choppingPlayers.push(currentObj)
					} else {
						return maxObj
					}
				},
				{ handInfo: { value: [-Infinity, -1] } }
			)
			return returnResults(choppingPlayers)
		}

		return returnResults(tripsEqaulPlayers)
	}

	// Function for who has the highest pair

	function evalKicker(players, kicker = false) {
		let bestKickerValue = -1
		let playerBestKicker = []

		for (let player of players) {
			let currentValue

			if (kicker) {
				currentValue = Math.max(...player.handInfo.kicker) // for pairs
			} else {
				currentValue = player.handInfo.value //for non-pairs (F, S)
			}

			if (currentValue > bestKickerValue) {
				bestKickerValue = currentValue
				playerBestKicker = [player]
			} else if (currentValue === bestKickerValue) {
				playerBestKicker.push(player)
			}
		}

		return returnResults(playerBestKicker)
	}

	function returnResults(players) {
		if (
			players.length > 1 &&
			players.some((obj) => obj.name === "Community Player")
		) {
			players = players.filter((obj) => obj.name !== "Community Player")
			const choppingPlayerNames = getNames(players)
			return `Chop between ${choppingPlayerNames}`
		} else if (
			players.length > 1 &&
			players.some((obj) => obj.name !== "Community Player")
		) {
			const choppingPlayerNames = getNames(players)
			return `Chop between ${choppingPlayerNames}`
		} else {
			return players[0].name
		}
	}

	function getNames(names) {
		return names.map((player) => player.name)
	}
}

// Console Code

function testConsole() {
	const testArray = [
		{
			name: "Royal",
			communityCards: ["10C", "8S", "8H", "10H", "JC"],
			players: [
				["5C", "AC"],
				["5S", "10S"],
				["JC", "3S"],
				["4H", "7C"],
				["2S", "QD"],
			],
		},
		// {
		// 	name: "Flush vs Flush",
		// 	communityCards: ["3D", "4S", "8S", "9S", "JS"],
		// 	players: [
		// 		["2S", "KH"],
		// 		["6S", "QS"],
		// 	],
		// },
	]

	let players = []
	testArray.forEach((testcase) => {
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
		// console.log("kicker:", players[0].handInfo.kicker)
		console.log(winner)
	})
}

testConsole()

module.exports = {
	checkCombos,
	determineWinner,
}
