const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'https://maximumchristmas.com/api';
const DATA_DIR = path.join(__dirname, '..', 'data');
const IMAGES_DIR = path.join(__dirname, '..', 'assets', 'images', 'products');

// Ensure directories exist
[DATA_DIR, IMAGES_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Download file helper
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Handle redirects
        return downloadFile(response.headers.location, filepath).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
      
      fileStream.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

// Fetch JSON from API
function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

// Get file extension from URL
function getExtension(url) {
  const match = url.match(/\.(jpg|jpeg|png|gif|webp)(\?|$)/i);
  return match ? match[1] : 'jpg';
}

// Download image and return local path
async function downloadImage(imageUrl, productId) {
  try {
    const ext = getExtension(imageUrl);
    const filename = `${productId}.${ext}`;
    const filepath = path.join(IMAGES_DIR, filename);
    
    // Skip if already downloaded
    if (fs.existsSync(filepath)) {
      console.log(`  Image already exists: ${filename}`);
      return `assets/images/products/${filename}`;
    }
    
    console.log(`  Downloading image: ${imageUrl}`);
    await downloadFile(imageUrl, filepath);
    return `assets/images/products/${filename}`;
  } catch (error) {
    console.error(`  Error downloading image ${imageUrl}:`, error.message);
    // Return original URL as fallback
    return imageUrl;
  }
}

// Process leaderboard
async function processLeaderboard(type) {
  console.log(`\nFetching ${type} leaderboard...`);
  
  const apiUrl = `${API_BASE}/${type === 'real' ? 'real-leaderboard' : 'fake-leaderboard'}`;
  const data = await fetchJSON(apiUrl);
  
  console.log(`Found ${data.leaderboard.length} products`);
  
  // Download images and update paths
  for (const product of data.leaderboard) {
    console.log(`Processing: ${product.name} (ID: ${product.id})`);
    product.imageUrl = await downloadImage(product.imageUrl, product.id);
  }
  
  // Save JSON
  const jsonPath = path.join(DATA_DIR, `${type}-leaderboard.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
  console.log(`Saved data to ${jsonPath}`);
  
  return data;
}

// Main execution
async function main() {
  try {
    console.log('Starting data collection...');
    
    await processLeaderboard('real');
    await processLeaderboard('fake');
    
    console.log('\n✅ Data collection complete!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

main();

