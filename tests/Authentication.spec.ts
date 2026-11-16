/*

1) No Auth (Public API)
2) Basic Auth
3) Bearer Token
4) API Key (in header or query)




import { test, expect } from '@playwright/test';


//1) No Auth (Public API)

test('Public API - No Auth', async ({ request }) => {
  const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
  expect(response.ok()).toBeTruthy();
  const data = await response.json();
  console.log(data);
});

//Combine username and password with :

//Convert it to Base64

//Attach it to the Authorization header
//here user name is user and password is pass
// 2. Basic Auth
test('Basic Auth - HTTPBin', async ({ request }) => {
  const response = await request.get('https://httpbin.org/basic-auth/user/pass', {
    headers: {
      Authorization: 'Basic ' + Buffer.from('user:pass').toString('base64'),
    },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});


// 3. Bearer Token Auth (Get github user repositories)

test('Verify Bearer Token Authentication', async ({ request }) => {
  const bearerToken = process.env.GITHUB_TOKEN;
  test.skip(!bearerToken, 'Set GITHUB_TOKEN to verify GitHub bearer authentication.');

  const response = await request.get('https://api.github.com/user/repos', {
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });

  expect(response.status()).toBe(200);
  const repos = await response.json();
  console.log(repos);
});

// 3.1. Bearer Token Auth (Get github user info)

test('Bearer Token Auth', async ({ request }) => {
  const token = process.env.GITHUB_TOKEN;
  test.skip(!token, 'Set GITHUB_TOKEN to verify GitHub token auth.');

  const response = await request.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': 'playwright',
    },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

// 4. API Key Authentication
// https://openweathermap.org/current
test('Verify API Key Authentication', async ({ request }) => {
  const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY;
  test.skip(!openWeatherApiKey, 'Set OPEN_WEATHER_API_KEY to verify OpenWeather API key auth.');

  const response = await request.get('https://api.openweathermap.org/data/2.5/weather', {
    params: {
      q: 'Delhi',
      appid: openWeatherApiKey,
    },
  });

  expect(response.status()).toBe(200);
  const weather = await response.json();
  console.log(weather);
});

// 4.1 API Key Auth
// Ref Link: https://www.weatherapi.com/docs/
// Returns current weather of city
//You need to signup and then you can find your API key under your account.
 //https://www.weatherapi.com/signup.aspx

//API Key (14 days trial)  

test('API Key Auth - Header', async ({ request }) => {
  const weatherApiKey = process.env.WEATHER_API_KEY;
  test.skip(!weatherApiKey, 'Set WEATHER_API_KEY to verify weather API auth.');

  const response = await request.get('https://api.weatherapi.com/v1/current.json', {
    params: { q: 'India', key: weatherApiKey },
  });
  expect(response.status()).toBe(200);
  const data = await response.json();
  console.log(data);
});

*/