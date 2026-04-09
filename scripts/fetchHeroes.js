import 'dotenv/config';
import fs from 'fs/promises';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error('Missing API_KEY in environment variables');
}

const BASE_URL = `https://superheroapi.com/api/${API_KEY}`;

// 🔤 Alphabet + extra keywords (important!)
const queries = [
  ...'abcdefghijklmnopqrstuvwxyz'.split(''),
  'man',
  'woman',
  'bat',
  'spider',
  'super',
  'iron',
  'captain',
  'dark',
];

// ⏱️ Delay helper (prevents rate limiting)
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// 🧠 Store unique heroes by ID
const heroesMap = new Map();

async function fetchHeroes() {
  console.log('🚀 Starting hero scrape...\n');

  for (const query of queries) {
    try {
      console.log(`🔎 Fetching: "${query}"`);

      const res = await fetch(`${BASE_URL}/search/${query}`);

      if (!res.ok) {
        console.log(`❌ HTTP error for "${query}": ${res.status}`);
        continue;
      }

      const data = await res.json();

      if (data.response !== 'success') {
        console.log(`⚠️ API error for "${query}": ${data.error}`);
        continue;
      }

      for (const hero of data.results) {
        if (!heroesMap.has(hero.id)) {
          heroesMap.set(hero.id, hero);
        }
      }

      console.log(`✅ Added ${data.results.length} heroes (total: ${heroesMap.size})`);

      // ⏱️ Wait 200ms between requests
      await delay(200);
    } catch (err) {
      console.log(`🔥 Error fetching "${query}":`, err);
    }
  }

  const heroes = Array.from(heroesMap.values());

  console.log(`\n🎉 Finished! Total unique heroes: ${heroes.length}`);

  // 💾 Save to JSON file
  await fs.writeFile('./data/heroes.json', JSON.stringify(heroes, null, 2));

  console.log('💾 Saved to /data/heroes.json');
}

fetchHeroes();
