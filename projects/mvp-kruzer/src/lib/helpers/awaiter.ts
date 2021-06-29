export function awaiter(time: number = 0) {
	return new Promise((res, rej) => {
		setTimeout(() => res(null), time);
	});
}

export function awaiterWhile(fn: () => boolean, maxTime: number = 5000) {
	let counter: number = 0;
	return new Promise(async (res, rej) => {
		try {
			while (!fn()) {
				if (counter >= maxTime) {
					rej(new Error('Exceed max time: ' + maxTime))
				}
				await awaiter(50);
				counter += 50;
			}
			res(null);
		} catch (error) {
			rej(error);
		}

	});
}