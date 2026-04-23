async function test() {
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.instagram.com/torvalds/')}`;
    const response = await fetch(proxyUrl);
    const data = await response.json();
    console.log('Instagram Proxy:', data.status?.http_code);
  } catch (e) {
    console.log('Error 1:', e.cause || e);
  }
  
  try {
    const emailRes = await fetch('https://dns.google/resolve?name=gmail.com&type=MX');
    const emailData = await emailRes.json();
    console.log('Email DoH:', emailData.Answer?.length);
  } catch(e) {
    console.log('Error 2:', e.cause || e);
  }
}
test();
