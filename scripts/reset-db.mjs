import { copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, '..');
const seedPath = path.join(projectDir, 'db.seed.json');
const databasePath = path.join(projectDir, 'db.json');

try {
	await copyFile(seedPath, databasePath);
	console.log('Database reset from db.seed.json.');
} catch (error) {
	console.error('Could not reset the database:', error.message);
	process.exitCode = 1;
}
