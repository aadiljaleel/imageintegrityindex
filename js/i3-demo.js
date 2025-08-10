/**
 * Demo script for testing the I³ Calculator
 * Creates test patterns to demonstrate the algorithm
 */

class I3Demo {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Create a test image with known properties
     * @param {number} width - Image width
     * @param {number} height - Image height
     * @param {string} pattern - Pattern type ('gradient', 'checkerboard', 'noise')
     * @returns {File} - Generated image file
     */
    async createTestImage(width = 800, height = 600, pattern = 'gradient') {
        this.canvas.width = width;
        this.canvas.height = height;

        switch (pattern) {
            case 'gradient':
                this.drawGradient();
                break;
            case 'checkerboard':
                this.drawCheckerboard();
                break;
            case 'noise':
                this.drawNoise();
                break;
            default:
                this.drawGradient();
        }

        return new Promise((resolve) => {
            this.canvas.toBlob((blob) => {
                const file = new File([blob], `test-${pattern}.jpg`, { type: 'image/jpeg' });
                resolve(file);
            }, 'image/jpeg', 0.9);
        });
    }

    /**
     * Create a modified version of a test image
     * @param {File} originalFile - Original image file
     * @param {Object} modifications - Modifications to apply
     * @returns {File} - Modified image file
     */
    async createModifiedImage(originalFile, modifications = {}) {
        const img = await this.loadImageFromFile(originalFile);
        
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.ctx.drawImage(img, 0, 0);

        // Apply modifications
        if (modifications.brightness) {
            this.adjustBrightness(modifications.brightness);
        }
        
        if (modifications.contrast) {
            this.adjustContrast(modifications.contrast);
        }
        
        if (modifications.saturation) {
            this.adjustSaturation(modifications.saturation);
        }
        
        if (modifications.addNoise) {
            this.addNoise(modifications.addNoise);
        }
        
        if (modifications.addShape) {
            this.addShape(modifications.addShape);
        }

        return new Promise((resolve) => {
            this.canvas.toBlob((blob) => {
                const file = new File([blob], `modified-${originalFile.name}`, { type: 'image/jpeg' });
                resolve(file);
            }, 'image/jpeg', 0.9);
        });
    }

    /**
     * Load image from file
     * @param {File} file - Image file
     * @returns {Promise<HTMLImageElement>} - Loaded image
     */
    loadImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Draw gradient pattern
     */
    drawGradient() {
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#ff6b6b');
        gradient.addColorStop(0.5, '#4ecdc4');
        gradient.addColorStop(1, '#45b7d1');
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draw checkerboard pattern
     */
    drawCheckerboard() {
        const squareSize = 50;
        
        for (let x = 0; x < this.canvas.width; x += squareSize) {
            for (let y = 0; y < this.canvas.height; y += squareSize) {
                const isEven = (Math.floor(x / squareSize) + Math.floor(y / squareSize)) % 2 === 0;
                this.ctx.fillStyle = isEven ? '#ffffff' : '#000000';
                this.ctx.fillRect(x, y, squareSize, squareSize);
            }
        }
    }

    /**
     * Draw noise pattern
     */
    drawNoise() {
        const imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;     // Red
            data[i + 1] = value; // Green
            data[i + 2] = value; // Blue
            data[i + 3] = 255;   // Alpha
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Adjust brightness
     * @param {number} amount - Brightness adjustment (-100 to 100)
     */
    adjustBrightness(amount) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, Math.min(255, data[i] + amount));     // Red
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + amount)); // Green
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + amount)); // Blue
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Adjust contrast
     * @param {number} factor - Contrast factor (0.1 to 3.0)
     */
    adjustContrast(factor) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.max(0, Math.min(255, (data[i] - 128) * factor + 128));     // Red
            data[i + 1] = Math.max(0, Math.min(255, (data[i + 1] - 128) * factor + 128)); // Green
            data[i + 2] = Math.max(0, Math.min(255, (data[i + 2] - 128) * factor + 128)); // Blue
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Adjust saturation
     * @param {number} factor - Saturation factor (0 to 2)
     */
    adjustSaturation(factor) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            const gray = 0.299 * r + 0.587 * g + 0.114 * b;
            
            data[i] = Math.max(0, Math.min(255, gray + (r - gray) * factor));
            data[i + 1] = Math.max(0, Math.min(255, gray + (g - gray) * factor));
            data[i + 2] = Math.max(0, Math.min(255, gray + (b - gray) * factor));
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Add noise to image
     * @param {number} intensity - Noise intensity (0 to 100)
     */
    addNoise(intensity) {
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const noise = (Math.random() - 0.5) * intensity;
            data[i] = Math.max(0, Math.min(255, data[i] + noise));
            data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
            data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }

    /**
     * Add shape to image
     * @param {Object} shape - Shape properties
     */
    addShape(shape) {
        this.ctx.fillStyle = shape.color || '#ff0000';
        
        switch (shape.type) {
            case 'circle':
                this.ctx.beginPath();
                this.ctx.arc(
                    shape.x || this.canvas.width / 2,
                    shape.y || this.canvas.height / 2,
                    shape.radius || 50,
                    0,
                    2 * Math.PI
                );
                this.ctx.fill();
                break;
                
            case 'rectangle':
                this.ctx.fillRect(
                    shape.x || this.canvas.width / 4,
                    shape.y || this.canvas.height / 4,
                    shape.width || 100,
                    shape.height || 100
                );
                break;
        }
    }

    /**
     * Run demo test scenarios
     */
    async runDemoTests() {
        console.log('Running I³ Demo Tests...');
        
        if (!window.i3Calculator) {
            console.error('I³ Calculator not available');
            return;
        }

        try {
            // Test 1: Minimal changes (high G/S scores)
            console.log('Test 1: Minimal color adjustment');
            const original1 = await this.createTestImage(400, 300, 'gradient');
            const modified1 = await this.createModifiedImage(original1, { brightness: 10 });
            
            const result1 = await window.i3Calculator.calculator.calculateScore(original1, modified1);
            console.log('Result 1:', result1);

            // Test 2: Moderate color changes (medium G score)
            console.log('Test 2: Moderate color adjustment');
            const original2 = await this.createTestImage(400, 300, 'checkerboard');
            const modified2 = await this.createModifiedImage(original2, { 
                brightness: 30, 
                contrast: 1.5,
                saturation: 1.2 
            });
            
            const result2 = await window.i3Calculator.calculator.calculateScore(original2, modified2);
            console.log('Result 2:', result2);

            // Test 3: Structural changes (low S score)
            console.log('Test 3: Structural modification');
            const original3 = await this.createTestImage(400, 300, 'gradient');
            const modified3 = await this.createModifiedImage(original3, { 
                addShape: { type: 'circle', x: 200, y: 150, radius: 75, color: '#ff0000' }
            });
            
            const result3 = await window.i3Calculator.calculator.calculateScore(original3, modified3);
            console.log('Result 3:', result3);

            console.log('Demo tests completed!');
            
        } catch (error) {
            console.error('Demo test failed:', error);
        }
    }
}

// Make demo available globally for testing
window.I3Demo = I3Demo;

export default I3Demo;
