# Image Integrity Index (I<sup>3</sup>)

## A Grassroots Proposal for the Image Integrity Index (I³)
Objective: To provide photographers with a free, open-source tool to calculate and declare the extent of their edits. The resulting I³ score can be embedded in their photos and shared online to offer viewers transparent insight into their creative process.

## 1. The Core Concept: A Declaration of Editing
The I³ score remains a two-part metric: I³: G[value]/S[value].

G (Global Adjustment Score): Measures "darkroom-style" edits like color and tone.

S (Structural Manipulation Score): Measures content changes like object removal or composites.

In this model, the score is not a security feature but a standardized artist's statement. It's the photographer's way of saying, "Here is my original file, here is my final piece, and here is a standard metric of what I did."

## 2. The Practical Workflow for a Photographer
A photographer would follow these simple steps after a shoot.

Step 1: Secure Your "Source File"
After copying photos from your memory card, immediately select the original, untouched file you intend to edit. This is your Source File.

For most enthusiasts, this will be the RAW file (.CR3, .NEF, .DNG, etc.).

If you shoot JPEG, it will be the original, out-of-camera JPEG.

Step 2: Edit Your Masterpiece
Use your preferred software (Lightroom, Photoshop, Capture One, etc.) to edit your photo. When you are finished, export the final image (e.g., my-landscape-final.jpg).

Step 3: Calculate the I³ Score
Use the "I³ Calculator," a standalone, open-source desktop application. The tool would have a simple interface:

Select Source File: You are prompted to select your original RAW or JPEG file.

Select Final Image: You are prompted to select your final, edited JPEG.

Click "Calculate."

Step 4: Share Your Score
The calculator processes both images and generates the I³ score. It then provides two outputs:

An Embedded File: A new version of your final JPEG, my-landscape-final-i3.jpg, with the score I³: Gxx/Syy embedded in the EXIF/XMP metadata.

A Text Snippet: A simple string Image Integrity Index: Gxx/Syy that you can copy and paste into the description of your photo on Instagram, Flickr, 500px, or your personal blog.

## 3. The "I³ Calculator" Tool: An Open-Source Project
This entire system hinges on a trustworthy, accessible tool.

Platform: A free, open-source desktop application for Windows, macOS, and Linux.

Core Libraries:

RAW Reading: It would use a library like LibRaw to decode the Source File (if it's a RAW file) into a standard bitmap format (like a 16-bit TIFF) with a basic, neutral conversion. This becomes the "baseline" for comparison.

Image Analysis: It would use OpenCV or similar libraries to perform the histogram and feature comparisons.

Metadata Writing: It would use a tool like ExifTool to embed the final I³ score into the JPEG's XMP data under a clear tag like <i3:Index>.

Trust Through Openness: Because the tool is open-source, the community can inspect the code to ensure the calculations are fair and accurate, building trust in the metric.

## 4. Algorithm Specification (Inside the Tool)
The calculation logic remains the same as the previous proposal but happens entirely within the desktop tool.

To Calculate GAS (Global Score):

The tool generates a baseline image from the user-provided Source File.

It compares the CIE LAB color histograms of the baseline and the final image using the Earth Mover's Distance (EMD).

This distance is normalized to the G[100-0] score.

To Calculate SMS (Structural Score):

The tool analyzes the baseline image using a Perceptual Hash (pHash) grid and ORB feature detection.

It measures how many hash blocks have changed and how many key features have been "lost" in the final image.

These penalties are combined to produce the S[100-0] score.

## 5. Example Scenarios
Scenario A: The Portrait Retoucher

Source: portrait.CR3 (RAW file)

Final: portrait_final.jpg (skin smoothed, eyes brightened, colors warmed)

I³ Calculator Output: Image Integrity Index: G88/S96

Interpretation: The viewer understands the image has moderate color/tone adjustments but the subject's core features are all original.

Scenario B: The Digital Artist

Source: mountain.NEF (RAW file)

Final: composite_art.jpg (original mountain, but sky replaced and a dragon added with AI)

I³ Calculator Output: Image Integrity Index: G70/S35

Interpretation: The viewer immediately knows this is a heavy artistic composite, not a direct photograph of a real scene.

This grassroots approach empowers individual photographers to champion transparency, building trust with their audience one photo at a time without waiting for the entire industry to change.
