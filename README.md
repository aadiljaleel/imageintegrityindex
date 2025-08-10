# Image Integrity Index (I³)

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Website-blue?style=flat-square)](https://aadiljaleel.github.io/imageintegrityindex/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🎯 A Grassroots Proposal for Transparency in Digital Photography

The Image Integrity Index (I³) provides photographers with a **free, open-source tool** to calculate and declare the extent of their photo edits. The resulting I³ score promotes transparency by offering viewers clear insight into the photographer's creative process.

**🌐 Try it now: [imageintegrityindex.com](https://aadiljaleel.github.io/imageintegrityindex/)**

---

## 🔥 What's New - Working Calculator!

✅ **Live Web Calculator** - Calculate real I³ scores in your browser  
✅ **No Installation Required** - Runs entirely client-side  
✅ **Real Image Analysis** - Actual pixel-level comparison algorithms  
✅ **Mobile Friendly** - Works on phones, tablets, and desktops  
✅ **Open Source** - Inspect the algorithms yourself  

---

## 📊 The I³ Score: A Declaration of Editing

The I³ score is a **two-part transparency metric**: **I³: G[value]/S[value]**

### 🎨 **Global Adjustment Score (G)**
Measures "darkroom-style" edits like color correction, exposure, contrast, and tone adjustments.
- **G100**: Minimal global adjustments
- **G0**: Heavy color/tone modifications

### 🏗️ **Structural Manipulation Score (S)** 
Measures content changes like object removal, additions, composites, and AI-generated elements.
- **S100**: Original content fully preserved
- **S0**: Significant structural manipulation

> **Example**: `I³: G88/S96` = Moderate color adjustments with original content preserved

---

## 🚀 How It Works - Simple 4-Step Process

### Step 1: **Secure Your Source File**
After copying photos from your memory card, select the original, untouched file:
- **RAW files**: `.CR3`, `.NEF`, `.DNG`, `.ARW`, etc.
- **JPEG files**: Original out-of-camera JPEG

### Step 2: **Edit Your Masterpiece**
Use your preferred software to edit your photo:
- Adobe Lightroom, Photoshop
- Capture One, Luminar
- Any photo editing software

### Step 3: **Calculate the I³ Score**
Visit our **[online calculator](https://aadiljaleel.github.io/imageintegrityindex/#calculator)**:
1. Upload your source file
2. Upload your final edited image
3. Click "Calculate I³ Score"
4. Get instant results with explanation

### Step 4: **Share Your Score**
Copy the generated text snippet to share on:
- Instagram, Flickr, 500px
- Personal blog or portfolio
- Social media platforms

```
Image Integrity Index: G88/S96
```

---

## 💻 Technical Implementation

### **Current Status: Production Ready**

Our calculator uses advanced **client-side JavaScript** with real image processing:

#### **Global Score Algorithm**
- **Color Histogram Analysis**: RGB + Luminance histograms (256 bins)
- **Earth Mover's Distance**: Sophisticated histogram comparison
- **Normalized Scoring**: Converts differences to 0-100 scale

#### **Structural Score Algorithm**
- **Perceptual Hashing**: 8x8 grid comparison with Hamming distance
- **Edge Detection**: Sobel operator for structural analysis
- **Feature Matching**: Corner detection and spatial consistency

#### **Browser Support**
- ✅ **Modern Browsers**: Full ES6 module support
- ✅ **Legacy Browsers**: Automatic fallback implementation
- ✅ **Mobile Devices**: Responsive touch interface

---

## 🎭 Example Scenarios

### **Portrait Retoucher**
- **Source**: `portrait.CR3` (RAW file)
- **Final**: `portrait_final.jpg` (skin smoothed, eyes brightened, colors warmed)
- **Result**: `I³: G88/S96`
- **Interpretation**: Moderate color/tone adjustments with original features preserved

### **Digital Artist**
- **Source**: `mountain.NEF` (RAW file)  
- **Final**: `composite_art.jpg` (sky replaced, dragon added with AI)
- **Result**: `I³: G70/S35`
- **Interpretation**: Heavy artistic composite, not a direct photograph

### **Purist Photographer**
- **Source**: `landscape.DNG` (RAW file)
- **Final**: `landscape_final.jpg` (minimal exposure correction)
- **Result**: `I³: G95/S100`
- **Interpretation**: Nearly unprocessed, authentic capture

---

## 🏗️ Project Structure

```
imageintegrityindex/
├── index.html              # Main website
├── styles.css              # Responsive styling
├── script.js               # Main JavaScript
├── js/
│   ├── i3-calculator.js           # Core calculation engine
│   ├── i3-calculator-interface.js # UI interface wrapper
│   ├── i3-demo.js                 # Demo and testing
│   └── README.md                  # Technical documentation
├── docs/
│   └── README.md                  # Website documentation
└── .github/workflows/
    └── pages.yml                  # GitHub Pages deployment
```

---

## 🤝 For the Photography Community

### **Why I³ Matters**
- **Build Trust**: Transparent declaration of editing process
- **Educate Viewers**: Help audiences understand digital photography
- **Professional Standards**: Establish industry transparency norms
- **Creative Freedom**: Edit freely while maintaining honesty

### **Who Benefits**
- **Portrait Photographers**: Show natural vs enhanced work
- **Landscape Photographers**: Declare reality vs artistic interpretation  
- **Photojournalists**: Maintain credibility standards
- **Digital Artists**: Clearly label artistic compositions
- **Photo Enthusiasts**: Learn about editing transparency

---

## 🔬 Algorithm Validation

Our implementation has been tested with:
- ✅ **Color Adjustments**: Brightness, contrast, saturation changes
- ✅ **Structural Modifications**: Object addition/removal, compositing
- ✅ **RAW Processing**: Different RAW conversion settings
- ✅ **Compression Effects**: JPEG quality variations
- ✅ **Edge Cases**: Very small and very large images

**Accuracy**: 
- **Global Score**: High correlation with perceptual color differences
- **Structural Score**: Reliable detection of content modifications

---

## 🛠️ Development & Contributing

### **Quick Start**
```bash
# Clone the repository
git clone https://github.com/aadiljaleel/imageintegrityindex.git
cd imageintegrityindex

# Open locally (no build required)
python -m http.server 8000
# or
npx http-server

# Visit http://localhost:8000
```

### **Contributing Areas**
- 🧮 **Algorithm Improvements**: Enhance scoring accuracy
- ⚡ **Performance**: Optimize image processing speed
- 🎨 **UI/UX**: Improve user experience
- 📱 **Mobile**: Enhance mobile functionality
- 🧪 **Testing**: Expand test coverage
- 📚 **Documentation**: Improve guides and examples

### **Future Roadmap**
- [ ] **Desktop Application**: Native apps for Windows/Mac/Linux
- [ ] **RAW Processing**: Advanced RAW file support
- [ ] **EXIF Embedding**: Automatic metadata insertion
- [ ] **Batch Processing**: Multiple image analysis
- [ ] **API Integration**: Third-party platform support
- [ ] **Mobile Apps**: Native iOS/Android applications

---

## 📖 Resources

- **🌐 Live Website**: [imageintegrityindex.com](https://aadiljaleel.github.io/imageintegrityindex/)
- **📘 Technical Docs**: [Algorithm Documentation](js/README.md)
- **🐛 Report Issues**: [GitHub Issues](https://github.com/aadiljaleel/imageintegrityindex/issues)
- **💬 Discussions**: [Community Forum](https://github.com/aadiljaleel/imageintegrityindex/discussions)
- **📄 License**: [MIT License](LICENSE)

---

## 🎉 Getting Started

**Ready to try transparent photography?**

1. 📸 **Take a photo** with your camera
2. 🎨 **Edit it** in your favorite software  
3. 🧮 **Calculate** the I³ score online
4. 📱 **Share** your transparency score

**[Start calculating now →](https://aadiljaleel.github.io/imageintegrityindex/#calculator)**

---

## 📞 Contact & Community

This is a **grassroots community project**. Join us in building transparency in digital photography:

- **🌟 Star this repository** to show support
- **🔄 Share** with photographer friends
- **💡 Contribute** ideas and improvements
- **📢 Spread awareness** in photography communities

---

## 🎯 The Greater Vision: Industry-Wide Adoption

### **Making I³ a Universal Standard at Camera Manufacturer Level**

While our current browser-based calculator demonstrates the concept, the ultimate goal is to establish the Image Integrity Index as a **universal standard implemented directly by camera manufacturers** (Canon, Nikon, Sony, etc.) at the hardware and firmware level.

---

## 📋 Technical Proposal for OEM Implementation

### **Objective**
To establish a transparent, computationally verifiable standard for quantifying the degree of post-capture alteration in digital images. This index would be embedded in image metadata and serve as a reliable gauge of authenticity for photographers, news agencies, and consumers worldwide.

### **1. The I³ Standard Definition**

The index consists of two scores stored in the format **I³: G[value]/S[value]**.

- **Global Adjustment Score (GAS)**: Score from 100 (identical) to 0 (highly dissimilar) measuring changes in overall tonal and color distribution. Quantifies "darkroom-style" edits.

- **Structural Manipulation Score (SMS)**: Score from 100 (identical) to 0 (highly dissimilar) measuring changes to underlying content and composition, such as object addition/removal or geometric transformations.

### **2. Technical Workflow & Implementation**

#### **2.1. In-Camera Requirement: The Trust Anchor**

For the I³ system to be secure and verifiable, camera manufacturers must implement the following process upon capture:

1. **Generate RAW File**: Camera captures and saves the full RAW file data (`.CR3`, `.NEF`, `.ARW`, etc.)

2. **Generate Authenticity Hash**: Camera firmware calculates a SHA-256 hash of the entire, unmodified RAW file data

3. **Generate Perceptual Baseline**: Firmware generates a small, unprocessed baseline image (512x512 pixel TIFF from center sensor data) as the reference for I³ calculations

4. **Embed Trust Anchor**: Both SHA-256 hash and baseline image are embedded into a protected segment of the RAW file's metadata as immutable ground truth

#### **2.2. Editing Software Role: The Calculation Engine**

Professional editing software would integrate I³ calculation:

1. **Verification**: Upon import, software verifies Trust Anchor integrity by recalculating SHA-256 hash
2. **Calculation**: Uses embedded baseline as "original" to compare against final edited image
3. **Export**: Calculates final GAS and SMS scores and embeds them in exported file metadata

#### **2.3. Data Embedding: XMP Standard**

The I³ score would be written to XMP (Extensible Metadata Platform) metadata:

```xml
Namespace: i3
Property: i3:Index
Example Value: G92/S95
Property: i3:SourceHash  
Example Value: [SHA-256 hash from camera]
```

### **3. Algorithm Specifications**

#### **3.1. Global Adjustment Score (GAS) Calculation**

1. **Color Space Conversion**: Convert baseline and final images to CIE LAB color space
2. **Histogram Generation**: Create 1D histograms for L* (Lightness), a* (green-red), b* (blue-yellow) channels
3. **Distance Calculation**: Use Earth Mover's Distance (EMD) between histograms
4. **Normalization**: Apply standardized formula with threshold for maximum plausible edit

```
Total Distance: D = 0.5⋅dL + 0.25⋅da + 0.25⋅db
Final Score: GAS = 100 × max(0, 1 - D/Tmax)
```

#### **3.2. Structural Manipulation Score (SMS) Calculation**

1. **Perceptual Hashing**: Generate pHash for both images using 8x8 DCT grid
2. **Feature Detection**: Extract key feature points using ORB or SIFT algorithms  
3. **Spatial Analysis**: Compare structural integrity and object boundaries
4. **Combined Scoring**: Weight and combine metrics for final SMS value

### **4. Industry Implementation Roadmap**

#### **Phase 1: Specification & Standards** *(Current)*
- ✅ **Open Source Proof of Concept** (Our current calculator)
- 📋 **Technical Specification Development**
- 🤝 **Industry Working Group Formation**
- 📜 **Standardization Body Submission** (ISO, IEEE)

#### **Phase 2: Pilot Integration** *(6-12 months)*
- 🔧 **SDK Development** for camera manufacturers
- 🧪 **Pilot Programs** with forward-thinking camera brands
- 📱 **Mobile Implementation** in smartphone cameras
- 🏆 **Professional Market Validation**

#### **Phase 3: Widespread Adoption** *(1-3 years)*
- 📷 **Major Camera Manufacturer Integration**
- 💻 **Editing Software Support** (Adobe, Capture One, etc.)
- 🌐 **Platform Integration** (Instagram, Flickr, news sites)
- 📊 **Consumer Awareness Campaigns**

#### **Phase 4: Universal Standard** *(3-5 years)*
- 🌍 **Global Industry Standard**
- 📺 **Regulatory Recognition** for journalism/legal evidence
- 🎓 **Educational Integration** in photography courses
- 🔒 **Trust Infrastructure** for digital media

### **5. Benefits for Camera Manufacturers**

#### **Competitive Advantage**
- **First-mover advantage** in transparency technology
- **Professional market differentiation** 
- **Trust building** with serious photographers
- **Future-proofing** against deepfakes and AI manipulation

#### **Technical Benefits**
- **Minimal firmware impact** - lightweight implementation
- **Backward compatibility** - works with existing RAW formats
- **Open standard** - no proprietary lock-in
- **Incremental rollout** - start with flagship models

#### **Market Positioning**
- **Professional credibility** enhancement
- **Photojournalism market** penetration
- **Educational sector** appeal
- **Brand leadership** in digital authenticity

### **6. Call to Action for Industry**

#### **For Camera Manufacturers**
- 📧 **Contact us** to discuss pilot implementation
- 🔬 **Review our algorithms** and provide feedback
- 🤝 **Join the working group** to shape the standard
- 💡 **Contribute engineering expertise** to refinement

#### **For Software Developers**
- 🛠️ **Integrate I³ calculation** into editing workflows
- 📊 **Support XMP metadata** reading/writing
- 🔌 **Build API integrations** for platform support
- 🧪 **Test with our reference implementation**

#### **For Photography Community**
- 📢 **Advocate** with your preferred camera brands
- 📝 **Provide feedback** on algorithm accuracy
- 🌟 **Use and share** I³ scores in your work
- 🗣️ **Spread awareness** about transparency benefits

---

**The future of photography is transparent.** Help us make the Image Integrity Index the universal standard for digital image authenticity.

📧 **Get Involved**: [Join our discussions](https://github.com/aadiljaleel/imageintegrityindex/discussions) | [Contact for partnerships](https://github.com/aadiljaleel/imageintegrityindex/issues)

---
