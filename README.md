<div align="center"><img src="/readme/stega-logo-background-rounded.svg" width="40%"/></div>

##

<div align="center">
  <img src="https://img.shields.io/npm/v/stega.js?style=for-the-badge&amp;labelColor=%23313531&amp;color=%23f1e845" alt="npm">
  <img src="https://img.shields.io/github/license/notreeceharris/stega.js?style=for-the-badge&amp;labelColor=%23313531&amp;color=%23f1e845" alt="GitHub">
  <img src="https://img.shields.io/badge/supported_algorithms-1-we?style=for-the-badge&amp;labelColor=%23313531&amp;color=%23f1e845" alt="Static Badge">
  <img src="https://img.shields.io/github/issues/notreeceharris/stega.js/new%20algorithm?style=for-the-badge&amp;label=submitted%20algorithms&amp;labelColor=%23313531&amp;color=%23f1e845&amp;cacheSeconds=0" alt="GitHub issues by-label">
</div>



### What is Steganography
Steganography is the art and science of concealing information within seemingly innocuous carriers, such as images, audio files, or text, in a way that the presence of the hidden data is not readily apparent to observers. Unlike cryptography, which focuses on securing the content of a message, steganography is concerned with ensuring the secrecy of the message itself. By subtly altering the carrier's data and making imperceptible changes, steganography allows confidential information to be transmitted without arousing suspicion. The hidden data is typically embedded within the carrier using various techniques, from modifying the least significant bits of binary data to exploiting imperceptible variations in media formats. Steganography finds applications in digital security, covert communication, and data protection, where the goal is to maintain confidentiality by keeping the message's existence concealed from unintended recipients.

### Encoding types

Encoding | Encryption | Supported formats | Wiki link
--- | --- | --- | ---
8-bit alpha channel | `aes-256-gcm` | `PNG`, `TIFF`, `WebP` | [/wiki/8‐bit-alpha-channel](https://github.com/NotReeceHarris/stega.js/wiki/8%E2%80%90bit-alpha-channel)
