#!/usr/bin/env node

import path from 'path';
import fs from 'fs-extra';

const rename = async (dest: string): Promise<void> => {
	const files = [
		'.gitattributes',
		'.gitignore',
		'.npmignore',
	];
	for (const file of files) {
		await fs.move(
			path.join(dest, `${file}-t`),
			path.join(dest, file),
		);
	}
}

const main = async (): Promise<void> => {
	try {
		const src = path.resolve(__dirname, '../template');
		const dest = process.cwd();
		await fs.copy(src, dest, {
			overwrite: false,
		});
		await rename(dest);
		console.log('Success');
		process.exitCode = 0;
	} catch (error) {
		console.error('Error');
		process.exitCode = 1;
	}
}

main();
