const path = require('node:path');
const { mkdirSync } = require('node:fs');
const esbuild = require('esbuild');
const { version } = require('../package.json');

const BANNER = `/**
 * @license MIT
 * tailwind-scrollbar v${version}
 * https://github.com/adoxography/tailwind-scrollbar
 */`;
const FOOTER = `
/*
MIT License

Copyright (c) Graham Still <gstill92@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
`;

async function buildBundle() {
  const outdir = path.resolve(__dirname, '../bundle');

  mkdirSync(outdir, { recursive: true });

  await esbuild.build({
    entryPoints: [path.resolve(__dirname, '../src/index.js')],
    outfile: path.resolve(outdir, 'tailwind-scrollbar.mjs'),
    bundle: true,
    format: 'esm',
    platform: 'node',
    legalComments: 'inline',
    banner: {
      js: BANNER
    },
    footer: {
      js: FOOTER
    }
  });
}

buildBundle().catch(error => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
