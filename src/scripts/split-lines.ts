/**
 * Splits an element's text into overflow-masked line spans for reveal animation.
 * Mirrors the measure-then-wrap approach used by AnimatedText / useSplitLines.
 */
export function splitElementIntoLines(element: HTMLElement): HTMLSpanElement[] {
	const text = element.textContent?.replace(/\s+/g, ' ').trim() ?? '';
	if (text === '') return [];

	element.setAttribute('aria-label', text);
	element.textContent = '';
	element.classList.add('line-cont');

	const measure = document.createElement('span');
	measure.className = 'line-wrapper';
	measure.setAttribute('aria-hidden', 'true');
	element.appendChild(measure);

	const words = text.split(' ');
	const lines: string[] = [];
	let current = '';

	for (const word of words) {
		const next = current === '' ? word : `${current} ${word}`;
		measure.textContent = next;

		const nextHeight = measure.offsetHeight;
		measure.textContent = 'Á';
		const singleLineHeight = measure.offsetHeight;

		if (current !== '' && nextHeight > singleLineHeight * 1.4) {
			lines.push(current);
			current = word;
		} else {
			current = next;
		}
	}

	if (current !== '') lines.push(current);
	measure.remove();

	return lines.map((line) => {
		const lineEl = document.createElement('span');
		lineEl.className = 'line';
		lineEl.setAttribute('aria-hidden', 'true');

		const inner = document.createElement('span');
		inner.textContent = line;
		// Inline initial state — don't rely on scoped CSS matching JS-created nodes.
		inner.style.transform = 'translateY(110%)';
		inner.style.display = 'block';
		lineEl.appendChild(inner);
		element.appendChild(lineEl);

		return inner;
	});
}
