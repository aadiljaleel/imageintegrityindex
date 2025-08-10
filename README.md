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

*Built with ❤️ for the photography community*

**License**: MIT | **Website**: [imageintegrityindex.com](https://aadiljaleel.github.io/imageintegrityindex/) | **GitHub**: [@aadiljaleel](https://github.com/aadiljaleel)
