#!/usr/bin/env node
const fs = require('fs');

if (require.main === module) {
	require('yargs')
    .scriptName("stegjs")
    .usage('$0 <cmd> [args]')
    .command({
		command: 'alpha-format',
		describe: '// Format an image for the 8-bit alpha channel encoder.',
        builder: {
            input: {
                describe: 'Path to a valid image',
                demandOption: true,
                type: 'string'
            },
            output: {
                describe: 'Path for output image',
                demandOption: true,
                type: 'string'
            }
        },
		handler(argv) {
            const encoder = require('./alpha/encoder');

            if (!argv.output.endsWith('.png')) {
                argv.output = argv.output + '.png'
            }

            fs.access(argv.input, fs.constants.F_OK, (err) => {
                if (err) {
                    throw new Error('Input files does\'nt exist')
                } else {
                    encoder.format(argv.input, argv.output).then(() => {
                        console.log('File formatted successfully')
                    })

                }
            });
		}
	})
    .command({
		command: 'alpha-keys',
		describe: '// Generate aes-256-gcm keys for the alpha encoding.',
		handler() {
            const key = require('./alpha/encryption').keys()

            console.log('\n')
            console.log(key)
            console.log(`\nkeystring: ${key.key}:${key.nonce}`, '\n')
		}
	})
    .command({
		command: 'alpha-encode',
		describe: '// Encode an image in the 8-bit alpha channel encoder.',
        builder: {
            plaintext: {
                describe: 'The plaintext you want to encrypt and encode.',
                demandOption: true,
                type: 'string'
            },
            input: {
                describe: 'A freshly formatted image',
                demandOption: true,
                type: 'string'
            },
            output: {
                describe: 'The output filename for the encrypted image. (must be a png)',
                demandOption: true,
                type: 'string'
            },

            keystring: {
                describe: 'The formatted keystring "{key}:{nonce}"',
                demandOption: false,
                type: 'string'
            },
            key: {
                describe: 'The encryption key to encrypt.',
                demandOption: false,
                type: 'string'
            },
            nonce: {
                describe: 'The encryption nonce to encrypt.',
                demandOption: false,
                type: 'string'
            }
        },
		handler(argv) {
            const encoder = require('./alpha/encoder');

            if (!argv.output.endsWith('.png')) {
                argv.output = argv.output + '.png'
            }

            fs.access(argv.input, fs.constants.F_OK, (err) => {
                if (err) {
                    throw new Error('Input files does\'nt exist')
                } else {
                    encoder.format(argv.input, argv.output).then(() => {
                        console.log('File formatted successfully')
                    })

                }
            });
		}
	}).command({
			command: 'alpha-decode',
			describe: '// Decode an image in the 8-bit alpha channel encoder.',
			builder: {
				input: {
					describe: 'The encoded file',
					demandOption: true,
					type: 'string'
				},

                keystring: {
					describe: 'The formatted keystring "{key}:{nonce}:{tag}"',
					demandOption: false,
					type: 'string'
				},
                key: {
					describe: 'The encryption key to encrypt.',
					demandOption: false,
					type: 'string'
				},
                nonce: {
					describe: 'The encryption nonce to encrypt.',
					demandOption: false,
					type: 'string'
				},
                tag: {
					describe: 'The encryption tag to encrypt.',
					demandOption: false,
					type: 'string'
				}
			},
			handler(argv) {
                const {decode} = require('./alpha/encoder');

				if (argv.keystring === null) {
                    if (argv.key === null && argv.nonce === null && argv.tag === null) {
                        throw new Error('If keystring isnt provided a key, nonce, tag must be')
                    }
                } else {
                    argv.key = argv.keystring.split(':')[0]
                    argv.nonce = argv.keystring.split(':')[1]
                    argv.tag = argv.keystring.split(':')[2]
                }

                decode(argv.input, {
                    key: argv.key,
                    nonce: argv.nonce
                }, argv.tag).then(decoded => {
                    console.log(decoded.toString('ascii'));
                })
			}
		})
    .argv;
} else {
	module.exports = {
        alpha: {
            ...require('./alpha/encoder'),
            ...require('./alpha/encryption')
        }
    };
} 