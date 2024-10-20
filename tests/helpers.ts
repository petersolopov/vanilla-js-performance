import * as fs from 'fs/promises';
import * as path from 'path';

export async function writeToFile(name, value) {
  const filePath = `data/${name}.json`;

  let jsonArray;

  try {
    const fileContent = await fs.readFile(filePath, 'utf8');
    jsonArray = JSON.parse(fileContent);
  } catch (error) {
    jsonArray = [];
  }

  const date = new Date().toISOString();

  jsonArray.push({ date, value });

  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });

  await fs.writeFile(filePath, JSON.stringify(jsonArray, null, 2));
}
