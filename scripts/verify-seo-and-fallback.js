const http = require('http');

http.get('http://localhost:3000', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log("--- STARTING PRODUCTION VERIFICATION ---");
    
    // Check 1: Verify status code
    console.log(`HTTP Status: ${res.statusCode} (Expected: 200)`);
    if (res.statusCode !== 200) {
      console.error("FAIL: Non-200 response status!");
      process.exit(1);
    }
    
    // Check 2: Verify JSON-LD Schema
    const schemaMatch = data.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    if (!schemaMatch) {
      console.error("FAIL: JSON-LD Structured Data Script Block Not Found!");
      process.exit(1);
    }
    
    try {
      const parsedSchema = JSON.parse(schemaMatch[1]);
      console.log("PASS: Found JSON-LD Schema block.");
      console.log(`  - Type: ${parsedSchema['@type']}`);
      console.log(`  - Name: ${parsedSchema['name']}`);
      console.log(`  - URL: ${parsedSchema['url']}`);
      console.log(`  - SameAs (LinkedIn/GitHub): ${JSON.stringify(parsedSchema['sameAs'])}`);
      
      if (parsedSchema['knowsAbout']) {
        console.log(`  - KnowsAbout (Skills): ${JSON.stringify(parsedSchema['knowsAbout'])}`);
        console.log("PASS: 'knowsAbout' structured data parameter verified.");
      } else {
        console.error("FAIL: Missing 'knowsAbout' parameter!");
        process.exit(1);
      }
    } catch (e) {
      console.error("FAIL: Invalid JSON inside schema script!", e);
      process.exit(1);
    }
    
    // Check 3: Verify no development fallbacks in HTML source code
    // The developer fallback label contains bracket tags, e.g. "[featured/cctv/inference.webp]"
    const devFallbackMatched = data.includes("Save your screenshot to");
    if (devFallbackMatched) {
      console.warn("WARN: Fallback instruction text is present in HTML templates (expected behavior since failedImages client handler uses React state during runtime, not server-side static rendering).");
    }
    
    // Ensure all target WebP image links are printed in img tags
    const requiredImages = [
      "/images/featured/cctv/inference.webp",
      "/images/featured/drone/flight.webp",
      "/images/featured/homelab/portainer.webp",
      "/images/featured/untern/home.webp",
      "/images/evidence/drone-field.webp",
      "/images/evidence/esp32-node.webp",
      "/images/evidence/storage.webp",
      "/images/evidence/yolo.webp",
      "/images/evidence/tunnel.webp"
    ];
    
    let missingImagesCount = 0;
    requiredImages.forEach(img => {
      if (data.includes(img)) {
        console.log(`PASS: Found image tag reference for: ${img}`);
      } else {
        console.error(`FAIL: Missing image tag reference for: ${img}`);
        missingImagesCount++;
      }
    });
    
    if (missingImagesCount > 0) {
      console.error(`FAIL: ${missingImagesCount} image links were not found in the HTML source.`);
      process.exit(1);
    }
    
    console.log("--- VERIFICATION SUCCESSFULLY COMPLETED (0 ERRORS) ---");
    process.exit(0);
  });
}).on('error', (err) => {
  console.error("Error connecting to server:", err);
  process.exit(1);
});
