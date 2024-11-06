<div align="center">
  <p> </p>
  <img src="https://raw.githubusercontent.com/NotReeceHarris/stega.js/94c280fb053e0fda90cf7b52b7de0992264da49c/readme/stega-logo-background-rounded.svg" width="40%"/>
  <p> </p>
  <p>A Node-based Steganography Framework Seamlessly Integrating Steganography and Secure Cryptography. </p>
</div>


```py
# Download CLI globally
npm i -g stega.js@latest

# Install module package
npm i stega.js@latest
```
## What is stega.js
Stega.js is a comprehensive steganography framework meticulously engineered to accommodate diverse steganography algorithms. Each algorithm undergoes rigorous testing and evaluation, receiving a performance rating on a scale of 0 to 100. It's important to note that these ratings pertain solely to the encoding aspect and do not reflect the encryption strength, as all encryption methods employed are thoroughly vetted for cryptographic security and compliance.

Steganography is the art and science of concealing information within seemingly innocuous carriers, such as images, audio files, or text, in a way that the presence of the hidden data is not readily apparent to observers. Unlike cryptography, which focuses on securing the content of a message, steganography is concerned with ensuring the secrecy of the message itself. By subtly altering the carrier's data and making imperceptible changes, steganography allows confidential information to be transmitted without arousing suspicion. The hidden data is typically embedded within the carrier using various techniques, from modifying the least significant bits of binary data to exploiting imperceptible variations in media formats. Steganography finds applications in digital security, covert communication, and data protection, where the goal is to maintain confidentiality by keeping the message's existence concealed from unintended recipients.

## Encoding & Encryption

"Encoding and encryption are now separate processes. You must provide the encrypted data to the encoder, as it **no longer** handles encryption; it solely encodes the data within images.

Algorithm | Supported Media | Rating | Docs
--- | --- | --- | ---
alpha-channel | `PNG` | 🟢 7/10 | [wiki/8‐bit-alpha-channel](https://github.com/NotReeceHarris/stega.js/wiki/8%E2%80%90bit-alpha-channel)

## Licensing

```txt
                    GNU AFFERO GENERAL PUBLIC LICENSE
                       Version 3, 19 November 2007

   Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
     Everyone is permitted to copy and distribute verbatim copies
      of this license document, but changing it is not allowed.
```
