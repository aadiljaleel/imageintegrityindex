/**
 * I³ Calculator Interface
 * Handles UI interactions and file processing for the I³ Calculator
 */

import I3Calculator from './i3-calculator.js';

class I3CalculatorInterface {
    constructor(options = {}) {
        this.calculator = new I3Calculator();
        this.options = {
            sourceFileInputId: 'source-file',
            finalFileInputId: 'final-file',
            calculateButtonId: 'calculate-btn',
            resultSectionId: 'result-section',
            scoreResultId: 'score-result',
            resultExplanationId: 'result-explanation',
            shareTextId: 'share-text',
            progressBarId: 'progress-bar',
            ...options
        };
        
        this.sourceFile = null;
        this.finalFile = null;
        this.isCalculating = false;
        
        this.init();
    }

    /**
     * Initialize the calculator interface
     */
    init() {
        this.bindEvents();
        this.updateCalculateButton();
    }

    /**
     * Bind event listeners
     */
    bindEvents() {
        const sourceInput = document.getElementById(this.options.sourceFileInputId);
        const finalInput = document.getElementById(this.options.finalFileInputId);
        const calculateBtn = document.getElementById(this.options.calculateButtonId);

        if (sourceInput) {
            sourceInput.addEventListener('change', (e) => this.handleSourceFileChange(e));
        }

        if (finalInput) {
            finalInput.addEventListener('change', (e) => this.handleFinalFileChange(e));
        }

        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.handleCalculateClick());
        }

        // Setup drag and drop
        this.setupDragAndDrop();
    }

    /**
     * Handle source file selection
     * @param {Event} event - File input change event
     */
    handleSourceFileChange(event) {
        const file = event.target.files[0];
        if (file && this.validateSourceFile(file)) {
            this.sourceFile = file;
            this.updateFileDisplay(event.target, file);
            this.updateCalculateButton();
        } else {
            this.sourceFile = null;
            this.showError('Invalid source file. Please select a valid image file.');
        }
    }

    /**
     * Handle final file selection
     * @param {Event} event - File input change event
     */
    handleFinalFileChange(event) {
        const file = event.target.files[0];
        if (file && this.validateFinalFile(file)) {
            this.finalFile = file;
            this.updateFileDisplay(event.target, file);
            this.updateCalculateButton();
        } else {
            this.finalFile = null;
            this.showError('Invalid final file. Please select a valid image file.');
        }
    }

    /**
     * Handle calculate button click
     */
    async handleCalculateClick() {
        if (!this.sourceFile || !this.finalFile || this.isCalculating) {
            return;
        }

        this.isCalculating = true;
        this.updateCalculateButtonState(true);
        this.showProgress(0);

        try {
            // Simulate progress updates
            const progressInterval = setInterval(() => {
                const progress = Math.min(90, Math.random() * 80 + 10);
                this.showProgress(progress);
            }, 200);

            // Calculate I³ score
            const result = await this.calculator.calculateScore(this.sourceFile, this.finalFile);
            
            clearInterval(progressInterval);
            this.showProgress(100);

            // Display results
            setTimeout(() => {
                this.displayResults(result);
                this.hideProgress();
            }, 500);

        } catch (error) {
            console.error('Calculation error:', error);
            this.showError(`Calculation failed: ${error.message}`);
        } finally {
            this.isCalculating = false;
            this.updateCalculateButtonState(false);
        }
    }

    /**
     * Validate source file
     * @param {File} file - File to validate
     * @returns {boolean} - Is valid
     */
    validateSourceFile(file) {
        const validExtensions = [
            'jpg', 'jpeg', 'png', 'tiff', 'tif', 'bmp', 'webp',
            'cr3', 'nef', 'dng', 'arw', 'orf', 'rw2', 'raw'
        ];
        const extension = file.name.split('.').pop().toLowerCase();
        const isValidType = file.type.startsWith('image/') || validExtensions.includes(extension);
        const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit

        return isValidType && isValidSize;
    }

    /**
     * Validate final file
     * @param {File} file - File to validate
     * @returns {boolean} - Is valid
     */
    validateFinalFile(file) {
        const validTypes = ['image/jpeg', 'image/png', 'image/tiff', 'image/webp'];
        const isValidType = validTypes.includes(file.type);
        const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit

        return isValidType && isValidSize;
    }

    /**
     * Update file display with selected filename
     * @param {HTMLElement} input - File input element
     * @param {File} file - Selected file
     */
    updateFileDisplay(input, file) {
        const label = input.nextElementSibling;
        const uploadBox = input.parentElement;
        
        if (label) {
            label.textContent = file.name;
            label.title = `${file.name} (${this.formatFileSize(file.size)})`;
        }
        
        if (uploadBox) {
            uploadBox.style.borderColor = '#10b981';
            uploadBox.classList.add('file-selected');
        }
    }

    /**
     * Update calculate button state
     * @param {boolean} isCalculating - Whether calculation is in progress
     */
    updateCalculateButtonState(isCalculating) {
        const calculateBtn = document.getElementById(this.options.calculateButtonId);
        if (!calculateBtn) return;

        if (isCalculating) {
            calculateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Calculating I³ Score...';
            calculateBtn.disabled = true;
        } else {
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate I³ Score';
            this.updateCalculateButton();
        }
    }

    /**
     * Update calculate button based on file selection
     */
    updateCalculateButton() {
        const calculateBtn = document.getElementById(this.options.calculateButtonId);
        if (!calculateBtn) return;

        if (this.sourceFile && this.finalFile) {
            calculateBtn.disabled = false;
            calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> Calculate I³ Score';
        } else {
            calculateBtn.disabled = true;
            const missing = [];
            if (!this.sourceFile) missing.push('source file');
            if (!this.finalFile) missing.push('final file');
            calculateBtn.innerHTML = `<i class="fas fa-calculator"></i> Select ${missing.join(' and ')} to calculate`;
        }
    }

    /**
     * Display calculation results
     * @param {Object} result - Calculation result
     */
    displayResults(result) {
        const resultSection = document.getElementById(this.options.resultSectionId);
        const scoreResult = document.getElementById(this.options.scoreResultId);
        const resultExplanation = document.getElementById(this.options.resultExplanationId);
        const shareText = document.getElementById(this.options.shareTextId);

        if (scoreResult) {
            scoreResult.textContent = result.score;
        }

        if (resultExplanation) {
            resultExplanation.textContent = result.explanation;
        }

        if (shareText) {
            shareText.value = `Image Integrity Index: ${result.score}`;
        }

        if (resultSection) {
            resultSection.style.display = 'block';
            resultSection.scrollIntoView({ behavior: 'smooth' });
            
            // Add animation
            resultSection.style.opacity = '0';
            resultSection.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                resultSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                resultSection.style.opacity = '1';
                resultSection.style.transform = 'translateY(0)';
            }, 100);
        }

        // Track calculation for analytics
        this.trackCalculation(result);
    }

    /**
     * Show progress bar
     * @param {number} progress - Progress percentage (0-100)
     */
    showProgress(progress) {
        let progressBar = document.getElementById(this.options.progressBarId);
        
        if (!progressBar) {
            progressBar = this.createProgressBar();
        }
        
        progressBar.style.display = 'block';
        const progressFill = progressBar.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        
        const progressText = progressBar.querySelector('.progress-text');
        if (progressText) {
            if (progress < 30) {
                progressText.textContent = 'Loading images...';
            } else if (progress < 60) {
                progressText.textContent = 'Analyzing colors and tones...';
            } else if (progress < 90) {
                progressText.textContent = 'Detecting structural changes...';
            } else {
                progressText.textContent = 'Finalizing results...';
            }
        }
    }

    /**
     * Hide progress bar
     */
    hideProgress() {
        const progressBar = document.getElementById(this.options.progressBarId);
        if (progressBar) {
            progressBar.style.display = 'none';
        }
    }

    /**
     * Create progress bar element
     * @returns {HTMLElement} - Progress bar element
     */
    createProgressBar() {
        const calculateBtn = document.getElementById(this.options.calculateButtonId);
        if (!calculateBtn) return null;

        const progressBar = document.createElement('div');
        progressBar.id = this.options.progressBarId;
        progressBar.className = 'progress-bar';
        progressBar.innerHTML = `
            <div class="progress-text">Preparing calculation...</div>
            <div class="progress-container">
                <div class="progress-fill"></div>
            </div>
        `;

        calculateBtn.parentNode.insertBefore(progressBar, calculateBtn.nextSibling);
        return progressBar;
    }

    /**
     * Setup drag and drop functionality
     */
    setupDragAndDrop() {
        const uploadBoxes = document.querySelectorAll('.upload-box');
        
        uploadBoxes.forEach(box => {
            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                box.addEventListener(eventName, this.preventDefaults, false);
            });
            
            ['dragenter', 'dragover'].forEach(eventName => {
                box.addEventListener(eventName, (e) => this.highlight(e.currentTarget), false);
            });
            
            ['dragleave', 'drop'].forEach(eventName => {
                box.addEventListener(eventName, (e) => this.unhighlight(e.currentTarget), false);
            });
            
            box.addEventListener('drop', (e) => this.handleDrop(e), false);
        });
    }

    /**
     * Prevent default drag behavior
     * @param {Event} e - Event
     */
    preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    /**
     * Highlight drop zone
     * @param {HTMLElement} element - Element to highlight
     */
    highlight(element) {
        element.style.borderColor = '#2563eb';
        element.style.background = '#f1f5f9';
    }

    /**
     * Remove highlight from drop zone
     * @param {HTMLElement} element - Element to unhighlight
     */
    unhighlight(element) {
        element.style.borderColor = '#cbd5e1';
        element.style.background = 'white';
    }

    /**
     * Handle file drop
     * @param {Event} e - Drop event
     */
    handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        
        if (files.length > 0) {
            const file = files[0];
            const input = e.currentTarget.querySelector('input[type="file"]');
            
            if (input) {
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                input.files = dataTransfer.files;
                input.dispatchEvent(new Event('change', { bubbles: true }));
            }
        }
    }

    /**
     * Show error message
     * @param {string} message - Error message
     */
    showError(message) {
        this.showToast(message, 'error');
    }

    /**
     * Show toast notification
     * @param {string} message - Message to show
     * @param {string} type - Toast type (success, error, info)
     */
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            max-width: 400px;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => { toast.style.opacity = '1'; }, 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 300);
        }, 4000);
    }

    /**
     * Format file size for display
     * @param {number} bytes - File size in bytes
     * @returns {string} - Formatted file size
     */
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    /**
     * Track calculation for analytics
     * @param {Object} result - Calculation result
     */
    trackCalculation(result) {
        // Analytics tracking placeholder
        if (typeof gtag !== 'undefined') {
            gtag('event', 'i3_calculation', {
                global_score: result.global,
                structural_score: result.structural,
                source_file_type: this.sourceFile ? this.sourceFile.name.split('.').pop() : 'unknown',
                final_file_type: this.finalFile ? this.finalFile.name.split('.').pop() : 'unknown'
            });
        }

        console.log('I³ Calculation completed:', result);
    }

    /**
     * Copy score to clipboard
     */
    copyToClipboard() {
        const shareText = document.getElementById(this.options.shareTextId);
        if (!shareText) return;

        shareText.select();
        shareText.setSelectionRange(0, 99999);
        
        try {
            document.execCommand('copy');
            this.showToast('I³ score copied to clipboard!', 'success');
        } catch (err) {
            navigator.clipboard.writeText(shareText.value).then(() => {
                this.showToast('I³ score copied to clipboard!', 'success');
            }, () => {
                this.showToast('Failed to copy to clipboard', 'error');
            });
        }
    }

    /**
     * Reset calculator state
     */
    reset() {
        this.sourceFile = null;
        this.finalFile = null;
        this.isCalculating = false;
        
        // Reset UI
        const sourceInput = document.getElementById(this.options.sourceFileInputId);
        const finalInput = document.getElementById(this.options.finalFileInputId);
        const resultSection = document.getElementById(this.options.resultSectionId);
        
        if (sourceInput) {
            sourceInput.value = '';
            const label = sourceInput.nextElementSibling;
            if (label) label.textContent = 'Choose File';
        }
        
        if (finalInput) {
            finalInput.value = '';
            const label = finalInput.nextElementSibling;
            if (label) label.textContent = 'Choose File';
        }
        
        if (resultSection) {
            resultSection.style.display = 'none';
        }
        
        this.updateCalculateButton();
    }
}

// Global copy function for backward compatibility
window.copyToClipboard = function() {
    if (window.i3Calculator) {
        window.i3Calculator.copyToClipboard();
    }
};

export default I3CalculatorInterface;
