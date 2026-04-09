// Product Array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Function to populate product select options
function populateProductSelect() {
    const selectElement = document.getElementById('productName');
    if (!selectElement) return;
    
    // Clear any existing options (except the placeholder)
    while (selectElement.options.length > 1) {
        selectElement.remove(1);
    }
    
    // Loop through products array and create options
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        // Capitalize first letter of each word
        const formattedName = product.name.split(' ').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
        option.textContent = formattedName;
        selectElement.appendChild(option);
    });
}

// Function to get review count from localStorage
function getReviewCount() {
    const count = localStorage.getItem('productReviewCount');
    return count ? parseInt(count) : 0;
}

// Function to increment review count
function incrementReviewCount() {
    const currentCount = getReviewCount();
    const newCount = currentCount + 1;
    localStorage.setItem('productReviewCount', newCount);
    return newCount;
}

// Function to display review count on review page
function displayReviewCount() {
    const counterElement = document.getElementById('reviewCount');
    if (counterElement) {
        const count = getReviewCount();
        counterElement.textContent = count;
    }
}

// Function to validate form before submission
function validateForm(event) {
    const productName = document.getElementById('productName');
    const rating = document.querySelector('input[name="rating"]:checked');
    const installDate = document.getElementById('installDate');
    
    let isValid = true;
    let errorMessage = '';
    
    if (!productName.value) {
        errorMessage += 'Please select a product.\n';
        isValid = false;
    }
    
    if (!rating) {
        errorMessage += 'Please select a rating.\n';
        isValid = false;
    }
    
    if (!installDate.value) {
        errorMessage += 'Please select the installation date.\n';
        isValid = false;
    }
    
    if (!isValid) {
        event.preventDefault();
        alert('Please complete all required fields:\n\n' + errorMessage);
        return false;
    }
    
    // Increment review count when form is submitted
    incrementReviewCount();
    return true;
}

// Function to update footer with current year and last modified
function updateFooter() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentyear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const lastModified = document.lastModified;
        lastModifiedElement.textContent = `Last Modified: ${lastModified}`;
    }
}

// Initialize page based on current page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'form.html' || currentPage === '' || currentPage === 'index.html') {
        populateProductSelect();
        
        const form = document.getElementById('reviewForm');
        if (form) {
            form.addEventListener('submit', validateForm);
        }
        
        const dateInput = document.getElementById('installDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.max = today;
        }
    } else if (currentPage === 'review.html') {
        displayReviewCount();
    }
    
    // Update footer on all pages
    updateFooter();
});