import axios from 'axios';
import * as cheerio from 'cheerio';
import AdmZip from 'adm-zip';

/**
 * Scrape Overleaf templates based on a tag/query
 * GET /api/overleaf/templates?tag=resume&page=1
 */
export const getTemplates = async (req, res) => {
  try {
    const { tag = '', page = '1' } = req.query;
    
    let url = 'https://www.overleaf.com/latex/templates';
    const params = new URLSearchParams({ sort: 'popular' });
    
    if (tag && tag !== 'All') {
      params.set('q', tag);
    }
    if (page && page !== '1') {
      params.set('page', page);
    }

    url = `${url}?${params.toString()}`;

    console.log(`[Overleaf] Fetching templates from: ${url}`);
    
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      timeout: 15000
    });

    const html = response.data;
    const $ = cheerio.load(html);
    const templates = [];

    $('.gallery-thumbnail').each((_, element) => {
      const aTag = $(element).find('a').first();
      const href = aTag.attr('href') || '';
      
      const match = href.match(/\/latex\/templates\/([^/]+)\/([^/]+)/);
      if (!match) return;
      
      const slug = match[1];
      const id = match[2];
      
      // Ignore gallery navigation links
      if (slug === 'tagged' || slug === 'recent') return;
      
      const title = $(element).find('.caption-title').text().trim();
      const description = $(element).find('.caption-description').text().trim();
      const author = $(element).find('.author-name div').text().trim();
      const image = $(element).find('.thumbnail img').attr('src') || '';
      
      templates.push({
        id,
        slug,
        title,
        description,
        author,
        image,
        accent: '#5ed29c'
      });
    });

    res.json({ success: true, templates, totalFetched: templates.length });
  } catch (error) {
    console.error('[Overleaf] Scrape error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch templates from Overleaf.' });
  }
};

/**
 * Download ZIP from Overleaf, extract main.tex, and return source
 * GET /api/overleaf/download?id=...&slug=...
 */
export const downloadTemplate = async (req, res) => {
  try {
    const { id, slug } = req.query;
    if (!id || !slug) {
      return res.status(400).json({ success: false, error: 'Missing id or slug parameter.' });
    }

    const zipUrl = `https://www.overleaf.com/latex/templates/${slug}/${id}/zip`;
    console.log(`[Overleaf] Downloading ZIP from: ${zipUrl}`);

    const response = await axios.get(zipUrl, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept': 'application/zip'
      },
      timeout: 20000
    });

    const buffer = Buffer.from(response.data);
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();
    
    let mainTexContent = '';
    
    let mainTexEntry = zipEntries.find(entry => entry.entryName.toLowerCase() === 'main.tex');
    
    if (!mainTexEntry) {
      mainTexEntry = zipEntries.find(entry => 
        entry.entryName.endsWith('.tex') && 
        !entry.entryName.startsWith('.') && 
        !entry.entryName.startsWith('_') &&
        !entry.entryName.includes('/')
      );
    }

    if (!mainTexEntry) {
      mainTexEntry = zipEntries.find(entry => entry.entryName.endsWith('.tex'));
    }

    if (mainTexEntry) {
      mainTexContent = mainTexEntry.getData().toString('utf8');
      console.log(`[Overleaf] Successfully extracted ${mainTexEntry.entryName} (${mainTexContent.length} bytes)`);
    } else {
      console.error('[Overleaf] No .tex file found in ZIP archive.');
      return res.status(404).json({ success: false, error: 'No .tex file found in template archive.' });
    }

    res.json({ success: true, source: mainTexContent, filename: mainTexEntry.entryName });
  } catch (error) {
    console.error('[Overleaf] Download/Extract error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to download or extract template from Overleaf.' });
  }
};
