import path from 'path';
import { exec } from "child_process";

describe('bin', () => {
	it('should create the template', async () => {
		const exitCode = await new Promise<number>((resolve) => {
			const rootDir = path.resolve(__dirname, '..');
			const command = `
				cd ${rootDir} &&
				rm -rf tmp &&
				mkdir -p tmp &&
				npm run build &&
				cd tmp &&
				npx ..
			`;
			exec(command, (error) => {
				if (error) {
					resolve(1);
					return;
				}
				resolve(0);
			});
		});
		expect(exitCode).toBe(0);
	});
});
