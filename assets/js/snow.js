// Snow Animation Script

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.innerHTML = '❄';
  
  // Random starting position
  snowflake.style.left = Math.random() * 100 + '%';
  
  // Random size
  const size = Math.random() * 1.5 + 0.5;
  snowflake.style.fontSize = size + 'em';
  
  // Random animation duration (8-15 seconds) - slower fall
  const duration = Math.random() * 7 + 8;
  snowflake.style.animationDuration = duration + 's';
  
  // Random delay
  snowflake.style.animationDelay = Math.random() * 2 + 's';
  
  return snowflake;
}

function initSnow() {
  const snowContainer = document.createElement('div');
  snowContainer.className = 'snow-container';
  document.body.appendChild(snowContainer);
  
  // Create initial snowflakes
  const snowflakeCount = 50;
  for (let i = 0; i < snowflakeCount; i++) {
    const snowflake = createSnowflake();
    snowContainer.appendChild(snowflake);
    
    // Remove snowflake after animation completes
    snowflake.addEventListener('animationend', () => {
      snowflake.remove();
      // Create a new snowflake to maintain constant snowfall
      const newSnowflake = createSnowflake();
      snowContainer.appendChild(newSnowflake);
    });
  }
}

// Initialize snow when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSnow);
} else {
  initSnow();
}

