const axios = require('axios');
const cheerio = require('cheerio');

async function test() {
  const url = 'https://www.overleaf.com/latex/templates/dtu-btech-project-template/ttpjvzgcbpyk';
  try {
    const res = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      }
    });
    const $ = cheerio.load(res.data);
    const links = [];
    $('a').each((i, el) => {
      const href = $(el).attr('href');
      if (href) links.push(href);
    });
    console.log(links);
  } catch (e) {
    console.error('Error:', e.message);
  }
}
test();
