// Maximum Christmas - Main JavaScript

// Format price
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// Format vote count
function formatVotes(count) {
  if (count === 0) return '0 votes';
  if (count === 1) return '1 vote';
  return `${count} votes`;
}

// Create product card element
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  
  const image = document.createElement('img');
  image.src = product.imageUrl;
  image.alt = product.name;
  image.className = 'product-image';
  image.loading = 'lazy';
  
  const info = document.createElement('div');
  info.className = 'product-info';
  
  const name = document.createElement('h3');
  name.className = 'product-name';
  name.textContent = product.name;
  
  const price = document.createElement('div');
  price.className = 'product-price';
  price.textContent = formatPrice(product.price);
  
  const votes = document.createElement('div');
  votes.className = 'product-votes';
  votes.textContent = formatVotes(product.voteCount);
  
  const link = document.createElement('a');
  link.href = product.affiliateUrl;
  link.className = 'product-link';
  link.textContent = 'Buy on Amazon';
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  
  info.appendChild(name);
  info.appendChild(price);
  info.appendChild(votes);
  info.appendChild(link);
  
  card.appendChild(image);
  card.appendChild(info);
  
  return card;
}

// Load and display leaderboard
async function loadLeaderboard(type) {
  const container = document.getElementById('leaderboard-container');
  if (!container) return;
  
  // Show loading state
  container.innerHTML = '<div class="loading"><div class="spinner"></div><p>Loading leaderboard...</p></div>';
  
  try {
    const response = await fetch(`data/${type}-leaderboard.json`);
    if (!response.ok) {
      throw new Error(`Failed to load ${type} leaderboard`);
    }
    
    const data = await response.json();
    
    if (!data.leaderboard || data.leaderboard.length === 0) {
      container.innerHTML = '<p>No products found.</p>';
      return;
    }
    
    // Clear loading state
    container.innerHTML = '';
    
    // Create cards container
    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'leaderboard-cards';
    
    // Create and append product cards
    data.leaderboard.forEach(product => {
      const card = createProductCard(product);
      cardsContainer.appendChild(card);
    });
    
    container.appendChild(cardsContainer);
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    container.innerHTML = `<p>Error loading leaderboard: ${error.message}</p>`;
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if we're on a leaderboard page
  const path = window.location.pathname;
  
  if (path.includes('real-leaderboard')) {
    loadLeaderboard('real');
  } else if (path.includes('leaderboard')) {
    loadLeaderboard('fake');
  }
});

