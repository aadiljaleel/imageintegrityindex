# I³ Calculator - JavaScript Implementation

A client-side JavaScript implementation of the Image Integrity Index (I³) calculator that runs entirely in the browser.

## Features

- **Client-Side Processing**: No server required, all calculations happen in the browser
- **Modular Design**: Separated core algorithm from UI interface for easy reuse
- **Real Image Analysis**: Processes actual image data using Canvas API
- **Progressive Enhancement**: Falls back gracefully for older browsers
- **Comprehensive Scoring**: Implements both Global (G) and Structural (S) scoring

## Architecture

### Core Components

1. **`i3-calculator.js`** - Core calculation engine
   - Color histogram analysis
   - Perceptual hashing
   - Edge detection
   - Feature point analysis

2. **`i3-calculator-interface.js`** - UI interface wrapper
   - File handling and validation
   - Progress tracking
   - Result display
   - Error handling

3. **`i3-demo.js`** - Demo and testing utilities
   - Generate test images
   - Apply known modifications
   - Run automated tests

## Algorithm Implementation

### Global Score (G) - Color & Tone Analysis

1. **Color Histogram Calculation**
   - RGB + Luminance histograms (256 bins each)
   - Normalized by total pixels

2. **Histogram Distance**
   - Simplified Earth Mover's Distance
   - Compares source vs final histograms
   - Converts to 0-100 score

### Structural Score (S) - Content Analysis

1. **Perceptual Hashing** (40% weight)
   - 8x8 grid averaging
   - Binary hash comparison
   - Hamming distance calculation

2. **Edge Preservation** (30% weight)
   - Sobel operator edge detection
   - Edge map comparison
   - Matching threshold analysis

3. **Feature Detection** (30% weight)
   - Simple corner detection
   - Feature point matching
   - Spatial consistency check

## Usage

### Basic Usage

```javascript
import I3Calculator from './js/i3-calculator.js';

const calculator = new I3Calculator();

// Calculate score for two image files
const result = await calculator.calculateScore(sourceFile, finalFile);

console.log(`I³ Score: ${result.score}`);
console.log(`Explanation: ${result.explanation}`);
```

### With Interface

```javascript
import I3CalculatorInterface from './js/i3-calculator-interface.js';

// Initialize with default HTML element IDs
const calculatorUI = new I3CalculatorInterface();

// Or customize element IDs
const calculatorUI = new I3CalculatorInterface({
    sourceFileInputId: 'my-source-input',
    finalFileInputId: 'my-final-input',
    calculateButtonId: 'my-calculate-btn'
});
```

### Demo Testing

```javascript
import I3Demo from './js/i3-demo.js';

const demo = new I3Demo();

// Create test images
const original = await demo.createTestImage(400, 300, 'gradient');
const modified = await demo.createModifiedImage(original, { brightness: 20 });

// Run full demo suite
await demo.runDemoTests();
```

## File Support

### Source Files (Input)
- **JPEG/JPG** - Standard photo format
- **PNG** - Lossless format
- **TIFF** - Professional format
- **WebP** - Modern web format
- **RAW formats** - Limited support (CR3, NEF, DNG, etc.)

### Final Files (Output)
- **JPEG/JPG** - Recommended for photos
- **PNG** - Good for graphics with transparency
- **TIFF** - Professional workflows
- **WebP** - Modern web optimization

## Browser Compatibility

- **Modern Browsers**: Full functionality with ES6 modules
- **Legacy Browsers**: Fallback implementation available
- **Mobile**: Responsive design, touch-friendly interface

### Required Browser APIs
- Canvas API (image processing)
- File API (file handling)
- ES6 Modules (modern version)

## Performance Considerations

### File Size Limits
- Maximum: 50MB per file
- Recommended: Under 10MB for best performance

### Processing Time
- Small images (< 1MP): < 2 seconds
- Medium images (1-5MP): 2-5 seconds
- Large images (> 5MP): 5-15 seconds

### Memory Usage
- Images are resized for comparison
- Canvas operations are optimized
- Temporary objects are cleaned up

## Algorithm Accuracy

### Global Score Validation
- **High accuracy** for color/tone changes
- Correlates well with histogram differences
- Detects subtle adjustments reliably

### Structural Score Validation
- **Good accuracy** for major modifications
- Reliable for object addition/removal
- May be less sensitive to subtle retouching

### Known Limitations
- JPEG compression artifacts may affect scores
- Very small changes might not be detected
- Complex transformations may need fine-tuning

## Extension Points

### Custom Scoring Algorithms
```javascript
class CustomI3Calculator extends I3Calculator {
    async calculateGlobalScore(source, final) {
        // Implement custom global scoring
        return super.calculateGlobalScore(source, final);
    }
}
```

### Custom UI Components
```javascript
const calculator = new I3CalculatorInterface({
    // Custom element IDs
    sourceFileInputId: 'custom-source',
    // Custom callbacks
    onCalculationStart: () => console.log('Starting...'),
    onCalculationComplete: (result) => console.log('Done:', result)
});
```

## Testing

### Automated Tests
```javascript
// Run in browser console
const demo = new I3Demo();
await demo.runDemoTests();
```

### Manual Testing
1. Load test images of different types
2. Apply known modifications
3. Verify scores match expectations
4. Test edge cases (very small/large images)

## Future Enhancements

- [ ] **WASM Integration** - Faster image processing
- [ ] **Web Workers** - Background processing
- [ ] **Advanced Algorithms** - More sophisticated analysis
- [ ] **Batch Processing** - Multiple image comparison
- [ ] **Export Metadata** - Embed scores in EXIF data
- [ ] **Cloud Integration** - Optional server-side processing

## Contributing

The calculator is designed to be modular and extensible. Key areas for contribution:

1. **Algorithm Improvements** - Enhance scoring accuracy
2. **Performance Optimization** - Faster processing
3. **Browser Compatibility** - Support older browsers
4. **UI/UX Enhancements** - Better user experience
5. **Testing Coverage** - More comprehensive tests

## License

This implementation is part of the open-source Image Integrity Index project, released under the MIT License.
