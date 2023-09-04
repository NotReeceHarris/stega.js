<div align="center">
<p> </p>
  <img src="https://raw.githubusercontent.com/NotReeceHarris/stega.js/94c280fb053e0fda90cf7b52b7de0992264da49c/readme/stega-logo-background-rounded.svg" width="40%"/>
</div>

##

<h2 align="center">
  <img src="https://img.shields.io/npm/v/stega.js?style=for-the-badge&amp;labelColor=%23313531&amp;color=%23f1e845" alt="npm">
  <img src="https://img.shields.io/github/license/notreeceharris/stega.js?style=for-the-badge&amp;labelColor=%23313531&amp;color=%23f1e845" alt="GitHub">
  <a href="#encoding-types"><img src="https://img.shields.io/badge/supported_algorithms-1-we?style=for-the-badge&amp;labelColor=%23313531&amp;color=%23f1e845" alt="Static Badge"></a>
  <img src="https://img.shields.io/github/issues/notreeceharris/stega.js/new%20algorithm?style=for-the-badge&amp;label=submitted%20algorithms&amp;labelColor=%23313531&amp;color=%23f1e845&amp;cacheSeconds=0" alt="GitHub issues by-label">
  <p> </p>
</h2>

```py
# Download CLI globally
npm i -g stega.js@latest

# Install module package
npm i stega.js@latest
```
## What is stega.js
Stega.js is a comprehensive steganography framework meticulously engineered to accommodate diverse steganography algorithms. Each algorithm undergoes rigorous testing and evaluation, receiving a performance rating on a scale of 0 to 100. It's important to note that these ratings pertain solely to the encoding aspect and do not reflect the encryption strength, as all encryption methods employed are thoroughly vetted for cryptographic security and compliance.

Steganography is the art and science of concealing information within seemingly innocuous carriers, such as images, audio files, or text, in a way that the presence of the hidden data is not readily apparent to observers. Unlike cryptography, which focuses on securing the content of a message, steganography is concerned with ensuring the secrecy of the message itself. By subtly altering the carrier's data and making imperceptible changes, steganography allows confidential information to be transmitted without arousing suspicion. The hidden data is typically embedded within the carrier using various techniques, from modifying the least significant bits of binary data to exploiting imperceptible variations in media formats. Steganography finds applications in digital security, covert communication, and data protection, where the goal is to maintain confidentiality by keeping the message's existence concealed from unintended recipients.

## Submitting an encoding algorithm
To propose a new steganography algorithm, concept, or proof of concept (POC), please follow these steps:

1. Create a new [issue](https://github.com/NotReeceHarris/stega.js/issues/new/choose).
2. Label the issue as "New Algorithm."
3. If possible, include the corresponding code. You can share it via a gist or repository.
4. Ensure that the code is licensed under the [AGPL-3 license](/LICENSE).

This process allows for the smooth integration of new steganographic ideas into our framework while ensuring compliance with the AGPL-3 licensing requirements.

## Encoding types

Encoding | Encryption | Supported formats | Rating | Wiki link
--- | --- | --- | --- | ---
8-bit alpha channel | `aes-256-gcm` | `PNG` `TIFF` `WebP` | 60 | [/wiki/8‐bit-alpha-channel](https://github.com/NotReeceHarris/stega.js/wiki/8%E2%80%90bit-alpha-channel)

## Licensing
```
                    GNU AFFERO GENERAL PUBLIC LICENSE
                       Version 3, 19 November 2007

   Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
     Everyone is permitted to copy and distribute verbatim copies
      of this license document, but changing it is not allowed.
```
