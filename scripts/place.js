// place.js - JavaScript for Brazil Country Page

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // ========== FOOTER DYNAMIC CONTENT ==========
  // Set current year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Set last modified date
  const lastModifiedSpan = document.getElementById('last-modified');
  if (lastModifiedSpan) {
    const lastModified = new Date(document.lastModified);
    const formattedDate = lastModified.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
    lastModifiedSpan.textContent = formattedDate;
  }

  // ========== WIND CHILL CALCULATION ==========
  
  // Function to get numeric temperature from DOM
  function getTemperature() {
    const tempElement = document.getElementById('temperature');
    if (!tempElement) return 26;
    const text = tempElement.textContent.trim();
    const match = text.match(/([\d\.]+)/);
    return match ? parseFloat(match[0]) : 26;
  }

  // Function to get numeric wind speed from DOM
  function getWindSpeed() {
    const windElement = document.getElementById('wind-speed');
    if (!windElement) return 12;
    const text = windElement.textContent.trim();
    const match = text.match(/([\d\.]+)/);
    return match ? parseFloat(match[0]) : 12;
  }

  /**
   * Calculate Wind Chill Factor (Metric Units)
   * Formula for °C and km/h:
   * Wind Chill = 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
   * where T = temperature in °C, V = wind speed in km/h
   * 
   * @param {number} tempC - Temperature in Celsius
   * @param {number} windKmh - Wind speed in km/h
   * @returns {number} Wind chill temperature in Celsius (rounded to 1 decimal)
   */
  function calculateWindChill(tempC, windKmh) {
    const vPow = Math.pow(windKmh, 0.16);
    const windChill = 13.12 + 0.6215 * tempC - 11.37 * vPow + 0.3965 * tempC * vPow;
    return Math.round(windChill * 10) / 10;
  }

  /**
   * Check if wind chill calculation conditions are met (Metric)
   * Conditions: Temperature <= 10°C AND Wind Speed > 4.8 km/h
   * 
   * @param {number} tempC - Temperature in Celsius
   * @param {number} windKmh - Wind speed in km/h
   * @returns {boolean} True if wind chill can be calculated
   */
  function isWindChillValid(tempC, windKmh) {
    return tempC <= 10 && windKmh > 4.8;
  }

  /**
   * Update the wind chill display based on current temperature and wind speed
   */
  function updateWindChillDisplay() {
    const temp = getTemperature();
    const wind = getWindSpeed();
    const windChillElement = document.getElementById('wind-chill');
    
    if (!windChillElement) return;
    
    if (isWindChillValid(temp, wind)) {
      const windChill = calculateWindChill(temp, wind);
      windChillElement.textContent = `${windChill} °C`;
    } else {
      windChillElement.textContent = 'N/A';
    }
  }

  // Initialize wind chill display when page loads
  updateWindChillDisplay();
  
  // Optional: Log to console for debugging
  console.log('Brazil page loaded');
  console.log(`Temperature: ${getTemperature()}°C`);
  console.log(`Wind Speed: ${getWindSpeed()} km/h`);
  console.log(`Wind Chill Valid: ${isWindChillValid(getTemperature(), getWindSpeed())}`);
});