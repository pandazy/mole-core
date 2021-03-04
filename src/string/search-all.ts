interface Cursor {
	at: number;
	trace: string;
}

function resetSearch(cursor: Cursor) {
	cursor.at = -1;
	cursor.trace = '';
}

function saveStep(at: number, char: string, cursor: Cursor) {
	if (cursor.at < 0) {
		cursor.at = at;
	}
	cursor.trace += char;
}

export const searchAll = (target: string) => (src: string): number[] => {
	if (target.length >= src.length) {
		return [];
	}
	const foundPart = (char: string): boolean => target.indexOf(char) >= 0;
	const indices: number[] = [];
	const cur: Cursor = {
		at: -1,
		trace: '',
	};
	const found = (): boolean => target === cur.trace;
	let i = 0;
	for (const char of src) {
		if (foundPart(char)) {
			saveStep(i, char, cur);
			if (found()) {
				indices.push(cur.at);
				resetSearch(cur);
			}
		} else {
			resetSearch(cur);
		}
		i++;
	}
	return indices;
};
