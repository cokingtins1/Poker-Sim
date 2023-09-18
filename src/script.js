import checkCombos from './checkHand.js'
const communityCards = ["5C", "5D", "2S", "8H", "QS"] //["0-2", "6-1","7-2", "9-0", "10-3" ] 2H, 8C, 9H, JD, QS
const playerCards = ["7H", "AD"]

const fullCards = [...communityCards, ...playerCards]

console.log(checkCombos(fullCards))

