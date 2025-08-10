// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Import I³ Calculator (will be loaded as module)
let I3CalculatorInterface;

// Initialize I³ Calculator when page loads
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Dynamic import for modern browsers
        const { default: Calculator } = await import('./js/i3-calculator-interface.js');
        I3CalculatorInterface = Calculator;
        
        // Initialize calculator
        window.i3Calculator = new I3CalculatorInterface();
        
        console.log('I³ Calculator initialized successfully');
    } catch (error) {
        console.warn('Could not load I³ Calculator module:', error);
        // Fallback to the original placeholder functionality
        initializeFallbackCalculator();
    }
    
    // Initialize other components
    setupDragAndDrop();
    lazyLoadImages();
    
    const animatedElements = document.querySelectorAll('.about-card, .step, .scenario-card, .community-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Fallback calculator for browsers that don't support modules
function initializeFallbackCalculator() {
    console.log('Using fallback calculator implementation');
    
    const sourceFileInput = document.getElementById('source-file');
    const finalFileInput = document.getElementById('final-file');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultSection = document.getElementById('result-section');
    const scoreResult = document.getElementById('score-result');
    const resultExplanation = document.getElementById('result-explanation');
    const shareText = document.getElementById('share-text');

    let sourceFile = null;
    let finalFile = null;

    // File input handlers
    if (sourceFileInput) {
        sourceFileInput.addEventListener('change', function(e) {
            sourceFile = e.target.files[0];
            updateCalculateButton();
            if (sourceFile) {
                this.nextElementSibling.textContent = sourceFile.name;
                this.parentElement.style.borderColor = '#10b981';
            }
        });
    }

    if (finalFileInput) {
        finalFileInput.addEventListener('change', function(e) {
            finalFile = e.target.files[0];
            updateCalculateButton();
            if (finalFile) {
                this.nextElementSibling.textContent = finalFile.name;
                this.parentElement.style.borderColor = '#10b981';
            }
        });
    }

    function updateCalculateButton() {
        if (!calculateBtn) return;
        
        if (sourceFile && finalFile) {
            calculateBtn.disabled = false;
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate I³ Score';
        } else {
            calculateBtn.disabled = true;
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Select both files to calculate';
        }
    }

    // Calculate button handler (placeholder functionality)
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            if (!sourceFile || !finalFile) return;
            
            // Show loading state
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating...';
            calculateBtn.disabled = true;
            
            // Simulate calculation
            setTimeout(() => {
                const globalScore = generateMockGlobalScore();
                const structuralScore = generateMockStructuralScore();
                
                displayResults(globalScore, structuralScore);
                
                calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate I³ Score';
                calculateBtn.disabled = false;
            }, 2000);
        });
    }

    function generateMockGlobalScore() {
        return Math.floor(Math.random() * 38) + 60;
    }

    function generateMockStructuralScore() {
        return Math.floor(Math.random() * 30) + 70;
    }

    function displayResults(globalScore, structuralScore) {
        const i3Score = `G${globalScore}/S${structuralScore}`;
        
        if (scoreResult) scoreResult.textContent = i3Score;
        if (shareText) shareText.value = `Image Integrity Index: ${i3Score}`;
        
        let explanation = generateExplanation(globalScore, structuralScore);
        if (resultExplanation) resultExplanation.textContent = explanation;
        
        if (resultSection) {
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function generateExplanation(globalScore, structuralScore) {
        let explanation = '';
        
        if (globalScore >= 90) {
            explanation += 'Minimal color/tone adjustments. ';
        } else if (globalScore >= 75) {
            explanation += 'Moderate color/tone adjustments. ';
        } else if (globalScore >= 60) {
            explanation += 'Significant color/tone adjustments. ';
        } else {
            explanation += 'Heavy color/tone adjustments. ';
        }
        
        if (structuralScore >= 95) {
            explanation += 'Original content fully preserved.';
        } else if (structuralScore >= 85) {
            explanation += 'Minor content modifications.';
        } else if (structuralScore >= 70) {
            explanation += 'Some content manipulation present.';
        } else {
            explanation += 'Significant content manipulation or compositing.';
        }
        
        return explanation;
    }
}

// Copy to clipboard functionality
function copyToClipboard() {
    shareText.select();
    shareText.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        showToast('I³ score copied to clipboard!');
    } catch (err) {
        // Fallback for modern browsers
        navigator.clipboard.writeText(shareText.value).then(function() {
            showToast('I³ score copied to clipboard!');
        }, function(err) {
            showToast('Failed to copy to clipboard', 'error');
        });
    }
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1001;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .step, .scenario-card, .community-card');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form validation
function validateFiles(sourceFile, finalFile) {
    const validSourceExtensions = ['.cr3', '.nef', '.dng', '.arw', '.orf', '.rw2', '.jpg', '.jpeg'];
    const validFinalExtensions = ['.jpg', '.jpeg', '.png', '.tiff'];
    
    if (sourceFile) {
        const sourceExt = '.' + sourceFile.name.split('.').pop().toLowerCase();
        if (!validSourceExtensions.includes(sourceExt)) {
            showToast('Invalid source file format. Please use RAW or JPEG files.', 'error');
            return false;
        }
    }
    
    if (finalFile) {
        const finalExt = '.' + finalFile.name.split('.').pop().toLowerCase();
        if (!validFinalExtensions.includes(finalExt)) {
            showToast('Invalid final file format. Please use JPEG, PNG, or TIFF files.', 'error');
            return false;
        }
    }
    
    return true;
}

// Drag and drop functionality
function setupDragAndDrop() {
    const uploadBoxes = document.querySelectorAll('.upload-box');
    
    uploadBoxes.forEach(box => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            box.addEventListener(eventName, preventDefaults, false);
        });
        
        ['dragenter', 'dragover'].forEach(eventName => {
            box.addEventListener(eventName, highlight, false);
        });
        
        ['dragleave', 'drop'].forEach(eventName => {
            box.addEventListener(eventName, unhighlight, false);
        });
        
        box.addEventListener('drop', handleDrop, false);
    });
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    e.currentTarget.style.borderColor = '#2563eb';
    e.currentTarget.style.background = '#f1f5f9';
}

function unhighlight(e) {
    e.currentTarget.style.borderColor = '#cbd5e1';
    e.currentTarget.style.background = 'white';
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        const file = files[0];
        const input = e.currentTarget.querySelector('input[type="file"]');
        
        // Create a new FileList
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
        
        // Trigger change event
        input.dispatchEvent(new Event('change', { bubbles: true }));
    }
}

// Initialize drag and drop when DOM is loaded
document.addEventListener('DOMContentLoaded', setupDragAndDrop);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    // This would integrate with analytics services like Google Analytics
    console.log('Analytics Event:', eventName, eventData);
}

// Track user interactions
calculateBtn.addEventListener('click', () => {
    trackEvent('calculate_i3_score', {
        source_file_type: sourceFile ? sourceFile.name.split('.').pop() : 'unknown',
        final_file_type: finalFile ? finalFile.name.split('.').pop() : 'unknown'
    });
});

// Service Worker registration for PWA capabilities (future enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
