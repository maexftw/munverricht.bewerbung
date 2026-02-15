## 2024-05-22 - [Optimization of p5.js Background Animation]
**Learning:** Calling `img.loadPixels()` in every frame of a p5.js draw loop is extremely expensive for full-screen images. Also, creating thousands of `p5.Vector` objects per frame leads to significant garbage collection overhead.
**Action:** Move `loadPixels()` to setup/update logic and use manual arithmetic with squared distance for heavy loops instead of vector objects.
