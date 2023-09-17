const communityCards = ["2H", "8C", "9H", "JD", "QS", "10H", "9D"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS

function parseCards(card) {
	return card.map((card) => {
		const valueMap = { J: 9, Q: 10, K:11, A:12 }
		const value = valueMap[card.slice(0, -1)] || parseInt(card.slice(0, -1)) - 2
    const suitMap = {D:0, C:1, H:2, S:3}
    const suitCode = suitMap[card.slice(-1)]
    return{value, suitCode}
			
	})
}





const test1 = [0,2,4,3,5,5]
const testSet = new Set(test1)

console.log(testSet[0])
