<h1 align="center">
  <picture><img src="/readme/steg-logo-nostroke.png" height="40%"/></picture>
</h1>
<h2 align="center">
  Utilizing AES encryption and steganography to covertly embed data in plain view. 
</h2>

### What is Steganography?
Steganography is the art and science of concealing information within seemingly innocuous carriers, such as images, audio files, or text, in a way that the presence of the hidden data is not readily apparent to observers. Unlike cryptography, which focuses on securing the content of a message, steganography is concerned with ensuring the secrecy of the message itself. By subtly altering the carrier's data and making imperceptible changes, steganography allows confidential information to be transmitted without arousing suspicion. The hidden data is typically embedded within the carrier using various techniques, from modifying the least significant bits of binary data to exploiting imperceptible variations in media formats. Steganography finds applications in digital security, covert communication, and data protection, where the goal is to maintain confidentiality by keeping the message's existence concealed from unintended recipients.

### How does stega.js work
The operational mechanism of `stega.js` involves a sequential traversal of pixels, proceeding from the upper left corner to the lower right corner. In this process, each pixel is endowed with an alpha value. This alpha value is derived by converting hexadecimal characters (ranging from `a` to `f` and `0` to `9`) into an alpha value, exemplified by an alpha value like `254`. This numeric representation is chosen due to its close similarity to the maximum value of `255`, which signifies complete opacity. However, this approach exhibits several limitations. One such constraint lies in its compatibility only with images with an `8-bit alpha channel`, as found in formats like `TIFF`, `PNG`, and `WebP`. Additionally, an inherent limitation stems from the necessity to pre-set all alpha values to `255`, denoting full opacity, before encoding, thus making images employing transparency in their original state unsuitable for processing.

<p align="center">
  <img src="/readme/diagram-fixed.png">
</p>
<sub>The process begins by encoding the message into hexadecimal format, with each value then correlated with an alpha map. Subsequently, every pixel within a provided image is allocated this alpha value. The culmination of these steps yields an encoded image as the final output. please note this diagram only shows the encoding and not the encryption for more info on the encryption see <a href="#encryption">#encryption</a></sub>

### Encryption

### Preview
original | formatted | encoded
--- | --- | ---
![](/readme/image.jpg) | ![](/readme/formatted.image.png) | ![](/readme/encoded.image.png)
76cb46bdd065fd88d6db9722467418a0 | cee8cd61a9efb87758e1b7fe614a044a | 7a925b7c208f8c95b207cdf62e7b5318
