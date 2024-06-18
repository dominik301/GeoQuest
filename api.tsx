const BASE_URL = ' http://192.168.188.26:5000'
import levelsData from './assets/levels.json';

interface IDictionary {
  [key: string]: any;
}

const deserialize = (response: IDictionary) => {
  if (!response.ok) throw new Error('There was a problem fetching your request')

  return response.headers.get('Content-Type') && response.headers.get('Content-Type').includes('json')
    ? response.json()
    : response.text()
}

export const sendRequest = (queryString: string) => {
  if (queryString === 'levels') {
    // Return a resolved promise with the local JSON data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(levelsData);
      }, 500); // Optional delay to simulate async behavior
    });
  } else if (queryString.startsWith('level/')) {
    // Return a resolved promise with the local JSON data
    const id = queryString.split('/')[1];
    const level = levelsData.find((level: { id: number }) => level.id === Number(id));
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(level);
      }, 500); // Optional delay to simulate async behavior
    });
  }  
  else {
    // Construct the URL for remote fetching
    const url = `${BASE_URL}/${queryString}`;
    console.log(url);
    // Fetch from the remote server
    return fetch(url).then(deserialize);
  }
}
