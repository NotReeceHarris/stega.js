if (require.main === module) {

	// Require yargs module to parse command line arguments
	const yargs = require('yargs');

	yargs.command({
		command: 'keys',
		describe: 'Generate required hex keys.',
		handler(argv) {
			const aes = require('./encryption')
            const keys = aes.keys()

			console.log(keys)
            console.log(`\n${keys.key}:${keys.nonce}`)
		}
	}).command({
			command: 'format',
			describe: 'Format an image to be compatible.',
			builder: {
				input: {
					describe: 'A valid image',
					demandOption: true,
					type: 'string'
				},
                output: {
					describe: 'The filename for the formatted image (must be a png)',
					demandOption: true,
					type: 'string'
				}
			},
			handler(argv) {
                const {format} = require('./encoder');
                format(argv.input, argv.output);
			}
		}).command({
			command: 'encode',
			describe: 'Encode a formatted image.',
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
                const {encode} = require('./encoder');
				
                if (argv.keystring === null) {
                    if (argv.key === null && argv.nonce === null) {
                        throw new Error('If keystring isnt provided a key and nonce must be')
                        return;
                    }
                } else {
                    argv.key = argv.keystring.split(':')[0]
                    argv.nonce = argv.keystring.split(':')[1]
                }

                encode(Buffer.from(argv.plaintext, 'ascii'), argv.input, argv.output, {
                    key: argv.key,
                    nonce: argv.nonce
                }).then((tag) => {
                    console.log(tag)
                    console.log(`\n${tag.key}:${tag.nonce}:${tag.tag}`)
                })

			}
		}).command({
			command: 'decode',
			describe: 'Decode an image.',
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
                const {decode} = require('./encoder');

				if (argv.keystring === null) {
                    if (argv.key === null && argv.nonce === null && argv.tag === null) {
                        throw new Error('If keystring isnt provided a key, nonce, tag must be')
                        return;
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

	// Parse the command line arguments
		.argv;
} else {
	module.exports = require('./encoder');
} 