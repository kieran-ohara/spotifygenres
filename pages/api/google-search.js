const https = require('https');

const httpGet = (url) => new Promise((fulfil, reject) => {
  const callback = function (response) {
    let str = '';
    response.on('data', (chunk) => {
      str += chunk;
    });
    response.on('end', () => {
      fulfil(str);
    });
    response.on('error', (error) => {
      reject(error);
    });
  };
  https.request(url, callback).end();
});

export default async function handler(req, res) {
  if (!req.query.hasOwnProperty('q')) {
    return res.status(400).json({ error: 'no ?query string provided' });
  }
  try {
    const googleResult = await httpGet(`https://www.google.com/search?q=${req.query.q}`);
    return res.status(200).send(googleResult);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
