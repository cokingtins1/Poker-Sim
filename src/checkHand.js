import { Player } from "./createPlayers.js"

export const HAND_MAP = new Map()
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
export function checkCombos(playerHand = [], community = []) {
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
			pair.kicker = returnKicker(pair.value, pair.order)
			pair.message = pair.value
			twoPairCombo.push(index)
		} else if (groupedByValue[index].length === 3) {
			trip.value = index
			trip.has = true
			trip.order = 4
			trip.kicker = returnKicker(trip.value, trip.order)
			trip.message = trip.value
			twoPairCombo.push(index)
			falseTrip.count += 1
			falseTrip.count === 1 ? (falseTrip.tripOne = index) : []
			falseTrip.count === 2 ? (falseTrip.tripTwo = index) : []

			falseTrip.count === 2
				? (falseTrip.kicker = [falseTrip.tripOne, falseTrip.tripTwo])
				: []
		} else if (groupedByValue[index].length === 4) {
			quad.value = index
			quad.has = true
			quad.order = 8
			quad.message = quad.value
		}
	}

	// Check for Two Pair
	if (twoPairCombo.length > 1) {
		twoPair.value = parseInt(
			twoPairCombo.slice(-2)[0].toString() +
				twoPairCombo.slice(-2)[1].toString()
		)
		twoPair.has = true
		twoPair.order = 3
		twoPair.message = [twoPairCombo.slice(-2)[0],twoPairCombo.slice(-2)[1]]
		twoPair.kicker = returnKicker(twoPairCombo.slice(-2), twoPair.order)
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
				straight.message = straight.value
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
				straightFlush.message = straightFlush.value
			}

			if (
				Math.max(...Object.values(flushCount)) >= 5 &&
				straightEnd === 13
			) {
				royalFlush.has = true
				royalFlush.value = straightEnd
				royalFlush.order = 10
				royalFlush.message = royalFlush.value
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
			flush.kicker = returnKicker(flushArray, flush.order)
			flush.message = flush.value
		}
	}

	// Check for Full House
	if (falseTrip.count === 2) {
		fullHouse.has = true
		fullHouse.kicker = [
			Math.max(...falseTrip.kicker),
			Math.min(...falseTrip.kicker),
		]
		fullHouse.value = convertValue(fullHouse.kicker)
		fullHouse.order = 7
		fullHouse.message = fullHouse.kicker
	}

	if (trip.has === true && pair.has === true) {
		fullHouse.has = true

		fullHouse.kicker = [
			trip.value,
			twoPair.has
				? Math.max(...twoPairCombo.slice(-2)) !== trip.value
					? Math.max(...twoPairCombo.slice(-2))
					: Math.min(...twoPairCombo.slice(-2))
				: undefined,
		]
		fullHouse.value = convertValue(fullHouse.kicker) // [trip, pair] -> [10,2] = 1.02 [2,10] -> .210
		fullHouse.order = 7
		fullHouse.message = fullHouse.kicker

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
		highCard.value = Math.max(...valueArray)
		highCard.order = 1
		highCard.kicker = Math.max(...__playerHandVal)
		highCard.message = highCard.value
	}

	// Return hand that player has
	let hand = null
	for (const rankName in handRanks) {
		const rank = handRanks[rankName]
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

		if (order === 2 || order === 4) {
			count = __communityHandVal.filter(
				(num) => num === cardInvolved
			).length
		}

		if (order === 2) {
			if (count === 0) {
				//player contains the pair, no kicker
				kicker = 0
			} else if (count === 1) {
				// player shares the pair, kicker is greatest card that is not in pair
				kicker = __playerHandVal.find((value) => value !== cardInvolved)
			} else if (count === 2) {
				// comm owns the pair, kicker is greatest card in HAND
				kicker = Math.max(...__playerHandVal)
			}
		}

		if (order === 3) {
			let notUsed = []
			notUsed = __playerHandVal.filter((value) => {
				return cardInvolved.indexOf(value) === -1
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

		if (order === 4 && count === 3) {
			// comm owns trips, kicker = highest player hand
			kicker = Math.max(...__playerHandVal)
		}

		if (order === 6) {
			const flushArray = cardInvolved
			const cardUsed = __playerHand.filter((card) => {
				return flushArray.some(
					(involvedCard) =>
						involvedCard.value === card.value &&
						involvedCard.suitCode === card.suitCode
				)
			})
			
			if (cardUsed.length === 0) {
				kicker = 0
			} else if (cardUsed.length === 1) {
				kicker = cardUsed[0].value
			} else if (cardUsed.length === 2) {
				kicker = cardUsed.reduce((maxCard, currentCard) => {
					return currentCard.value > maxCard.value
						? currentCard
						: maxCard
				}, cardUsed[0])
			}
		}

		return kicker
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
			message: undefined
		}
	}

	function convertValue(fullHouseVal) {
		let num1, num2

		if (fullHouseVal[0] > 9) {
			num1 = (fullHouseVal[0] / 10).toFixed(1).toString()
		} else {
			num1 = (fullHouseVal[0] / 10).toFixed(1)
		}

		num2 =
			fullHouseVal[1] > 9
				? fullHouseVal[1].toString()
				: "0" + fullHouseVal[1].toString()

		const sum = num1 + num2
		return sum
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
}

// Determine Winner -----------------------------------------------------
export function determineWinner(players) {
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
	let evalKickerPlayers = []

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
	
	if (winningPlayers.length === 1) {
		return winningPlayers
	} else if (winningPlayers.length > 1) {
		for (let player of winningPlayers) {
			if (player.handInfo.value > bestHandValue2) {
				bestHandValue2 = player.handInfo.value
				evalKickerPlayers = [player]
			} else if (player.handInfo.value === bestHandValue2) {
				evalKickerPlayers.push(player)
			}
		}
	}

	
	// Part 2 - If players tie, determine best kicker
	if (evalKickerPlayers.length === 1) {
		return evalKickerPlayers
	} else if (evalKickerPlayers.length > 1) {
		const handOrder = evalKickerPlayers[0].handInfo.order

		// Check if Comm player has same hand as evalKickerPlayers
		const sameHandOrder = allHands.every(
			(player) => player.handInfo.order === handOrder
		)

		if (evalKickerPlayers.length > 1) {
			if ([5, 6, 7, 9, 10].includes(handOrder)) {
				// hand is straight, flush, SF, RF or full house
				return sameHandOrder
					? evalKicker(allHands)
					: evalKicker(evalKickerPlayers)
			}

			if ([1, 2, 3, 4, 8].includes(handOrder)) {
				// hand is high card, P, 2P, 3, 4
				return evalKicker(evalKickerPlayers, true)
			}
		}
	}

	// Function for who has the highest pair

	function evalKicker(players, kicker = false) {
		let bestKickerValue = -1
		let playerBestKicker = []

		for (let player of players) {
			let currentValue

			if (kicker) {
				currentValue = Math.max(player.handInfo.kicker) // for pairs
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
		console.log(players)
		if (
			players.length > 1 &&
			players.some((obj) => obj.name === "Community Player")
		) {
			players = players.filter((obj) => obj.name !== "Community Player")
			return players

			// const choppingPlayerNames = getNames(players)
			// return `Chop between ${choppingPlayerNames}`
		} else if (
			players.length > 1 &&
			players.some((obj) => obj.name !== "Community Player")
		) {
			return players
			// const choppingPlayerNames = getNames(players)
			// return `Chop between ${choppingPlayerNames}`
		} else {
			return players
		}
	}

	function getNames(names) {
		return names.map((player) => player.name)
	}
}
