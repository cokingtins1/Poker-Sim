// need to log the kicker - kicker is the card that is not involved with the hand.
// Pair - card that is not the pair/three kind/four kind


class Player {
	constructor(name, hand, handInfo, handValue, playerHandVal, communityHandVal, chips) {
		this.name = name
		this.hand = hand
		this.handInfo = handInfo
		this.handValue = handValue
		this.playerHandVal = playerHandVal
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
function checkCombos(playerHand, community = []) {
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

	for (const index of unique) {
		if (groupedByValue[index].length === 2) {
			pair.value = [index]
			pair.has = true
			pair.order = 2
			twoPairCombo.push(index)
		} else if (groupedByValue[index].length === 3) {
			trip.value = [index]
			trip.has = true
			trip.order = 4
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
				straight.value = [straightStart, straightEnd] // log high card of straight
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
				straightFlush.value = [straightStart, straightEnd]
				straightFlush.order = 9
			}

			if (
				Math.max(...Object.values(flushCount)) >= 5 &&
				straightEnd === 13
			) {
				royalFlush.has = true
				royalFlush.value = [straightStart, straightEnd]
				royalFlush.order = 10
			}
		}
	}

	// Check for Flush

	const keys = Object.keys(groupedBySuit).map(Number)
	for (const key of keys) {
		if (groupedBySuit[key].length >= 5) {
			flush.has = true
			flush.value = [Math.max(...__playerHandVal)]
			flush.order = 6
		}
	}

	// Check for Full House
	if (trip.has === true && pair.has === true) {
		fullHouse.has = true
		fullHouse.value = [trip.value]
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
		playerHandVal: __playerHandVal,
		communityHandVal: __communityHandVal
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
	// Part 1 will accumulate player(s) with the highst value hand type.
	// Part 2 will accumulate player(s) of the highest value hand type with the highest value
	// Example, of three players with pairs (one has pair of 5, two has pair of 7s), Part 2 will return players with the 7s.
	// Need to be able to play kicker... not yet implemented.

	const communityCardsVal = players[0].communityHandVal

	let bestHandValue = 0
	let winningPlayers = []

	// Part 1 - Determine winner with best hand value
	for (let player of players) {
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

	// Part 2 - If tie, accumulate players who tie
	let bestChopValue = 0
	let choppingPlayers = []

	if (winningPlayers.length === 1) {
		// winner.textContent = winningPlayers[0].name
		return winningPlayers[0].name
	} else {
		for (let player of winningPlayers) {
			if (
				player.handInfo.value &&
				getMaxVal(player.handInfo.value) > bestChopValue
			) {
				bestChopValue = getMaxVal(player.handInfo.value)
				choppingPlayers = [player]
			} else if (
				player.handInfo.value &&
				getMaxVal(player.handInfo.value) === bestChopValue
			) {
				choppingPlayers.push(player)
			}
		}

		// Check if player gets counterfeited (both players share same value on turn or river)
		if(choppingPlayers.length > 1 && communityCardsVal.indexOf(bestChopValue) !== -1 ){
			const choppingPlayerNames = choppingPlayers.map(player => player.name)
			return `Chop between ${choppingPlayerNames}`
		}

		console.log("choppingPlayers:", choppingPlayers)
		console.log("choppingValue:", bestChopValue)

		// Part 3 - determine winner with best kicker
		let bestKickerValue = 0
		let playerBestKicker = []
		if (choppingPlayers.length === 1) {
			return choppingPlayers[0].name
		}
		
		
		else if (choppingPlayers.length > 0) {
			for (let player of choppingPlayers) {
				if (
					player.hand &&
					getMaxVal(player.playerHandVal) > bestKickerValue
				) {
					bestKickerValue = getMaxVal(player.playerHandVal)
					playerBestKicker = [player]
				} else if (
					player.hand &&
					getMaxVal(player.playerHandVal) === bestKickerValue
				) {
					playerBestKicker.push(player)
				}
			}
		}
		if (playerBestKicker.length > 1) {
			return "Multiple players with best kicker"
		} else {
			return playerBestKicker[0].name
		}
		// winner.textContent = choppingPlayers[0].name
		console.log("playerBestKicker:", playerBestKicker)
		// return playerBestKicker[0].name
	}
	function getMaxVal(arr) {
		if (arr.length === 1) {
			return arr[0]
		}
		return Math.max(...arr)
	}
}

// ***
// if (choppingPlayers.length > 0) evaluate kicker

// Console Code

function testConsole() {
	const testArray = [
		{
			name: "Chop - Pair w Counterfeited King",
			communityCards: ["2S", "7D", "JC", "KD", "KD"],
			players: [
				["2H", "7H"],
				["3C", "7S"],
			],
		},
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
			const communityHandVal = result.communityHandVal
			const playerChips = 1000

			const player = new Player(
				playerName,
				playerHand,
				handInfo,
				handValue,
				playerHandVal,
				communityHandVal,
				playerChips
			)
			players.push(player)
		}
		const winner = determineWinner(players)
		console.log(winner)
	})
}

testConsole()

module.exports = {
	checkCombos,
	determineWinner,
}
