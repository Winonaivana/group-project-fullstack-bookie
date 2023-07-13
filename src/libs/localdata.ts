// Note to others:
// this function are used for private developement only, delete after connecting to API

import fsPromises from 'fs/promises';
import path from 'path';

const getLocalData = async () => {
  const filePath = path.join(process.cwd(), 'src/json/dummyData.json');
  const jsonData = await fsPromises.readFile(filePath, 'utf-8');
  const objectData = JSON.parse(jsonData);
  return objectData;
};

export { getLocalData };
