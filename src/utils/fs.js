import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';

/**
 * Ensures a directory exists, creating it recursively if needed
 */
export async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

/**
 * Writes a file, creating parent directories as needed
 */
export async function writeFileSafe(filePath, content) {
  await ensureDir(dirname(filePath));
  await writeFile(filePath, content, 'utf-8');
}

/**
 * Joins paths and normalizes for cross-platform use
 */
export function joinPath(...parts) {
  return join(...parts);
}
