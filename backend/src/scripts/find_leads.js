import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CURATED_LEADS = [
  { email: 'recruitment@google.com', name: 'Google Talent Acquisition', segment: 'Recruiter' },
  { email: 'tech-hiring@amazon.com', name: 'Amazon Web Services Careers', segment: 'Recruiter' },
  { email: 'india-careers@stripe.com', name: 'Stripe India Recruiting', segment: 'Recruiter' },
  { email: 'placement-cell@iitb.ac.in', name: 'IIT Bombay Placement Coordinator', segment: 'University' },
  { email: 'careers@flipkart.com', name: 'Flipkart HR Team', segment: 'Recruiter' },
  { email: 'hackathon-leads@devpost.com', name: 'Developer Community Outreaches', segment: 'Student Group' }
];

const fetchPublicLeads = () => {
  return new Promise((resolve) => {
    console.log('Searching online directories for prospective developer leads...');
    
    const url = 'https://api.github.com/search/users?q=location:India+repos:>5+followers:>5';
    const options = {
      headers: {
        'User-Agent': 'Prepzo-Lead-Discovery-Daemon'
      }
    };

    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (parsed && parsed.items) {
            const leads = parsed.items.slice(0, 5).map(item => ({
              email: `${item.login}@users.noreply.github.com`,
              name: item.login,
              segment: 'Public Developer'
            }));
            console.log(`Successfully scraped ${leads.length} leads from GitHub directory.`);
            resolve(leads);
          } else {
            console.log('GitHub API rate limit or error encountered. Falling back to curated directory.');
            resolve([]);
          }
        } catch (e) {
          resolve([]);
        }
      });
    }).on('error', () => {
      resolve([]);
    });
  });
};

const run = async () => {
  const scrapedLeads = await fetchPublicLeads();
  const allLeads = [...CURATED_LEADS, ...scrapedLeads];
  
  const destPath = path.join(__dirname, '../../../data/leads.json');
  const destDir = path.dirname(destPath);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.writeFileSync(destPath, JSON.stringify(allLeads, null, 2));
  console.log(`✅ Leads list compiled successfully! Total leads saved: ${allLeads.length} to ${destPath}`);
};

run().catch(console.error);
