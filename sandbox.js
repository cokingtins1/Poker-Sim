function convertToString(value) {
    const wordsMap = new Map([
        [2, "deuce"],
        [3, "three"],
        [4, "four"],
        [5, "five"],
        [6, "six"],
        [7, "seven"],
        [8, "eight"],
        [9, "nine"],
        [10, "ten"],
        [11, "jack"],
        [12, "queen"],
        [13, "king"],
        [14, "ace"]
    ]);

    if (Array.isArray(value)) {
        return value.map(card => wordsMap.get(card) || "Invalid card value");
    } else {
        return wordsMap.get(value) || "Invalid card value";
    }
}

console.log(convertToString([5,7]))
