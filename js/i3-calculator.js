/**
 * Image Integrity Index (I³) Calculator
 * Core calculation engine for determining Global and Structural scores
 */

class I3Calculator {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
    }

    /**
     * Main entry point to calculate I³ score
     * @param {File} sourceFile - Original image file
     * @param {File} finalFile - Edited image file
     * @returns {Promise<Object>} - I³ score result
     */
    async calculateScore(sourceFile, finalFile) {
        try {
            // Load both images
            const sourceImage = await this.loadImage(sourceFile);
            const finalImage = await this.loadImage(finalFile);

            // Ensure images are the same dimensions for comparison
            const { source, final } = await this.normalizeImages(sourceImage, finalImage);

            // Calculate Global Adjustment Score (G)
            const globalScore = await this.calculateGlobalScore(source, final);

            // Calculate Structural Manipulation Score (S)
            const structuralScore = await this.calculateStructuralScore(source, final);

            return {
                global: globalScore,
                structural: structuralScore,
                score: `G${globalScore}/S${structuralScore}`,
                explanation: this.generateExplanation(globalScore, structuralScore),
                metadata: {
                    sourceFile: sourceFile.name,
                    finalFile: finalFile.name,
                    timestamp: new Date().toISOString()
                }
            };
        } catch (error) {
            throw new Error(`I³ Calculation failed: ${error.message}`);
        }
    }

    /**
     * Load image file and return as ImageData
     * @param {File} file - Image file
     * @returns {Promise<ImageData>} - Image data
     */
    async loadImage(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                // Set canvas size to image size
                this.canvas.width = img.width;
                this.canvas.height = img.height;
                
                // Draw image to canvas
                this.ctx.drawImage(img, 0, 0);
                
                // Get image data
                const imageData = this.ctx.getImageData(0, 0, img.width, img.height);
                resolve(imageData);
            };
            img.onerror = () => reject(new Error(`Failed to load image: ${file.name}`));
            img.src = URL.createObjectURL(file);
        });
    }

    /**
     * Normalize images to same dimensions for comparison
     * @param {ImageData} sourceImage - Source image data
     * @param {ImageData} finalImage - Final image data
     * @returns {Promise<Object>} - Normalized images
     */
    async normalizeImages(sourceImage, finalImage) {
        // Use the smaller dimensions to avoid upscaling
        const width = Math.min(sourceImage.width, finalImage.width);
        const height = Math.min(sourceImage.height, finalImage.height);

        // Resize both images to the same dimensions
        const source = this.resizeImageData(sourceImage, width, height);
        const final = this.resizeImageData(finalImage, width, height);

        return { source, final };
    }

    /**
     * Resize ImageData to specified dimensions
     * @param {ImageData} imageData - Original image data
     * @param {number} newWidth - Target width
     * @param {number} newHeight - Target height
     * @returns {ImageData} - Resized image data
     */
    resizeImageData(imageData, newWidth, newHeight) {
        // Create temporary canvas for resizing
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        // Set original size
        tempCanvas.width = imageData.width;
        tempCanvas.height = imageData.height;
        tempCtx.putImageData(imageData, 0, 0);
        
        // Create target canvas
        const targetCanvas = document.createElement('canvas');
        const targetCtx = targetCanvas.getContext('2d');
        targetCanvas.width = newWidth;
        targetCanvas.height = newHeight;
        
        // Draw resized image
        targetCtx.drawImage(tempCanvas, 0, 0, newWidth, newHeight);
        
        return targetCtx.getImageData(0, 0, newWidth, newHeight);
    }

    /**
     * Calculate Global Adjustment Score (G)
     * Measures color and tone differences
     * @param {ImageData} source - Source image data
     * @param {ImageData} final - Final image data
     * @returns {number} - Global score (0-100)
     */
    async calculateGlobalScore(source, final) {
        // Convert to LAB color space histograms
        const sourceHistogram = this.calculateColorHistogram(source);
        const finalHistogram = this.calculateColorHistogram(final);

        // Calculate histogram distance (simplified Earth Mover's Distance)
        const distance = this.calculateHistogramDistance(sourceHistogram, finalHistogram);

        // Convert distance to score (0-100, where 100 = no changes)
        const globalScore = Math.max(0, Math.min(100, Math.round(100 - (distance * 100))));
        
        return globalScore;
    }

    /**
     * Calculate Structural Manipulation Score (S)
     * Measures content and structural changes
     * @param {ImageData} source - Source image data
     * @param {ImageData} final - Final image data
     * @returns {number} - Structural score (0-100)
     */
    async calculateStructuralScore(source, final) {
        // Calculate perceptual hash similarity
        const hashSimilarity = this.calculatePerceptualHashSimilarity(source, final);
        
        // Calculate edge preservation
        const edgePreservation = this.calculateEdgePreservation(source, final);
        
        // Calculate feature point preservation
        const featurePreservation = this.calculateFeaturePreservation(source, final);
        
        // Combine scores (weighted average)
        const structuralScore = Math.round(
            (hashSimilarity * 0.4) + 
            (edgePreservation * 0.3) + 
            (featurePreservation * 0.3)
        );
        
        return Math.max(0, Math.min(100, structuralScore));
    }

    /**
     * Calculate color histogram for an image
     * @param {ImageData} imageData - Image data
     * @returns {Object} - Color histogram
     */
    calculateColorHistogram(imageData) {
        const data = imageData.data;
        const histogram = {
            r: new Array(256).fill(0),
            g: new Array(256).fill(0),
            b: new Array(256).fill(0),
            luminance: new Array(256).fill(0)
        };

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            
            // Calculate luminance (simplified)
            const luminance = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            
            histogram.r[r]++;
            histogram.g[g]++;
            histogram.b[b]++;
            histogram.luminance[luminance]++;
        }

        // Normalize histograms
        const totalPixels = imageData.width * imageData.height;
        Object.keys(histogram).forEach(channel => {
            for (let i = 0; i < 256; i++) {
                histogram[channel][i] /= totalPixels;
            }
        });

        return histogram;
    }

    /**
     * Calculate distance between two histograms
     * @param {Object} hist1 - First histogram
     * @param {Object} hist2 - Second histogram
     * @returns {number} - Distance (0-1)
     */
    calculateHistogramDistance(hist1, hist2) {
        let totalDistance = 0;
        const channels = ['r', 'g', 'b', 'luminance'];
        
        channels.forEach(channel => {
            let channelDistance = 0;
            for (let i = 0; i < 256; i++) {
                channelDistance += Math.abs(hist1[channel][i] - hist2[channel][i]);
            }
            totalDistance += channelDistance;
        });
        
        return totalDistance / channels.length;
    }

    /**
     * Calculate perceptual hash similarity
     * @param {ImageData} source - Source image data
     * @param {ImageData} final - Final image data
     * @returns {number} - Similarity score (0-100)
     */
    calculatePerceptualHashSimilarity(source, final) {
        // Simplified perceptual hash using 8x8 grid
        const sourceHash = this.generatePerceptualHash(source);
        const finalHash = this.generatePerceptualHash(final);
        
        // Calculate Hamming distance
        let differences = 0;
        for (let i = 0; i < sourceHash.length; i++) {
            if (sourceHash[i] !== finalHash[i]) {
                differences++;
            }
        }
        
        // Convert to similarity percentage
        const similarity = 100 - (differences / sourceHash.length * 100);
        return Math.max(0, Math.min(100, Math.round(similarity)));
    }

    /**
     * Generate perceptual hash for an image
     * @param {ImageData} imageData - Image data
     * @returns {string} - Hash string
     */
    generatePerceptualHash(imageData) {
        // Resize to 8x8 for hash calculation
        const small = this.resizeImageData(imageData, 8, 8);
        const data = small.data;
        
        // Calculate average luminance
        let totalLuminance = 0;
        const luminanceValues = [];
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
            luminanceValues.push(luminance);
            totalLuminance += luminance;
        }
        
        const avgLuminance = totalLuminance / luminanceValues.length;
        
        // Generate hash based on average
        let hash = '';
        luminanceValues.forEach(luminance => {
            hash += luminance > avgLuminance ? '1' : '0';
        });
        
        return hash;
    }

    /**
     * Calculate edge preservation between images
     * @param {ImageData} source - Source image data
     * @param {ImageData} final - Final image data
     * @returns {number} - Edge preservation score (0-100)
     */
    calculateEdgePreservation(source, final) {
        const sourceEdges = this.detectEdges(source);
        const finalEdges = this.detectEdges(final);
        
        // Compare edge maps
        let matchingEdges = 0;
        let totalEdges = 0;
        
        for (let i = 0; i < sourceEdges.length; i++) {
            if (sourceEdges[i] > 0.5) { // Edge threshold
                totalEdges++;
                if (Math.abs(sourceEdges[i] - finalEdges[i]) < 0.3) {
                    matchingEdges++;
                }
            }
        }
        
        const preservation = totalEdges > 0 ? (matchingEdges / totalEdges) * 100 : 100;
        return Math.round(preservation);
    }

    /**
     * Simple edge detection using Sobel operator
     * @param {ImageData} imageData - Image data
     * @returns {Array} - Edge strength values
     */
    detectEdges(imageData) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        const edges = new Array(width * height);
        
        // Sobel kernels
        const sobelX = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
        const sobelY = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
        
        for (let y = 1; y < height - 1; y++) {
            for (let x = 1; x < width - 1; x++) {
                let gx = 0, gy = 0;
                
                for (let ky = -1; ky <= 1; ky++) {
                    for (let kx = -1; kx <= 1; kx++) {
                        const idx = ((y + ky) * width + (x + kx)) * 4;
                        const luminance = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
                        
                        gx += luminance * sobelX[ky + 1][kx + 1];
                        gy += luminance * sobelY[ky + 1][kx + 1];
                    }
                }
                
                const magnitude = Math.sqrt(gx * gx + gy * gy) / 255;
                edges[y * width + x] = Math.min(1, magnitude);
            }
        }
        
        return edges;
    }

    /**
     * Calculate feature preservation (simplified corner detection)
     * @param {ImageData} source - Source image data
     * @param {ImageData} final - Final image data
     * @returns {number} - Feature preservation score (0-100)
     */
    calculateFeaturePreservation(source, final) {
        const sourceFeatures = this.detectFeatures(source);
        const finalFeatures = this.detectFeatures(final);
        
        // Simple feature matching based on position and strength
        let matchedFeatures = 0;
        const threshold = 0.1;
        
        sourceFeatures.forEach(sourceFeature => {
            const hasMatch = finalFeatures.some(finalFeature => {
                const distance = Math.sqrt(
                    Math.pow(sourceFeature.x - finalFeature.x, 2) + 
                    Math.pow(sourceFeature.y - finalFeature.y, 2)
                );
                return distance < threshold * Math.min(source.width, source.height);
            });
            
            if (hasMatch) matchedFeatures++;
        });
        
        const preservation = sourceFeatures.length > 0 ? (matchedFeatures / sourceFeatures.length) * 100 : 100;
        return Math.round(preservation);
    }

    /**
     * Simple feature detection (corners)
     * @param {ImageData} imageData - Image data
     * @returns {Array} - Feature points
     */
    detectFeatures(imageData) {
        const width = imageData.width;
        const height = imageData.height;
        const data = imageData.data;
        const features = [];
        
        // Simple corner detection using intensity changes
        for (let y = 2; y < height - 2; y++) {
            for (let x = 2; x < width - 2; x++) {
                const centerIdx = (y * width + x) * 4;
                const centerLum = 0.299 * data[centerIdx] + 0.587 * data[centerIdx + 1] + 0.114 * data[centerIdx + 2];
                
                let maxDiff = 0;
                
                // Check surrounding pixels
                for (let dy = -2; dy <= 2; dy++) {
                    for (let dx = -2; dx <= 2; dx++) {
                        const idx = ((y + dy) * width + (x + dx)) * 4;
                        const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
                        maxDiff = Math.max(maxDiff, Math.abs(centerLum - lum));
                    }
                }
                
                // If significant intensity change, it's a feature
                if (maxDiff > 50) {
                    features.push({
                        x: x / width,
                        y: y / height,
                        strength: maxDiff / 255
                    });
                }
            }
        }
        
        // Return top features sorted by strength
        return features.sort((a, b) => b.strength - a.strength).slice(0, 100);
    }

    /**
     * Generate human-readable explanation of the scores
     * @param {number} globalScore - Global score
     * @param {number} structuralScore - Structural score
     * @returns {string} - Explanation text
     */
    generateExplanation(globalScore, structuralScore) {
        let explanation = '';
        
        // Global score interpretation
        if (globalScore >= 95) {
            explanation += 'Minimal color/tone adjustments detected. ';
        } else if (globalScore >= 85) {
            explanation += 'Light color/tone adjustments detected. ';
        } else if (globalScore >= 70) {
            explanation += 'Moderate color/tone adjustments detected. ';
        } else if (globalScore >= 50) {
            explanation += 'Significant color/tone adjustments detected. ';
        } else {
            explanation += 'Heavy color/tone adjustments detected. ';
        }
        
        // Structural score interpretation
        if (structuralScore >= 95) {
            explanation += 'Original content fully preserved.';
        } else if (structuralScore >= 85) {
            explanation += 'Minor content modifications detected.';
        } else if (structuralScore >= 70) {
            explanation += 'Some content manipulation detected.';
        } else if (structuralScore >= 50) {
            explanation += 'Moderate content manipulation detected.';
        } else {
            explanation += 'Significant content manipulation or compositing detected.';
        }
        
        return explanation;
    }
}

export default I3Calculator;
