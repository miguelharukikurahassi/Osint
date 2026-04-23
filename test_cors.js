const fetch = require('node:fetch');
const https = require('node:https');

async function test() {
  const agent = new https.Agent({ rejectUnauthorized: false });
  try {
    const res = await fetch('https://dns.google/resolve?name=gmail.com&type=MX', { agent });
    console.log('CORS Headers for DNS.google:');
    console.log('Access-Control-Allow-Origin:', res.headers.get('access-control-allow-origin'));
  } catch (e) {
    console.log(e.message);
  }
}
test();
