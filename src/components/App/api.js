// 39851932-ce9b346420218ff82d4578a42

// api.js

const apiKey = '39851932-ce9b346420218ff82d4578a42';
const baseURL = 'https://pixabay.com/api/';

async function fetchImages(query, page) {
  const response = await fetch(
    `${baseURL}?key=${apiKey}&q=${query}&page=${page}&per_page=12`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();

  return data;
}

export default fetchImages;
