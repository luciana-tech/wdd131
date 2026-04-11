// The Right City - Main JavaScript File

const citiesData = [
    { id: 1, rank: 1, name: "Curitiba", state: "PR", quality: 94, costBenefit: 91, education: 93, health: 91, safety: 88, image: "images/curitiba.webp", description: "Known for innovative urban planning, extensive green spaces." },
    { id: 2, rank: 2, name: "Joinville", state: "SC", quality: 89, costBenefit: 88, education: 87, health: 86, safety: 85, image: "images/joinville.webp", description: "Industrial hub with excellent infrastructure and job market." },
    { id: 3, rank: 3, name: "São José dos Campos", state: "SP", quality: 87, costBenefit: 84, education: 88, health: 85, safety: 82, image: "images/sjcampos.webp", description: "Major technology hub in São Paulo state." }
];

// Store event listeners for cleanup
let howItWorksButton = null;
let howItWorksHandler = null;
let signupForm = null;
let signupHandler = null;

// Fallback SVG for images
const getImageFallback = (name) => `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 340 425'%3E%3Crect width='100%25' height='100%25' fill='%23e0daf5'/%3E%3Ctext x='170' y='212' text-anchor='middle' fill='%23524F81' font-size='20'%3E${encodeURIComponent(name)}%3C/text%3E%3C/svg%3E`;

// Update footer
function updateFooter() {
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    const modSpan = document.getElementById('lastModified');
    if (modSpan && document.lastModified) {
        modSpan.textContent = `Modified: ${document.lastModified.slice(0,16)}`;
    }
}

// Cleanup function for bfcache
function cleanupPage() {
    if (howItWorksButton && howItWorksHandler) {
        howItWorksButton.removeEventListener('click', howItWorksHandler);
    }
    if (signupForm && signupHandler) {
        signupForm.removeEventListener('submit', signupHandler);
    }
    howItWorksButton = null;
    signupForm = null;
}

// Setup how it works button 
function setupHowItWorksButton() {
    const btn = document.getElementById('howItWorksBtn');
    const section = document.getElementById('explanationSection');
    if (btn && section) {
        howItWorksButton = btn;
        howItWorksHandler = (e) => {
            e.preventDefault();
            const isVisible = section.classList.contains('show');
            if (isVisible) {
                section.classList.remove('show');
                btn.textContent = '📈 How We Calculate It';
                btn.setAttribute('aria-expanded', 'false');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline');
            } else {
                section.classList.add('show');
                btn.textContent = '📈 Hide Explanation';
                btn.setAttribute('aria-expanded', 'true');
                btn.classList.remove('btn-outline');
                btn.classList.add('btn-primary');
                // Delay scroll to after transition starts
                setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
            }
        };
        btn.addEventListener('click', howItWorksHandler);
    }
}

// Load home page content
function loadHomePage() {
    const indicators = [
        { emoji: "📚", title: "Education", score: "87/100", desc: "IDEB scores, literacy rate" },
        { emoji: "🏥", title: "Healthcare", score: "82/100", desc: "Hospital beds per capita" },
        { emoji: "🚔", title: "Safety", score: "74/100", desc: "Homicide rate, policing" },
        { emoji: "🏗️", title: "Infrastructure", score: "79/100", desc: "Sanitation, mobility" }
    ];
    const container = document.getElementById('indicatorsContainer');
    if (container) {
        container.innerHTML = indicators.map(i => `
            <div class="info-card">
                <div class="emoji">${i.emoji}</div>
                <h3>${i.title}</h3>
                <div class="score">${i.score}</div>
                <p>${i.desc}</p>
            </div>
        `).join('');
    }
    const preview = document.getElementById('topCitiesPreview');
    if (preview) {
        preview.innerHTML = citiesData.map(city => `
            <div class="preview-card">
                <img src="${city.image}" alt="${city.name}" class="preview-image" width="70" height="88" loading="lazy" decoding="async" onerror="this.src='${getImageFallback(city.name)}'">
                <div class="preview-content">
                    <span class="rank-badge">#${city.rank}</span>
                    <h3>${city.name} (${city.state})</h3>
                    <div class="preview-scores"><span>⭐ ${city.quality}/100</span><span>💰 ${city.costBenefit}/100</span></div>
                </div>
            </div>
        `).join('');
    }
    setupHowItWorksButton();
}

// Load ranking page content
function loadRankingPage() {
    const container = document.getElementById('rankingContainer');
    if (container) {
        container.innerHTML = citiesData.map(city => `
            <div class="city-card">
                <img src="${city.image}" alt="${city.name}" class="city-image" width="340" height="425" loading="lazy" decoding="async" onerror="this.src='${getImageFallback(city.name)}'">
                <div class="city-info">
                    <div class="rank-badge">#${city.rank}</div>
                    <h2 class="city-name">${city.name}</h2>
                    <p class="city-state">${city.state}</p>
                    <p class="city-description">${city.description}</p>
                    <div class="scores">
                        <div><div class="score-label">Quality</div><div class="score-value">${city.quality}</div></div>
                        <div><div class="score-label">Cost</div><div class="score-value">${city.costBenefit}</div></div>
                        <div><div class="score-label">Education</div><div class="score-value">${city.education}</div></div>
                        <div><div class="score-label">Health</div><div class="score-value">${city.health}</div></div>
                        <div><div class="score-label">Safety</div><div class="score-value">${city.safety}</div></div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Load signup page content
function loadSignupPage() {
    const form = document.getElementById('signupForm');
    if (form) {
        signupForm = form;
        signupHandler = (e) => {
            e.preventDefault();
            const name = document.getElementById('userName')?.value.trim();
            const email = document.getElementById('userEmail')?.value.trim();
            const region = document.getElementById('preferredRegion')?.value;
            const priority = document.querySelector('input[name="priority"]:checked')?.value;
            
            if (!name) { alert('Please enter your name.'); return; }
            if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
            if (!region) { alert('Please select a preferred region.'); return; }
            if (!priority) { alert('Please select your priority preference.'); return; }
            
            try { 
                localStorage.setItem('userPreferences', JSON.stringify({ name, email, region, priority, date: new Date().toISOString() })); 
            } catch(e) {}
            
            const successDiv = document.getElementById('successMessage');
            if (successDiv) {
                successDiv.innerHTML = `<div class="success-alert">✅ Thank you ${name}! We'll send recommendations to ${email}.</div>`;
                successDiv.style.display = 'block';
                form.reset();
                setTimeout(() => { successDiv.style.display = 'none'; }, 4000);
            }
        };
        form.addEventListener('submit', signupHandler);
    }
}

// Initialize page 
function initPage() {
    updateFooter();
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === page) link.classList.add('active');
    });
    if (page === 'index.html' || page === '') {
        loadHomePage();
    } else if (page === 'ranking.html') {
        loadRankingPage();
    } else if (page === 'signup.html') {
        loadSignupPage();
    }
}

// Handle bfcache restore 
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        // Page was restored from bfcache - reinitialize
        cleanupPage();
        initPage();
    }
});

// Handle page unload 
window.addEventListener('pagehide', () => {
    cleanupPage();
});

// Start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}