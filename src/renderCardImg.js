export function renderCards(
	selector,
	subSelector,
	value,
	{ parent = document } = {}
) {
	const targetElement = parent.querySelector(`[data-${selector}]`)
	const cardPath = value.map((card) => `./cards/${card}.svg `)

	cardPath.forEach((path, i) => {
		targetElement.querySelector(`[data-${subSelector}${i}]`).src = path
	})
}
